function lfmMostRecentTrack(JSONdata) {
  var oTrack = (new Array().concat(JSONdata.recenttracks.track))[0];
  if(oTrack.image[1]["#text"] != "")
    document.getElementById("lfmMostRecentTrackImage").src = oTrack.image[1]["#text"] ;
  if(oTrack.streamable == "1")
    document.getElementById("lfmMostRecentTrackPlayIcon").style.display = "inline";
  document.getElementById("lfmMostRecentTrackArtist").innerHTML = oTrack.artist["#text"];
  document.getElementById("lfmMostRecentTrackTitle").href = oTrack.url;
  document.getElementById("lfmMostRecentTrackTitle").innerHTML = oTrack.name;
  document.getElementById("lfmMostRecentTrackAlbum").innerHTML = oTrack.album["#text"];
  document.getElementById("lfmMostRecentTrackDate").innerHTML = (typeof oTrack.date=="undefined"?"now playing":oTrack.date["#text"]);
}