/* Job 01
Adapte le code pour utiliser jQuery */

$(document).ready(function () {
    $('#show-btn').on('click', function () {
        $('#citation').show();
    });

    $('#hide-btn').on('click', function () {
        $('#main-content').hide();
    });
});