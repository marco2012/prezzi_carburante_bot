const sqlite3 = require('sqlite3').verbose();

exports.search = function(data, callback){
    // open the database
    let db = new sqlite3.Database('./Dati/PrezziCarburanti.db');

    let carburante = data[0]
    let citta = data[1]
    let addr = data[2]

    let query =
    `SELECT DISTINCT NomeImpianto, descCarburante, prezzo, Indirizzo, Latitudine, Longitudine
    FROM anagrafica_impianti_attivi NATURAL JOIN prezzo_alle_8
    WHERE Comune="`+citta+`" AND descCarburante="`+carburante+`"
    ORDER BY prezzo ASC
    LIMIT 10`;

    if (addr=='undefined'){
        console.log(addr)
        db.each(query, [], (err, rows) => {
            if (err) throw err;
            callback(rows)
        });
    }

    else{
        console.log(addr)
        db.each(query, [], (err, rows) => {
            if (err) throw err;
            if (rows.Indirizzo.toLowerCase().includes(addr.trim().toLowerCase()))
            callback(rows)
        });
    }


    // close the database connection
    db.close();
}
