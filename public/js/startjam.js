function get_instruments(str) {
  var result = [];
  var instruments = str.split(" ");
  for(var i = 0; i < instruments.length; i++) {
    result.push({
      Instrument: instruments[i],
      User: null
    });
  }

  return result;
}

$(function() {
  $("form#start_jam").submit(function(e) {
    e.preventDefault();
    var jam_data = {
      Title: $(this).find("input.jam_title").val(),
      Spots: get_instruments($(this).find("input.jam_instruments").val()),
      Date: Date.parse($(this).find("input.jam_time").val()),
      Location: $(this).find("input.jam_location").val(),
      Description: $(this).find("input.jam_description").val(),
      Creator: "Jared"
    };

    $.post("/api/jams", jam_data, function(response) {
      window.location = "/";
    }, "json");
  });
});
