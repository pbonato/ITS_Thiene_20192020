$(document).ready(init);

function init() {
    $.getJSON("http://win.bonato.it/ws/wspw.asmx/GetCommesse").done(onSuccess).fail(onError);   //get
    $("#myBtn").click(btnclick);    //set
    
    $("#myReload").click(btnReload);

    //ricerca nella tabella
    $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();    //mette tutto il testo in minuscolo
    $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

function onSuccess(jsonData) {
    var lista = "";
    $.each(jsonData, function (name, value) {
        lista += "<tr>";
        lista += "<td>" + value.idCommessa + "</td>";
        lista += "<td>" + value.nrPezziOK + "</td>";
        lista += "<td>" + value.nrPezziKO + "</td>";
        lista += "<td>" + value.lastUpdate + "</td>";
        lista += "</tr>";
    });
    $("#myTable").html(lista);  //id della mia tabella, html -> interpreta in html
}

function btnclick(){
    var stringa = "http://win.bonato.it/ws/wspw.asmx/SetCommessa?jsonIn=["
    var myObject = new Object();
    myObject.idCommessa = $("#txtID").val();
    myObject.nrPezziOK = $("#txtNPOK").val();
    myObject.nrPezziKO = $("#txtNPW").val();
    stringa += JSON.stringify(myObject) + "]";
    $.get(stringa,function(data){
        //alert(data);
        $("#myModal").modal({backdrop: "static"});
        $("#myData").html("<p>" + data + "</p>");
        
    });
}

function btnReload(){
    location.reload();  //refresh forzato della pagina per avere la tabella aggiornata
}

function onError(error) {
    alert("Si è verificato un errore " + error.status);
}