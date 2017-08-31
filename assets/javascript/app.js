var user = "hilzery";
var queryURL = "https://igapi.ga/" + user + "/media?";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response.items);
      var i = 0;
      var lastLocation = response.items[i].location.name;
      console.log(lastLocation);

    });