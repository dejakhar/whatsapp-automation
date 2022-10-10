const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
    // console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats => {
        const myGroup = chats.find((chat) => chat.name === 'For My Info')
        // console.log(myGroup)
        console.log('Scheduled message after 2 mins')
        setTimeout(() => {
            client.sendMessage(myGroup.id._serialized, 'Present for the Day - Automated Message')            
        }, 120000)
    })
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();