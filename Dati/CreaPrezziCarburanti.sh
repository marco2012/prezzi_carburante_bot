#!/bin/sh

#Remember to change this variable
PATH = "/Users/marco/GitHub_Projects/DistributoriBot"

echo "*********>> Removing old csv files ...."
echo " "
rm $PATH/Dati/*.csv
sleep 5
echo "*********>> Downloading prezzo_alle_8.csv file ..."
echo " "
wget -U "Opera" -O $PATH/Dati/prezzo_alle_8.csv http://www.sviluppoeconomico.gov.it/images/exportCSV/prezzo_alle_8.csv
sleep 5
echo "*********>> Downloading anagrafica_impianti_attivi.csv file ..."
echo " "
wget -U "Opera" -O $PATH/Dati/anagrafica_impianti_attivi.csv http://www.sviluppoeconomico.gov.it/images/exportCSV/anagrafica_impianti_attivi.csv
sleep 5
echo "*********>> Removing the first line from anagrafica_impianti_attivi.csv creating anagrafica-temp.csv file ..."
echo " "
sed '1d' $PATH/Dati/anagrafica_impianti_attivi.csv > $PATH/Dati/anagrafica-temp.csv
sleep 5
echo "*********>> Substitute \" in anagrafica-temp.csv creating anagrafica.csv ..."
echo " "
sed 's/"//g' $PATH/Dati/anagrafica-temp.csv  > $PATH/Dati/anagrafica.csv
sleep 5
echo "*********>> Removing the first line from prezzo_alle_8.csv creating prezzo.csv file ..."
echo " "
sed '1d' $PATH/Dati/prezzo_alle_8.csv > $PATH/Dati/prezzo.csv
sleep 5
echo "*********>> Move the current PrezziCarburanti file in PrezziCarburanti-old ..."
echo " "
mv $PATH/Dati/PrezziCarburanti.db $PATH/Dati/PrezziCarburanti-old.db
sleep 5
echo "*********>> Create new PrezziCarburanti Spatialite database ..."
echo " "
/usr/bin/sqlite3 $PATH/Dati/PrezziCarburanti.db < $PATH/Dati/CreaPrezziCarburanti.txt
