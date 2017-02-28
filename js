$(document).ready(function(){
  
  var website = ["finestKO", "freecodecamp", "asfadflk"];
  var html = "";
  
  $("button").click(function() {
    website.unshift($("input").val());
    html = "";
    refresh();
  });
  

  function refresh() {
    website.forEach(function(val) {
      $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + val + "?callback=?", function(json) {
        if (json.error == "Not Found") {
          html += "<div class='twitchCheck offline'>" + json.message + "</div>";
        } else {
          $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + val + "?callback=?", function(json2) {
              if (json2.stream == null) {
                html += "<div class='row twitchCheck offline'><div class='col-xs-2'><img src='" + json.logo + "'class='img-rounded' width='50px' height='50px'></div class='col-xs-8'>" + val + " is currently offline</div>";
              } else {
                html += "<a href='" + json2.stream.channel.url + "'><div class='row twitchCheck online'><div class='col-xs-2'><img src='" + json2.stream.channel.logo + "' class='img-rounded' width='50px' height='50px'></div><div class='col-xs-4'>" + json2.stream.channel.display_name  + "</div><div class='col-xs-6'>" + json2.stream.game + "<br><span>" + json2.stream.channel.status + "</span></div></div></a>";
              };
            $("#twitchOutput").html(html);
            });
        }
      });
    });
  } 
  
  refresh();
});
