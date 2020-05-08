$(document).ready(init);

function init() {
    loadtable();
    $("#aggiungi").click(aggiungicommessa);
    $("#refresh").click(loadtable);
}

function loadtable() {
    $.getJSON("http://win.bonato.it/ws/wspw.asmx/GetCommesse").done(onSuccess).fail(onError);
}

function onSuccess(jsonData) {
    
    var result = "";
    $(jsonData).each( function () {
        result += "<tr><td>"
                +$(this).attr("idCommessa")+"</td><td>"
                +$(this).attr("nrPezziOK")+"</td><td>"
                +$(this).attr("nrPezziKO")+"</td><td>"
                +$(this).attr("LastUpdate")+"</td></tr>";
        $("#mytbody").html(result);
    });
    $("#loading").hide();
}

function onError(error) {
    alert("Errore caricamento xml!"+error.status);
}

function aggiungicommessa() {
    var idcommessa = $("#idcommessa").val();
    var pzreal = $("#pzreal").val();
    var pzscar = $("#pzscar").val();
    
    var stringaJson = '[{"idCommessa": "'+idcommessa+'", "nrPezziOK": '+pzreal+', "nrPezziKO": '+pzscar+'}]';
    
    window.open("http://win.bonato.it/ws/wspw.asmx/SetCommessa?jsonIn="+stringaJson).fail(function (error) {alert("Errore durante l'aggiunta del record"+error.status);});
}


/*

 [{
     "idCommessa": "C001",
     "nrPezziOK": 10.0,
     "nrPezziKO": 0.0,
     "lastUpdate": "2020-05-03T11:52:11"
 }, {
     "idCommessa": "C002",
     "nrPezziOK": 100.0,
     "nrPezziKO": 0.0,
     "lastUpdate": "2020-04-30T10:51:07"
 }, {
     "idCommessa": "C003",
     "nrPezziOK": 50000.0,
     "nrPezziKO": 1.0,
     "lastUpdate": "2020-05-02T21:41:06"
 }, {
     "idCommessa": "C004",
     "nrPezziOK": 20000.0,
     "nrPezziKO": 40.0,
     "lastUpdate": "2020-05-05T11:46:50"
 }, {
     "idCommessa": "C005",
     "nrPezziOK": 400.0,
     "nrPezziKO": 8.0,
     "lastUpdate": "2020-05-05T13:13:52"
 }, {
     "idCommessa": "C008",
     "nrPezziOK": 10.0,
     "nrPezziKO": 0.0,
     "lastUpdate": "2020-05-05T13:00:45"
 }, {
     "idCommessa": "mele",
     "nrPezziOK": 100.0,
     "nrPezziKO": 20.0,
     "lastUpdate": "2020-05-05T12:32:32"
 }]
 
 */