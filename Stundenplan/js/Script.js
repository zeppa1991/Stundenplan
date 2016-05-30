/**
 * Created by vmuser on 30.05.2016.
 */
function LoadBerufe()
{
    var beruf_id, beruf_name;
    //Frage nach den Daten danach Funktion mit den Antworten
    $.getJSON('http://home.gibm.ch/interfaces/133/berufe.php',function(antwort){
        //Foreach mit der antwort
        $.each(antwort,function(beruf_id,berufName)
        {
            beruf_id = berufName['beruf_id']
            beruf_name = berufName['beruf_name']

            // Berufe werden als option an das select mit der id beruf
            $('#beruf').append($('<option/>',{
                value: beruf_id,
                text : beruf_name
            }));
        });
    });
}

function LoadKlassen()
{
    var beruf_id, beruf_name;
    //Frage nach den Daten danach Funktion mit den Antworten
    $.getJSON('http://home.gibm.ch/interfaces/133/berufe.php',function(antwort){
        //Foreach mit der antwort
        $.each(antwort,function(beruf_id,berufName)
        {
            beruf_id = berufName['beruf_id']
            beruf_name = berufName['beruf_name']

            // Option im Select anhängen
            $('#beruf').append($('<option/>',{
                value: beruf_id,
                text : beruf_name
            }));
        });
        $('#beruf_loading').hide();
    });
}
