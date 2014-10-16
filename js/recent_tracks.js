
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
 
function lfmRecentTracks(JSONdata) {
 
try { 
 var oTracks = new Array().concat(JSONdata.recenttracks.track);
 var eDiv = document.getElementById("lfmRecentTracks");
 var sTemplate = eDiv.innerHTML;
 var sHTML = "";
 
 for (var i =  typeof oTracks[0]['@attr'] == "undefined"  ? 0 : 1; i < oTracks.length; i++) {
 
  sHTML =  sHTML
        + sTemplate
          .replace("%IMAGE%", oTracks[i].image[1]["#text"] != "" ? oTracks[i].image[1]["#text"] : "http:\/\/cdn.last.fm\/flatness\/icons\/res\/3\/track.png" )
          .replace("%TITLE%",  truncateName(oTracks[i].name,            25))
          .replace("%ARTIST%", truncateName(oTracks[i].artist["#text"], 22))
          .replace("%DATE%", calculateDateAgo(new Date().getTime()/1000 - oTracks[i].date.uts)  );
 }  
eDiv.innerHTML = sHTML;
eDiv.style.visibility = "visible";
} catch(e) {}
 
}