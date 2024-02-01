const express = require('express');
const app = express();
//app.use(express.urlencoded());
//app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/kursanmeldung.html');
});
app.get('/schwimmkurse', (req, res) => {
    res.sendFile(__dirname + '/public/html/schwimmkurse.html');
});
app.get('/abzeichen', (req, res) => {
    res.sendFile(__dirname + '/public/html/abzeichen.html');
});
app.get('/rettungsschwimmen', (req, res) => {
    res.sendFile(__dirname + '/public/html/rettungsschwimmen.html');
});
app.get('/startkurs', (req, res) => {
    res.sendFile(__dirname + '/public/html/kurs.html');
});
app.get('/getschwimmkurse', (req, res) => {
    var schwimmkurse = {
      id: [1,2,3,4],
      name: [
        "Schwimmkurs Graz Gruppe 1",
        "Schwimmkurs Graz Gruppe 2",
        "Schwimmkurs Kalsdorf Gruppe 1",
        "Schwimmkurs Kalsdorf Gruppe 2",
      ],
      start_datum: [
        '2024-01-18',
        '2024-05-12',
        '2024-06-12',
        '2025-06-12',
      ],
      end_datum:  [
        '2024-07-20',
        '2024-07-20',
        '2024-08-12',
        '2024-08-12',
      ],
      ort:  [
        'Auster Graz',
        'Auster Graz',
        'Hallenbad Kalsdorf',
        'Hallenbad Kalsdorf',
      ],
      veranstalter:  [
        'ÖWR-Graz',
        'ÖWR-Graz',
        'ÖWR-Kalsdorf',
        'ÖWR-Kalsdorf',
      ],
    }
    res.json(schwimmkurse);
  });
app.get('/getKurs', (req, res) => {
    var kurs = {
      name: 'Abzeichen Abhnahme Mai',
      start_datum: '2024-05-12',
      end_datum: '2024-05-13',
      start_zeit: '9:00',
      end_zeit: '18:00',
      preis: 30,
      ort: 'Auster Graz',
      veranstalter: 'ÖWR Graz',
      mail: 'office@owr-graz.at',
      telnr: '06643500427',
      maxTn: 15,
      akTn: 8,
      text: 'Ablauf des Kurses <br> Der 1.Teil des Kurses findet am Samstag den 20.1.2024 von 9:00 bis 17:00 statt. Der 2.Teil des Kurses findet am Sonntag den 21.1.2024 von 9:00 bis 17:00 statt. Prüfungskriterien und Vorbereitung Links zu den Prüfungskriterien',
    }
    res.json(kurs)
});

app.listen(3000, () => {
    console.log('Der Server wurde gestartet');
});