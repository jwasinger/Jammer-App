$(function() {
  $.ajax({
    dataType: "json", 
    method: "GET",
    url: "/api/jams",
  }).done(function(data) {
    for(var i = 0; i < data.data.length; i++) {
      var new_btn = $("<button type='button' class='list-group-item'>"+data.data[i].Title+"</button>");
      $("div.active-jams").append(new_btn);
    }
  });
});
