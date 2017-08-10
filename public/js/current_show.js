function populate(show) {
  if (show == null || !show.length) {
    //remove the djblurb module
    $('#blurb-wrapper').remove();

    //center the play button
    $('#current-show').css('width', '250px');
    $('#current-show').css('margin-left', 'auto');
    $('#current-show').css('margin-right', 'auto');
    return;
  } else {
    for (var i = 0; i < 3; i++) {
      //most of this stuff can be done in jade,
      //but for now we'll fill content using JS
      var num = i + 1;
      slide = '#slide' + num;

      $(slide).find('h3').append(show[i].showName);
      // if(show[i].showName.length > 30)
      // {
      //   $(slide).find('h3').css("font-size", "2vw");
      // }

      $(slide)
        .find('.profile-pic')
        .append("<img class='dj-image' src=" + show[i].image + '/>');
      $(slide)
        .find('.hosted-by')
        .append('<strong>' + show[i].djName + '</strong> <br />');
      $(slide)
        .find('.hosted-by')
        .append('<em>' + show[i].genre + '</em> <br />');
      $(slide).find('.show-about').append(show[i].about);

      //if dj doesn't want an image
      if (show[i].image == '') {
        $(slide + 'p').remove();
      }
      if (i == 0) {
        document.getElementById('#' + i).innerHTML = 'On Air';
        document.getElementById('#' + i).style.textAlign = 'center';
        document.getElementById('#' + i).style.lineHeight = '2.5';
      } else {
        var time =
          show[i].timeslot[1] == '2' ||
          show[i].timeslot[1] == '1' ||
          show[i].timeslot[1] == '0'
            ? show[i].timeslot.slice(0, 2)
            : show[i].timeslot[0];
        // if(time.length == 2){
        //   document.getElementById('#' + i).innerHTML = '<div class="row"><div class="col-sm-2 timeslot">'  + time +'<br /><sup>' + show[i].timeslot.slice(-2) + '<div class="AMorPM">PST</div></sup>' + '</div><div class="col-sm-10"> <div class="djName">' + show[i].showName + "</div></div></div>";
        // }
        // else
        var showname =
          show[i].showName.length < 22
            ? show[i].showName
            : show[i].showName.slice(0, 22) + '...';
        var djname =
          show[i].djName.length < 22
            ? show[i].djName
            : show[i].djName.slice(0, 22) + '...';

        if (time.length == 2)
          document.getElementById('#' + i).innerHTML =
            '<div class="row"><div class="col-sm-3 timeslot">' +
            time +
            '<sup>' +
            show[i].timeslot.slice(-2) +
            '<br /><div class="AMorPM">PST</div></sup>' +
            '</div><div class="col-sm-9"> <div class="djName">' +
            showname +
            '<br /><div class="nav-dj-name"><em>' +
            djname +
            '</em></div></div></div></div>';
        else
          document.getElementById('#' + i).innerHTML =
            '<div class="row"><div class="col-sm-2 timeslot">' +
            time +
            '<sup>' +
            show[i].timeslot.slice(-2) +
            '<br /><div class="AMorPM">PST</div></sup>' +
            '</div><div class="col-sm-9"> <div class="djName">' +
            showname +
            '<br /><em>' +
            djname +
            '</em></div></div></div>';
      }
    }
    $('#blurb-wrapper').show();
  }
}
