$(document).ready(init);

        function init() {
           
            loadData();
            $("#btnSalva").click(SalvaJSON);
            $("#btnUpload").click(Upload);
            $('#table').DataTable();

        }
        
        function loadData(){
            $.getJSON("http://win.bonato.it/ws/wspw.asmx/GetCommesse").done(onSuccess).fail(onError);
        }

        function onError(error) {
            alert("Si è verificato un errore " + error.status);
        }

        function onSuccess(jsonData){
            var lista = "";
            $(jsonData).each(function () {

                lista += "<tr><td>" + $(this).attr("idCommessa") + "</td>" + "<td>" + $(this).attr("nrPezziOK") + "</td>" + "<td>" + $(this).attr("nrPezziKO") + "</td>" + "<td>" + $(this).attr("lastUpdate") + "</td>" + "</tr>";

            });
            $("#myTable").html(lista);
            
        }

        var stringa = "[";
        var cont = 0;

        function SalvaJSON(){

            var ID = $("#txtCommessa").val();
            var PFatti = $("#txtPezziFatti").val();
            var PScarti = $("#txtPezziScartati").val();

            if(ID!="" && PFatti!="" && PScarti!=""){
                if(cont!=0){
                    stringa += ',{"idCommessa":"' + ID + '","nrPezziOK":' + PFatti + ',"nrPezziKO":' + PScarti + '}';
                }
                else{
                    stringa += '{"idCommessa":"' + ID + '","nrPezziOK":' + PFatti + ',"nrPezziKO":' + PScarti + '}';
                    cont++;
                }
                
                alert(stringa);
            }
            else{
                alert("Compila i campi!");
            }
            
        }

        function Upload(){
            alert("test1");
            stringa += "]";
            stringa= "http://win.bonato.it/ws/wspw.asmx/SetCommessa?jsonIn="+stringa;
            $.get(stringa, function (data, status) {
                alert("test2");
                if (status === "success") {
                    alert("test3");
                    loadData();
                }
            });
            
        }