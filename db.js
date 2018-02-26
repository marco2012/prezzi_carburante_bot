const sqlite3 = require('sqlite3').verbose();

exports.search = function(data, callback){
    // open the database
    let db = new sqlite3.Database('./Dati/PrezziCarburanti.db');

    let carburante = data[0]
    let citta = data[1]
    let addr = (data[2]=='null') ? null : data[2].toLowerCase()
    console.log(data)

    let query =
    `SELECT DISTINCT NomeImpianto, descCarburante, prezzo, Indirizzo, Latitudine, Longitudine
    FROM anagrafica_impianti_attivi NATURAL JOIN prezzo_alle_8
    WHERE Comune="`+citta+`" AND descCarburante="`+carburante+`"
    ORDER BY prezzo ASC
    LIMIT 10`;

    if (addr==null){
        db.each(query, [], (err, rows) => {
            if (err) throw err;
            callback(rows)
        });
    } else {
        db.each(query, [], (err, rows) => {
            if (err) throw err;
            if (rows.Indirizzo.toLowerCase().includes(addr)) {
                callback(rows)
            }
        });
    }


    // close the database connection
    db.close();
}
