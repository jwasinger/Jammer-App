//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function() {
  $.ajax({
    dataType: "json", 
    method: "GET",
    url: "/api/jams?title="+getParameterByName("title"),
  }).done(function(data) {
      $("div.title-container div.title").text(data.Title);      
      for(var i = 0; i < data.Spots.length; i++) {
        var spot_element = $("<div class='jam-spot row'></div>");
        spot_element.append("<div class='col-xs-6'>"+data.Spots[i].Instrument+"</div>");

        spot_element.append("<div class='btn-container col-xs-6'></div>");
        if(data.Spots[i].User == "") {
          spot_element.find("div.btn-container").append("<button class='btn btn-primary btn-sm'>Join</button>");
        } else {
          spot_element.find("div.btn-container").text(data.Spots[i].User);
        }
        $("div.jam-spot-container").append(spot_element);
      }

      $("span.datetime-value").text(data.Date);
      $("span.location-value").text(data.Location);
      $("p.description-value").text(data.Description);
  });
});
