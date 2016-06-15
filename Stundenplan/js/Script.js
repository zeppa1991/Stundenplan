/**
 * Created by Oliver Czabala on 30.05.2016.
 */
//Globale Variablen um URL imemr anpassen zu können
var kalenderWoche = GetWeekNumber();
var events = [];
var aktuellJahr = (new Date()).getFullYear();
//Funktion um die Berufe welches durch das JSON objekt geliefert werden in die Dropdown zu schreiben
function SetBerufe()
{
    //Frage nach den Berufen danach Funktion mit den Antworten
    $.getJSON('http://home.gibm.ch/interfaces/133/berufe.php',function(antwort){
        //Foreach mit der antwort

        $.each(antwort,function(beruf_id,beruf)
        {
            // Berufe werden als option an das select mit der value als id und text als name
            $('#beruf').append($('<option/>',{
                value: beruf['beruf_id'],
                text : beruf['beruf_name']
            }));
        });
    });
}

//Funktion um die Klassen welches durch das JSON objekt geliefert werden in die Dropdown zu schreiben
function SetKlassen()
{
    //Beruf Id anhand von der ausgewählten Beruf nehmen und der Variable zuweisen
    var berufId = $('#beruf').val();
    //Prüfen ob BerufId leer ist
    if (berufId >= 0 && berufId != "")
    {
        //Frage nach den Klassen an hand des ausgewählten Berufes welches als value dessen Id hat danach Funktion mit den Antworten
        $.getJSON('http://home.gibm.ch/interfaces/133/klassen.php','beruf_id='+berufId,function(antwort){
            //Bitte wählen an klassen anhängen am anfang
            $('#klassen').append($('<option>',
            {
                text : "Bitte wählen"
            }));

            //Foreach mit der antwort
            $.each(antwort,function(klassenId,klasse)
            {
                // Klassen werden als option an das select mit der value als id und text als name
                $('#klassen').append($('<option/>',{
                    value: klasse['klasse_id'],
                    text : klasse['klasse_longname']
                }));
            });
            $('#klasse_Dropdown').fadeIn();
        });
    }
}

//Funktion um den Kalender mit den jeweiligen Stunden der Klasse zu füllen
function SetKalender()
{
    //ID der Ausgewählten Klasse holen
    var klassenId = $('#klassen').val();

    //JSON Anfrage für Stundenplan Daten
    $.getJSON('http://home.gibm.ch/interfaces/133/tafel.php?klasse_id='+klassenId+'&woche='+kalenderWoche+'-'+aktuellJahr,function(antwort){
        //Methode um die erhaltenen Daten das events array zu füllen
        GetData(antwort);
        //Events zum Kalender hinzufügen
        $('#kalender_tafel').fullCalendar('addEventSource', events);
        //Fullkalender herstellen mit Eigenen Buttons anderer Zeit ansicht und nur wochen ansicht
        $('#kalender_tafel').fullCalendar({
        timeFormat: 'H(.mm)',
        customButtons:{
           myNextButton:{
               text: 'Nächste Woche',
               click: function () {
                   $('#kalender_tafel').fullCalendar('next');
                   kalenderWoche = kalenderWoche+1;
                   $('#kalender_tafel').fullCalendar('removeEventSource',events);
                   events = [];
                   SetKalender();
               }
           },
             myPrevButton:{
                 text: 'Vorherige Woche',
                 click: function () {
                     $('#kalender_tafel').fullCalendar('prev');
                     kalenderWoche = kalenderWoche-1;
                     $('#kalender_tafel').fullCalendar('removeEventSource',events);
                     events = [];
                     SetKalender();
                 }
             },
             myTodayButton:{
                 text: 'Aktuelle Woche',
                 click: function () {
                     $('#kalender_tafel').fullCalendar('today');
                     kalenderWoche = GetWeekNumber();
                     $('#kalender_tafel').fullCalendar('removeEventSource',events);
                     events = [];
                     SetKalender();
                 }
             }
         },
            header:{
              right: 'myTodayButton,myPrevButton,myNextButton'
            },
         defaultView: 'agendaWeek',
         events:events
        });
    });
    //Bei änderungen an der Klasse werden die Events der vorherigen Klasse gelöscht
    $('#klassen').on('change', function(){
        $('#kalender_tafel').fullCalendar('removeEventSource',events);
        events = [];
    });
    $('#kalender_tafel').fadeIn();
}

//Funktion um die aktuelle Kalender woche zu ermitteln
function GetWeekNumber() {
    Date.prototype.getWoche = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7)-1;
    };
    return kalenderWoche = (new Date()).getWoche();
}

//Methode um events array mit Daten zu füllen welches der JSON File liefert
function GetData(antwort) {
        $.each(antwort, function (lektionId, lektion) {
            {
                events.push({
                    title: lektion['tafel_longfach'] + '\n' + lektion['tafel_lehrer'] + '\n' + lektion['tafel_raum'] + '\n' + lektion['tafel_kommentar'],
                    start: lektion['tafel_datum'] + 'T' + lektion['tafel_von'],
                    end: lektion['tafel_datum'] + 'T' + lektion['tafel_bis']
                })
            }
        })
}