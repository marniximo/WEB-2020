$(document).ready(function () {
    $("#searchbutton").on("mousedown", search);
    $("#searchbar").on("keypress", function(e){
        if(e.which == 13){
            search();
        }
    });
});

var search = function(){
    var value = $("#searchbar").val().toLowerCase();
        $("#table tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}