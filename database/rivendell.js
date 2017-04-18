// rivendell.js
/*

"Data model" for Rivendell database
Interfaces with rivendell.xml, an XML dump of Rivendell's database
The XML dump is converted into an array objects, where each object is as follows:

{
  field: [
    {
      _: "field_value_1",
      $: { 
       name: "field_label_1" 
      }
    },
    {
      _: "field_value_2",
      $: { 
       name: "field_label_2" 
      }
    },
    ...
  ]
}

Each song has a field array. The field array contains the song's properites
*/

const fs     = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const rivendell = {}; 

const rivendellDumpArray = [];
const songList = {};
const songs = [];

rivendell.getSongs = function(callback) {
  fs.readFile(__dirname + '/rivendell.xml', function(err, data) {
    if (err) {
      callback(err);
      return;
    }

    parser.parseString(data, function (err, result) {
      if (err) {
        callback(err);
        return;
      }
      rivendellDump = result.resultset.row;
      for (let entry of rivendellDump) {
        const songInfo = entry.field;
        const song = {}; 
        for (let field of songInfo) {
          if (field.$.name === "TITLE") {
            song.title = field._; 
          }

          if (field.$.name === "ARTIST") {
            song.artist = field._; 
          }

          if (field.$.name === "ALBUM") {
            song.album = field._; 
          }

          if (field.$.name === "GROUP_NAME") {
            song.group = field._; 
          }

        } 
        songs.push(song);
      } // end of rivendellDump loop

      // Get modified date of rivendell.xml
      songList.songs = songs;
      const stats =  fs.statSync(__dirname + '/rivendell.xml');
      const mtime = new Date(stats.mtime).toString();
      
      songList.time = mtime; 
      callback(null, songList);
    }); // end of parser
  }); // end of readFile
};


module.exports = rivendell; 

