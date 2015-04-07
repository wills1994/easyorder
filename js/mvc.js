
$(document).ready(function(){

$.getScript("js/model/model.js")
.done($.getScript("js/view/view.js"))
.done($.getScript("js/controller/controller.js"));

});//acaba document ready