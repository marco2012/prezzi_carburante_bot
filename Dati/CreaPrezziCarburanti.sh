#!/bin/sh

#Remember to change this variable
PROJ_PATH="/Users/marco/GitHub_Projects/PrezziCarburanteBot/Dati"

echo "*********>> Downloading prezzo_alle_8.csv file ..."
echo " "
wget -U "Opera" -O $PROJ_PATH/prezzo_alle_8.csv http://www.sviluppoeconomico.gov.it/images/exportCSV/prezzo_alle_8.csv
sleep 5
echo "*********>> Downloading anagrafica_impianti_attivi.csv file ..."
echo " "
wget -U "Opera" -O $PROJ_PATH/anagrafica_impianti_attivi.csv http://www.sviluppoeconomico.gov.it/images/exportCSV/anagrafica_impianti_attivi.csv
sleep 5
echo "*********>> Removing the first line from anagrafica_impianti_attivi.csv creating anagrafica-temp.csv file ..."
echo " "
sed '1d' $PROJ_PATH/anagrafica_impianti_attivi.csv > $PROJ_PATH/anagrafica-temp.csv
sleep 5
echo "*********>> Substituting \" in anagrafica-temp.csv creating anagrafica.csv ..."
echo " "
sed 's/"//g' $PROJ_PATH/anagrafica-temp.csv  > $PROJ_PATH/anagrafica.csv
sleep 5
echo "*********>> Removing the first line from prezzo_alle_8.csv creating prezzo.csv file ..."
echo " "
sed '1d' $PROJ_PATH/prezzo_alle_8.csv > $PROJ_PATH/prezzo.csv
sleep 5
echo "*********>> Removing current PrezziCarburanti file  ..."
echo " "
rm $PROJ_PATH/PrezziCarburanti.db
sleep 5
echo "*********>> Creating new PrezziCarburanti sqlite database ..."
echo " "
/usr/bin/sqlite3 $PROJ_PATH/PrezziCarburanti.db < $PROJ_PATH/CreaPrezziCarburanti.txt
sleep 5
echo "*********>> Removing old csv files ...."
echo " "
rm $PROJ_PATH/*.csv
