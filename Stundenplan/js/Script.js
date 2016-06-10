/**
 * Created by vmuser on 30.05.2016.
 */

//Funktion um die Berufe welches durch das JSON objekt geliefert werden in die Dropdown zu schreiben
function GetBerufe()
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
function GetKlassen()
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
            $('#klasse_Dropdown').show();
        });
    }
}

function GetKalender()
{
    var klassenId = $('#klassen').val();
    $.getJSON('http://home.gibm.ch/interfaces/133/tafel.php','klasse_id='+klassenId,function(antwort){

    });
}
