var count = 0;

$(document).ready(init);

function init() {
    loadData();
    $("#btnInserisci").click(btnInserisciClick);
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tblProduction tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

function loadData() {
    $.getJSON("http://win.bonato.it/ws/wspw.asmx/GetCommesse").done(onSuccess).fail(onError);
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
    })
    $("#tblProduction").html(lista);
}

function onError(error) {
    console.error("Si è verificato un errore: " + error.message);
}

function btnInserisciClick() {
    if ($("#txtIdCommessa").val() != "" && $("#txtPezziOk").val() != "" && $("#txtPezziKo").val() != "" && !(isNaN($("#txtPezziOk").val())) && !(isNaN($("#txtPezziKo").val()))) {
        var req = "http://win.bonato.it/ws/wspw.asmx/SetCommessa?jsonIn=[";
        
        var myObject = new Object();
        myObject.idCommessa = $("#txtIdCommessa").val();
        myObject.nrPezziOK = $("#txtPezziOk").val();
        myObject.nrPezziKO = $("#txtPezziKo").val();
        req += JSON.stringify(myObject) + "]";
        
        $.get(req, function (data, status) {
            if (status === "success") {
                loadData();
                count++;
                successAllert(count);
            } else {
                count++;
                dangerAllert(count);
            }
        });
    } else {
        count++;
        warningAllert(count);
    }
}

function successAllert(index) {
    createAllert(index);
    $("#allert" + index).removeClass("alert-danger");
    $("#allert" + index).removeClass("alert-warning");
    $("#allert" + index).addClass("alert-success");
    $("#allertMessag" + index).html(index + ")<strong>Success!</strong> Commessa inserita con successo");
    $("#allert" + index).addClass("show");
    timeOut(index);
}

function warningAllert(index) {
    createAllert(index);
    $("#allert" + index).removeClass("alert-danger");
    $("#allert" + index).addClass("alert-warning");
    $("#allert" + index).removeClass("alert-success");
    $("#allertMessag" + index).html(index + ") <strong>Warning!</strong> Devono essere compilati tutti i campi e con valori numerici i campi relativi ai pezzi");
    $("#allert" + index).addClass("show");
    timeOut(index);
}

function dangerAllert(index) {
    createAllert(index);
    $("#allert" + index).addClass("alert-danger");
    $("#allert" + index).removeClass("alert-warning");
    $("#allert" + index).removeClass("alert-success");
    $("#allertMessag" + index).html(index + ")<strong>Danger!</strong> Commessa non inserita");
    $("#allert" + index).addClass("show");
    timeOut(index);
}

function createAllert(index) {
    $("#allert-container").prepend("<div class='alert alert-dismissible fade hide mt-2' id='allert" + index + "'><button type='button' class='close' data-dismiss='alert'>&times;</button><div id='allertMessag" + index + "'></div></div>");
}

function timeOut(index) {
    window.setTimeout(function () {
        $("#allert" + index).fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 5000);
}
