document.addEventListener('DOMContentLoaded', function () {
    fetch('/getschwimmkurse')
    .then(response => response.json())
    .then(data => {
        fillSite(data);
    })
});

function formatDate(date) {
    var options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('de-AT', options);
}


function fillSite(data) {
    var veranstaltungen = document.getElementById('veranstaltungen');

    // Ein Objekt erstellen, um Veranstaltungen nach Monaten zu gruppieren
    var veranstaltungenNachMonaten = {};

    for (var i = 0; i < data.name.length; i++) {
        // Container erstellen
        var veranstaltungDiv = document.createElement('div');
        veranstaltungDiv.classList.add('veranstaltung');

        // Bild erstellen
        var imgElement = document.createElement('img');
        imgElement.setAttribute('src', '../image/Schwimmkurs.png');
        imgElement.setAttribute('alt', 'Logo Wasserrettung');

        // Informationen-Div erstellen
        var informationDiv = document.createElement('div');
        informationDiv.classList.add('information');

        // Datum erstellen
        var dateDiv = document.createElement('div');
        dateDiv.classList.add('date');

        var calendarIcon = document.createElement('span');
        calendarIcon.classList.add('material-symbols-outlined');
        calendarIcon.textContent = ' calendar_month ';

        var startdatum = formatDate(new Date(data.start_datum[i]));
        var enddatum = formatDate(new Date(data.end_datum[i]));

        var dateLink = document.createElement('a');
        dateLink.textContent = startdatum + ' - ' + enddatum;

        dateDiv.appendChild(calendarIcon);
        dateDiv.appendChild(dateLink);

        // Mittelteil erstellen
        var middleTextDiv = document.createElement('div');
        middleTextDiv.classList.add('middle_text');

        // Titel erstellen
        var titleDiv = document.createElement('div');
        titleDiv.classList.add('title');

        var h1Element = document.createElement('h1');
        h1Element.textContent = data.name[i];

        titleDiv.appendChild(h1Element);

        // Verfügbarkeit erstellen
        var availabilityDiv = document.createElement('div');
        availabilityDiv.classList.add('availability');

        var currentDate = new Date();
        var twoDaysBeforeStartDate = new Date(data.start_datum[i]);
        twoDaysBeforeStartDate.setDate(new Date(data.start_datum[i]).getDate() - 2);
        var availabilityLink = document.createElement('a');
        availabilityLink.id = 'aktion';
        if (currentDate.getTime() >= twoDaysBeforeStartDate.getTime() && currentDate < new Date(data.start_datum[i])) {
            availabilityLink.style.display = "flex";
            availabilityLink.textContent = 'Anmeldung abgelaufen';
        } else {
            availabilityLink.style.display = "none";
        }
        

        availabilityDiv.appendChild(availabilityLink);

        middleTextDiv.appendChild(titleDiv);
        middleTextDiv.appendChild(availabilityDiv);

        // Ort erstellen
        var locationDiv = document.createElement('div');
        locationDiv.classList.add('location');

        var locationIcon = document.createElement('span');
        locationIcon.classList.add('material-symbols-outlined');
        locationIcon.textContent = 'location_on';

        var locationLink = document.createElement('a');
        locationLink.textContent = data.ort[i];

        var senkrechterstrich = document.createElement('a');
        senkrechterstrich.id = 'strich'
        senkrechterstrich.textContent = '|';

        var veranstalterIcon = document.createElement('span');
        veranstalterIcon.classList.add('material-symbols-outlined');
        veranstalterIcon.textContent = 'person';

        var veranstalterLink = document.createElement('a');
        veranstalterLink.textContent = data.veranstalter[i];

        locationDiv.appendChild(locationIcon);
        locationDiv.appendChild(locationLink);
        locationDiv.appendChild(senkrechterstrich);
        locationDiv.appendChild(veranstalterIcon);
        locationDiv.appendChild(veranstalterLink);

        // Anmelden-Button erstellen
        var anmeldenDiv = document.createElement('div');
        anmeldenDiv.classList.add('anemlden');

        var anmeldenButton = document.createElement('a');
        anmeldenButton.id = 'button'; 
        anmeldenButton.value = data.id[i];
        anmeldenButton.onclick = function(event) {
            kursladen(event.target.value);
        };
        anmeldenButton.textContent = 'ANMELDEN';

        anmeldenDiv.appendChild(anmeldenButton);

        // Alle Elemente zusammenfügen
        informationDiv.appendChild(dateDiv);
        informationDiv.appendChild(middleTextDiv);
        informationDiv.appendChild(locationDiv);

        veranstaltungDiv.appendChild(imgElement);
        veranstaltungDiv.appendChild(informationDiv);
        veranstaltungDiv.appendChild(anmeldenDiv);

        // Monat und Jahr aus dem Startdatum extrahieren
        var startdatum = new Date(data.start_datum[i]);
        var monthYear = startdatum.toLocaleDateString('de-AT', { month: 'long', year: 'numeric' });

        // Überprüfen, ob ein Container für diesen Monat bereits existiert
        if (!veranstaltungenNachMonaten[monthYear]) {
            // Falls nicht, erstelle einen neuen Container
            veranstaltungenNachMonaten[monthYear] = document.createElement('div');
            veranstaltungenNachMonaten[monthYear].classList.add('mec-month-divider');

            var span = document.createElement('span');
            span.textContent = monthYear;
            veranstaltungenNachMonaten[monthYear].appendChild(span);

            // Erstelle auch einen Container für die Veranstaltungen dieses Monats
            var eventsContainer = document.createElement('div');
            eventsContainer.id = monthYear.replace(' ', '_'); // Ersetze Leerzeichen im Monat mit Unterstrichen
            veranstaltungenNachMonaten[monthYear + '_container'] = eventsContainer;
            veranstaltungenNachMonaten[monthYear].appendChild(eventsContainer);
        }

        // Füge die Veranstaltung zum entsprechenden Container hinzu
        veranstaltungenNachMonaten[monthYear + '_container'].appendChild(veranstaltungDiv);
    }

    // Füge alle Monatscontainer zum Hauptcontainer hinzu
    for (var key in veranstaltungenNachMonaten) {
        veranstaltungen.appendChild(veranstaltungenNachMonaten[key]);
    }
}


function kursladen(id) {
    console.log(id);
}