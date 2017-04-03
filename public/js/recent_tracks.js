
function calculateDateAgo(secAgo) {
 var agoString, agoRange, agoScaled;
 if(secAgo >= (agoRange = 60*60*24)) 
   agoString = (agoScaled = Math.floor(secAgo/agoRange))+" "+(agoScaled>1?"days":"day") + " ago"
 else if(secAgo >= (agoRange = 60*60))
   agoString = (agoScaled = Math.floor(secAgo/agoRange))+" "+(agoScaled>1?"hours":"hour") + " ago"
 else if(secAgo >= (agoRange = 60))
   agoString = (agoScaled = Math.floor(secAgo/agoRange))+" "+(agoScaled>1?"minutes":"minute") + " ago"
 else if(secAgo >= -60)
   agoString = "listening just now";
 else
   agoString = "soon ;)";
 return agoString
}
 
function truncateName(name, l) {
return name.length > l ? name.substr(0,l-2) + "\u2026" : name
}

var latestTrackInfo = {
  name: null,
  artist: null
};

function updateRecentTracks(JSONdata) {
    var oTracks = new Array().concat(JSONdata.recenttracks.track);

  var div = document.getElementById('c_data');
  var pic = oTracks[0].image[1]["#text"] != "" ? oTracks[0].image[2]["#text"] : null;
  var latestTrackTitle = truncateName(oTracks[0].name, 22);
  var latestTrackArtist = truncateName(oTracks[0].artist["#text"], 22);

  if (latestTrackTitle !== latestTrackInfo.name && latestTrackArtist !== latestTrackInfo.artist) {
    latestTrackInfo.name = latestTrackTitle;
    latestTrackInfo.artist = latestTrackArtist;
    
    var rm_currently_playing = document.getElementById('current_track');
    if(rm_currently_playing != null)
      rm_currently_playing.parentNode.removeChild(rm_currently_playing);
      //include case such that no image is found
    pic = (pic == null) ? "img/no_album_artwork.jpg" : pic;
     $('#c_data').slick('slickAdd', '<div> <br />' + '<img class= "album_artwork" src="' + pic + '"</>'+ '<strong>"' + latestTrackTitle + '"</strong><br />' + latestTrackArtist + '<img id="current_track" src="img/musicbaryt3.gif" /></div>', 0, true);
  }
}

function lfmRecentTracks(JSONdata) {
  var oTracks = new Array().concat(JSONdata.recenttracks.track);

  latestTrackInfo.name = truncateName(oTracks[0].name, 22);
  latestTrackInfo.artist = truncateName(oTracks[0].artist["#text"], 22);

  for (var i = 0; i < oTracks.length; i++) {
    
    //var div = document.getElementById('c_data');
    var pic = oTracks[i].image[1]["#text"] != "" ? oTracks[i].image[2]["#text"] : null;
    var track_title = truncateName(oTracks[i].name, 22);
        var artist = truncateName(oTracks[i].artist["#text"], 22);

    pic = (pic == null) ? "img/no_album_artwork.jpg" : pic;
    currently_indicator = (!oTracks[i].date) ? '<img id="current_track" src="img/musicbaryt3.gif" />' : "";
        $('#c_data').slick('slickAdd', '<div> <br />' + '<img class= "album_artwork" src="' + pic + '"</>'+ '<strong>"' + track_title + '"</strong><br />' + artist + currently_indicator +'</div>');

    }

  $('#messages').slideDown("slow", function(){
    $( '#c_data' ).fadeIn(1000);
  });
}

// }

// function myStopFunction(){
//   myVar;
// }
// try { 
//  var oTracks = new Array().concat(JSONdata.recenttracks.track);
//  console.log(oTracks);
//  loadcarousel(oTracks);
//  var eDiv = document.getElementById("lfmRecentTracks");
//  var sTemplate = eDiv.innerHTML;
//  var sHTML = "";

//  for (var i =  typeof oTracks[0]['@attr'] == "undefined"  ? 0 : 1; i < oTracks.length; i++) {

//   sHTML =  sHTML
//         + sTemplate
//           .replace("%IMAGE%", oTracks[i].image[1]["#text"] != "" ? oTracks[i].image[1]["#text"] : "http:\/\/cdn.last.fm\/flatness\/icons\/res\/3\/track.png" )
//           .replace("%TITLE%",  truncateName(oTracks[i].name,            25))
//           .replace("%ARTIST%", truncateName(oTracks[i].artist["#text"], 22))
//           .replace("%DATE%", calculateDateAgo(new Date().getTime()/1000 - oTracks[i].date.uts)  );



//  }  

// eDiv.innerHTML = sHTML;
// eDiv.style.visibility = "visible";
// } catch(e) {}

 



