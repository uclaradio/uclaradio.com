
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

function loadcarousel(arr) {
  var oTracks = new Array().concat(JSONdata.recenttracks.track);
  //console.log("BOOOOO");

}

// var myVar;
// function myFunction(){

//   myVar = 

function lfmRecentTracks(JSONdata) {
    var oTracks = new Array().concat(JSONdata.recenttracks.track);
    //console.log(oTracks);
    for (var i =  typeof oTracks[0]['@attr'] == "undefined"  ? 0 : 0; i < oTracks.length; i++) {
        
        var div = document.getElementById('c_data');
        var pic = oTracks[i].image[1]["#text"] != "" ? oTracks[i].image[2]["#text"] : null;
        var track_title = truncateName(oTracks[i].name, 22);
        var artist = truncateName(oTracks[i].artist["#text"], 22);
        var date;

        if (!oTracks[i].date)
        {
          date = "Now Playing";
          var imbed = (pic == null) ? '<img class= "album_artwork" id="currently_playing" src="img/no_album_artwork.jpg" />' : '<img class= "album_artwork" id="currently_playing" src="' + pic + '"/>';
          var now_playing= '<img id="current_track" src="img/musicbaryt3.gif" />';
          div.innerHTML = div.innerHTML + '<div> <br />' + imbed + '<strong>"' + track_title + '"</strong><br />' + artist + now_playing + '</div>';

        }
        else
        {
          //include case such that no image is found
         date = calculateDateAgo(new Date().getTime()/1000 - oTracks[i].date.uts);
         pic = (pic == null) ? "img/no_album_artwork.jpg" : pic;
         div.innerHTML = div.innerHTML + '<div> <br />' + '<img class= "album_artwork" src="' + pic + '"</>'+ '<strong>"' + track_title + '"</strong><br />' + artist + "<br />" + date + '</div>';
        }

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

 



