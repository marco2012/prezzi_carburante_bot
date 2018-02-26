//https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md
const TelegramBot   = require('node-telegram-bot-api');
const token         = '515375552:AAGSfsnLs6RYefmbp8HQA6aK0d7VCmNlJjw';
const bot           = new TelegramBot(token, {polling: true});
const db            = require('./db')

//LOGIN
bot.getMe().then(function (me) {
    console.log(me.username + " is running...");
});

//START
bot.onText(/\/start/, function (msg, match) {
    var message = `Ciao, ${msg.from.first_name}, benvenuto in *Prezzo Carburante*.\nScrivi il *nome di un comune* e ti mostrerò i prezzi del carburante.`
    bot.sendMessage(msg.from.id, message, {"parse_mode" : "markdown"});
})

bot.on('message', function (msg) {
    let data = msg.text.split(',')
    let citta = data[0].toUpperCase()
    let addr = data[1]
    console.log(citta)
    console.log(addr)
    let messaggio = "Scegli il *tipo* di carburante che ti interessa:"
    let msg_options = {
        reply_markup: JSON.stringify({inline_keyboard: [
            [{text:'⛽ Benzina', callback_data: `Benzina,${citta},${addr}`},{text:'⛽ Blue Super', callback_data: "Blue Super,"+citta}],
            [{text:'⛽ Gasolio', callback_data: "Gasolio,"+citta },{text:'⛽ Blue Diesel', callback_data: "Blue Diesel,"+citta }],
            [{text:'⛽ Metano', callback_data: "Metano,"+citta},{text:'⛽ GPL', callback_data: "GPL,"+citta}]
        ]}),
        parse_mode : "markdown"
    };
    bot.sendMessage(msg.from.id, messaggio, msg_options)
});

bot.on('callback_query', function (msg) {
    bot.answerCallbackQuery(msg.id, 'Caricamento...', false);

    let data = msg.data.split(',')

    if (data[0]=="0"){ //mappa
        let lat = msg.data.split(',')[1]
        let lon = msg.data.split(',')[2]
        bot.sendLocation(msg.from.id,lat,lon);
    } else {
        db.search(data, function(row){
            let message = ` ⛽ *${row.NomeImpianto.toUpperCase()}* ⛽\n\n🌍 _${row.Indirizzo.slice(0,-6).toLowerCase()}_\n🏭 ${row.descCarburante}\n\n💵 *€${row.prezzo}* 💵`
            let msg_options = {
                reply_markup: JSON.stringify({inline_keyboard: [
                    [{text:'🗺️ Mappa', callback_data: "0,"+row.Latitudine+","+row.Longitudine}]
                ]}),
                parse_mode : "markdown"
            };
            bot.sendMessage(msg.from.id, message, msg_options);
        })
    }
});
