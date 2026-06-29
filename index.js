const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const cron = require('node-cron');

async function main() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');

    const sock = makeWASocket({
        auth: state,
        browser: ['WhatsApp Bot', 'Chrome', '120.0.0.0'],
        version: [2, 3000, 1035194821],
        printQRInTerminal: true, // NYALAIN QR!
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('\n📱 SCAN QR CODE INI:');
            console.log(qr);
            console.log('\n📲 Minta temen/ortu scan pake WhatsApp mereka');
            console.log('   > Buka WhatsApp > Perangkat Tertaut > Tautkan Perangkat > Scan QR\n');
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Koneksi putus, reconnect?', shouldReconnect);
            if (shouldReconnect) {
                setTimeout(() => main(), 5000);
            }
        } else if (connection === 'open') {
            console.log('✅ Bot WhatsApp siap!');
            console.log('📌 Bot berhasil login!');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const sender = msg.key.remoteJid;
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const isGroup = sender?.endsWith('@g.us');

        console.log('📨 Pesan dari:', sender, '| Isi:', body);
        if (isGroup) {
            console.log('📌 ID GRUP:', sender);
        }

        const TARGET_GROUP = '6281234567890-123456@g.us'; // GANTI!

        if (isGroup && sender === TARGET_GROUP) {
            if (body === '.jadwal') {
                const today = new Date().getDay();
                const jadwal = {
                    1: 'Senin: Seragam putih abu, jam 7 masuk',
                    2: 'Selasa: Seragam batik, jam 7 masuk',
                    3: 'Rabu: Olahraga, jam 7 masuk',
                    4: 'Kamis: Seragam putih abu, jam 7 masuk',
                    5: "Jumat: Seragam batik, jam 6:30 masuk (senam!)",
                    6: 'Sabtu: Libur',
                    0: 'Minggu: Libur'
                };
                const pesan = jadwal[today] || 'Hari ini libur!';
                await sock.sendMessage(sender, { text: `📅 Jadwal hari ini:\n\n${pesan}` });
            }
        }
    });

    sock.ev.on('creds.update', saveCreds);

    cron.schedule('0 6 * * *', async () => {
        const TARGET_GROUP = '6281234567890-123456@g.us'; // GANTI!
        const today = new Date().getDay();
        const jadwal = {
            1: 'Senin: Seragam putih abu, jam 7 masuk',
            2: 'Selasa: Seragam batik, jam 7 masuk',
            3: 'Rabu: Olahraga, jam 7 masuk',
            4: 'Kamis: Seragam putih abu, jam 7 masuk',
            5: "Jumat: Seragam batik, jam 6:30 masuk (senam!)",
            6: 'Sabtu: Libur',
            0: 'Minggu: Libur'
        };
        const pesan = jadwal[today] || 'Hari ini libur!';
        await sock.sendMessage(TARGET_GROUP, { text: `🌅 SELAMAT PAGI!\n\n${pesan}` });
        console.log('✅ Broadcast pagi terkirim!');
    });

    console.log('🤖 Bot sedang berjalan...');
}

main().catch(err => console.error('Error:', err));
