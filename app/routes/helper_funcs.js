module.exports = {
  AppendValueSoSort(blurbs) {
    for (let i = 0; i < blurbs.length; i++) {
      if (
        blurbs[i].time.substr(
          blurbs[i].time.length - 2,
          blurbs[i].time.length - 1
        ) == 'am'
      ) {
        blurbs[i].order =
          blurbs[i].time.substr(0, blurbs[i].time.length - 2) - '12';
      } else if (blurbs[i].time == '12pm') {
        blurbs[i].order =
          blurbs[i].time.substr(0, blurbs[i].time.length - 2) - '12';
      } else {
        blurbs[i].order =
          blurbs[i].time.substr(0, blurbs[i].time.length - 2) - '0';
      }
    }
    return blurbs;
  },

  getUniqueBlurbs(blurbs) {
    const unique = [];

    for (let i = 0; i < blurbs.length; i++) {
      const showName = blurbs[i].title;

      if (unique.indexOf(showName) > -1) {
        // check if saved slot is after
        const saved_blurb = blurbs[unique.indexOf(showName)];
        if (saved_blurb.time.length > blurbs[i].time.length) {
          // 12
          console.log(`saved_blurb: ${saved_blurb.time}`);
          if (blurbs[i].time == '1PM') {
            saved_blurb.time = blurbs[i].time;
          }
        } else if (saved_blurb.time.length < blurbs[i].time.length) {
          if (blurbs[i].time == '12PM') {
            saved_blurb.time = blurbs[i].time;
          }
        } else if (saved_blurb.time[2] < blurbs[i].time[2]) {
          saved_blurb.time = blurbs[i].time;
        }
        blurbs[unique.indexOf(showName)] = saved_blurb;
        blurbs.splice(i, 1);
        i -= 1;
      } else {
        // push the names into the array
        unique.push(showName);
      }
    }
    return blurbs;
  },

  truncateName(name, l) {
    return name.length > l ? `${name.substr(0, l - 2)}\u2026` : name;
  },

  sort_by(field, reverse, primer) {
    const key = primer
      ? function(x) {
          return primer(x[field]);
        }
      : function(x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function(a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  },

  encode_safe_url(showName) {
    let safe_url;
    safe_url = showName.split('?').join('(question_mark)');
    safe_url = safe_url.split('$').join('(dollar)');
    safe_url = safe_url.split('&').join('(amperstamp)');
    safe_url = safe_url.split('+').join('(plus)');
    safe_url = safe_url.split(',').join('(comma)');
    safe_url = safe_url.split('/').join('(forward_slash)');
    safe_url = safe_url.split(':').join('(colon)');
    safe_url = safe_url.split('=').join('(equals)');
    safe_url = safe_url.split('@').join('(at)');
    safe_url = safe_url.split('"').join('(quote)');
    safe_url = safe_url.split('<').join('(less_than)');
    safe_url = safe_url.split('>').join('(greater_than)');
    safe_url = safe_url.split('#').join('(hashtag)');
    safe_url = safe_url.split('%').join('(percent)');
    safe_url = safe_url.split('{').join('(open_brace)');
    safe_url = safe_url.split('}').join('(close_brace)');
    safe_url = safe_url.split('|').join('(vertical_bar)');
    safe_url = safe_url.split('^').join('(carrot)');
    safe_url = safe_url.split('~').join('(tilde)');
    safe_url = safe_url.split('[').join('(open_bracket)');
    safe_url = safe_url.split(']').join('(close_bracket)');
    safe_url = safe_url.split('`').join('(grave_accent)');
    safe_url = safe_url.split(' ').join('_');

    return safe_url;
  },

  decode_safe_url(url) {
    let showName;
    showName = url.split('(question_mark)').join('?');
    showName = showName.split('(dollar)').join('$');
    showName = showName.split('(amperstamp)').join('&');
    showName = showName.split('(plus)').join('+');
    showName = showName.split('(comma)').join(',');
    showName = showName.split('(forward_slash)').join('/');
    showName = showName.split('(colon)').join(':');
    showName = showName.split('(equals)').join('=');
    showName = showName.split('(at)').join('@');
    showName = showName.split('(quote)').join('"');
    showName = showName.split('(less_than)').join('<');
    showName = showName.split('(greater_than)').join('>');
    showName = showName.split('(hashtag)').join('<');
    showName = showName.split('(percent)').join('%');
    showName = showName.split('(open_brace)').join('{');
    showName = showName.split('(close_brace)').join('}');
    showName = showName.split('(vertical_bar)').join('|');
    showName = showName.split('(carrot)').join('^');
    showName = showName.split('(tilde)').join('~');
    showName = showName.split('(open_bracket)').join('[');
    showName = showName.split('(close_bracket)').join(']');
    showName = showName.split('(grave_accent)').join('`');
    showName = showName.split('_').join(' ');

    return showName;
  },
};
