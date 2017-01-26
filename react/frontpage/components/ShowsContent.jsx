// EventsContent.jsx


var React = require('react');

var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var FormControls = require('react-bootstrap').FormControls;
var Button = require('react-bootstrap').Button;
var ShowBlock = require('./ShowsBlock.jsx');
var Blurb = require('./ShowBlurb.jsx');

import { Bootstrap, Grid, Col } from 'react-bootstrap';

//styling
require('./shows.css');

var showData = [{"title":"Sad Dad","id":80,"day":"Tue","time":"9am","djs":{"aivanova":"DJ Jim"},"genre":"Post-Punk, Goth, New wave, Dad Rock","blurb":"What your dad would listen to if he was a goth kid in high school but still hip. Kind of like Car Talk but minus the cars. ☕","picture":"/saddad.png","public":true,"pages":[],"episodes":[]},{"title":"The Green Room","id":84,"day":"Sun","time":"3pm","djs":{"malikf7":"DJ Yung_Fai"},"genre":"Hip-Hop/Rap","blurb":"Enter the Green Room and listen to the newest and mellowest tracks from Hip-Hop's upcoming artists.","picture":"/uploads/360dc8027867266aaf851f54dd645e35.jpeg","public":true,"pages":[],"episodes":[]},{"title":"The Evening Delight","id":85,"day":"Tue","time":"7pm","djs":{"mangelanguyen":"Angela Nguyen"},"genre":"Local, New, Music News","blurb":"Music Director Angela plays some new tunes, gives us updates on what's going on in the music industry","picture":"/uploads/e9571075d606c96a15196ccfcbaa3852.png","public":true,"pages":[],"episodes":[]},{"title":"SGR IV- Bad Moves","id":88,"day":"Fri","time":"11am","djs":{"gracie":"DJ Tallest Gracie on Earth"},"genre":"rock/rap/folk punk","blurb":"Solid Gold Record returns with BAD MOVES. Turns out that record was actually gold plated copper, but hey, we all make mistakes.","public":true,"pages":[],"episodes":[]},{"title":"🌴URBANO🌴","id":102,"day":"Tue","time":"6pm","djs":{"rojasmateo78":"matovermind"},"picture":"/uploads/95aa821df4bc44c962aa9bb99e4e1344.png","public":true,"pages":[],"episodes":[]},{"title":"Passports","id":112,"day":"Sun","time":"1pm","djs":{"chefsami":"Chef Sami"},"genre":"World","blurb":"No time to travel? No worries. \nTune in on this auditory journey featuring a new country every week!","picture":"/uploads/d98081620176d826340cc941ad069b33.jpeg","public":true,"pages":[],"episodes":[]},{"title":"Everything  Sucks","id":120,"day":"Sat","time":"4pm","djs":{"sojones":"DJ Nugget"},"genre":"Punk","blurb":"A Brief History of Punk","picture":"/uploads/fdaa08e3acd8e0a4838ebac5a45969c9.png","public":true,"pages":[],"episodes":[]},{"title":"Dead Wax","id":123,"day":"Tue","time":"9pm","djs":{"bdlangdon":"Ben"},"genre":"Classic Rock, Punk,  Alternative","blurb":"Rock on and maybe learn a thing or two as I ramble about music for an hour","public":true,"pages":[],"episodes":[]},{"title":"Debate Team","id":122,"day":"Tue","time":"5pm","djs":{"jeshippy":"DJ Jes"},"genre":"Recreational Chat","blurb":"Get your popcorn ready. We talking sports y'all.","picture":"/uploads/b9683bd597df693648ebad168ab340a7.JPG","public":true,"pages":[],"episodes":[]},{"title":"In My Room","id":136,"day":"Mon","time":"11am","djs":{"caseymcnamara":"Casey"},"picture":"/uploads/e83f8efa08fe4140a0a45faa81f871e0.png","public":true,"pages":[],"episodes":[]},{"title":"Catch The Vibe","id":137,"day":"Tue","time":"8pm","djs":{"kyle_frankh":"Kyle Frankhuizen"},"genre":"Hip Hop, Jazz, Soul","blurb":"Hear the connections between hip hop, soul and jazz music through sampling. Listen to the music that influenced producers and hip hop artists today.","picture":"/uploads/f375b5a4ee6ed55156874951784ab598.png","public":true,"pages":[],"episodes":[]},{"title":"Pirate Radio","id":64,"day":"Sun","time":"11am","djs":{"chris":"DJ Jamburglar"},"genre":"Psychedelic","blurb":"Life is a trip... Sail away to undiscovered psychic frontiers with Pirate Radio","picture":"/uploads/cb98ea2ad7872c31af444ce876c97650.png","public":true,"pages":[],"episodes":[]},{"title":"reporting 4 booty","id":65,"day":"Fri","time":"7pm","djs":{"maddiegavin":"officer gavin"},"genre":"booty pop production","blurb":"pre game yo pre game with a lil dancin","picture":"/uploads/dd0f3960248dc8b151aff931e8d7b327.png","public":true,"pages":[],"episodes":[]},{"title":"MLB Talk","id":68,"day":"Mon","time":"5pm","djs":{"chasemadorsky":"DJ Madorsky"},"genre":"Sports","blurb":"Join Chase, Brent, and Sam as we discuss all things baseball!","picture":"/uploads/bb5b13e16d45faa1f370b6d104066f48.jpg","public":true,"pages":[],"episodes":[]},{"title":"Coast to Coast","id":67,"day":"Wed","time":"8pm","djs":{"chasemadorsky":"DJ Madorsky"},"genre":"Costal Music","blurb":"Join Chase and Cole as we play genre based music from both the East and West Coasts, all while bantering every step of the way!","picture":"/uploads/a90c6c92285f5349c465ab2e227c3aa9.jpg","public":true,"pages":[],"episodes":[]},{"title":"Now That's What I Call Music","id":66,"day":"Fri","time":"9am","djs":{"alisonchi":"DJ no chill"},"genre":"indie, new","blurb":"Wake up with DJ no chill on Fridays at 9am. We both know what you did last night. Hopefully you didn't drunkenly message or send memes to your bae. Either way, DJ no chill is here to console you while keeping you shaped up to the best music coming out with some nifty sustainability tips and updates.","picture":"/uploads/0a07a5d116640f9b0c53135a822996fc.png","public":true,"pages":[],"episodes":[]},{"title":"2 Stones + 1 Bird","id":70,"day":"Sat","time":"12pm","djs":{"laylamo":"DJ Merna Rex"},"genre":"Math Rock","blurb":"Tune in for 3,600 seconds of DJ Merna Rex playing some of her favorite math rock jams with heavy doses of prog and general weirdness as well.","picture":"/uploads/66db95b40cbc8a912759316c84be0dd5.jpg","public":true,"pages":[],"episodes":[]},{"title":"WWCS - Dreams of the Manbahsniese","id":69,"day":"Sat","time":"11am","djs":{"nscolieri":"Nicolo Scolieri"},"genre":"World","blurb":"Sound usually feels like interface between our lives and our world, but it can also inform our very existence. \"Dreams of the Manbahsniese\" is a counterpart to the culture-based show \"Where in the World is Carmen Sandiego?\" - it features sound effects and stories that deal with humanness, and being.","picture":"/uploads/c90f9a40e9faa0c26cce351e9ffda618.jpg","public":true,"pages":[],"episodes":[]},{"title":"FreshMangos!","id":72,"day":"Sun","time":"9pm","djs":{"ajdonahue":"Captain Boogaloo"},"genre":"Hip-hop, Soul, House, Funk, R&B, Reggae","blurb":"A delicious smoothie of soul, riddum, and ride. It's boogaloo season.","picture":"/uploads/3ac194a80dd2d8c876d41f0698c06e20.png","public":true,"pages":[],"episodes":[]},{"title":"Ball Don't Lie","id":74,"day":"Thu","time":"5pm","djs":{"ajdonahue":"Captain Boogaloo"},"genre":"Buckets","blurb":"Roundtable talk show about all things NBA","picture":"/uploads/399c91c8b97dcaba482ad0c1cd119fa9.png","public":true,"pages":[],"episodes":[]},{"title":"National Treasure","id":71,"day":"Wed","time":"11am","djs":{"amycummings":"Amy"},"genre":"Variety","blurb":"With weekly playlists geared toward the hottest insta-worthy, maybe-fake national holiday(s) of the moment, Champagne Ami's here to pop some bubbly and put you in the celebratory mood. Expect a full hour of tunes, talk, and tidbits dedicated to each week's holiday.","picture":"/uploads/e5af43f63f2144a5e5728d94e705672b.jpg","public":true,"pages":[],"episodes":[]},{"title":"Senile Soirée","id":75,"day":"Mon","time":"12pm","djs":{"ninastanding":"The Hootengrannies"},"genre":"hip-hop, the golden years, bingo","blurb":"It's knit gran! Senile Soirée delves deep into the wondrous world of the old. Disapproving Doris and Mild Mildred discuss youth culture analyze those rap lyrics you just can't understand, and don't quite know if you want to.","picture":"/uploads/19ddce5a9f964aa67261541b975f818b.png","public":true,"pages":[],"episodes":[]},{"title":"Queers 4 Ur Ears","id":76,"day":"Mon","time":"7pm","djs":{"nmockovciak":"spinach boi"},"genre":"talk/indie/pop","blurb":"~ a weekly radio show, which celebrates the work of queer musicians, while reflecting on the issues the LGBTQIA+ community faces, even today ~","public":true,"pages":[],"episodes":[]},{"title":"Rhyme Time with Huckleberry Spin","id":79,"day":"Sun","time":"7pm","djs":{"huckspin":"Huckleberry Spin"},"genre":"Hip-hop/Rap","blurb":"We all know who the greatest rappers are, but why are they the best? Huck Spin knows, and each week he breaks it down for you, delving into rhyme, flow, meaning, and more to analyze the songs he plays.","picture":"/uploads/526fd06c96ec74492cc55f4acfcff443.jpg","public":true,"pages":[],"episodes":[]},{"title":"Hi Society","id":82,"day":"Mon","time":"2pm","djs":{"AnnieWilliams":"DJ Cherry Bomb"},"genre":"Jazz, Blues, & Oldies","blurb":"Everything from Marlene Dietrich to Miles Davis. A celebration of Jazz, Blues, and Oldies, from the 1920s-80s.","picture":"/uploads/db26597d48c0bec0360fd77248cfccd6.jpg","public":true,"pages":[],"episodes":[]},{"title":"Vertigo","id":83,"day":"Mon","time":"9pm","djs":{"briannaklipp":"Don Kaiper"},"genre":"Alternative R&B","blurb":"Dj Don Kaiper invites emerging hip hop & festival performing artists for a candid interview.  No questions are left untouched, and bluntness is welcome. Tears may ensue. Tune in to hear alternative R&B music and to get insight on the newest political happenings. \n\nYou're not losing your mind, its just ~Vertigo","picture":"/uploads/31f70d36fe9671f56f32c29c938049d5.JPG","public":true,"pages":[],"episodes":[]},{"title":"Musicology","id":86,"day":"Thu","time":"12pm","djs":{"leegato":"DJ Leegato"},"genre":"Music/Analysis","blurb":"MUSIC THEORY MUSIC THEORY MUSICTHEORYMUSICTHEORY!  Join DJ Leegato as he explores a music theory concept each day and analyzes music of all genres that all use the concept!","picture":"/uploads/4060a93b0cb541acfdad585706d350d6.jpg","public":true,"pages":[],"episodes":[]},{"title":"Black Twitter","id":89,"day":"Mon","time":"3pm","djs":{"RohnieW":"Sneak Jesus"},"genre":"Talk, Comedy","blurb":"The forefront of culture and news","picture":"/uploads/9856a7f99dd820821d673a517683b7c5.png","public":true,"pages":[],"episodes":[]},{"title":"On Deck","id":91,"day":"Sun","time":"4pm","djs":{"amandawilcox":"DJ FroLite"},"genre":"Hip-Hop","blurb":"Equal parts education and bangers to teach you everything you need to know about hip-hop tracks, artistes, producers, and much more.","picture":"/uploads/38ccf63767b447fdc5493442ee491f1c.jpg","public":true,"pages":[],"episodes":[]},{"title":"60hz","id":92,"day":"Thu","time":"11am","djs":{"djbee":"DJ Bee"},"genre":"Movie Scores and Sounds","blurb":"The classic 60 Hz frequency that carries light to your screen and audio to your speakers is celebrated for an hour every Thursday, as we discuss the sounds, the songs, and the scores we hear on the big and small screen.","picture":"/uploads/44ce6ca43a23cafdedad87d583093f2a.jpg","public":true,"pages":[],"episodes":[]},{"title":"Garage Sale","id":93,"day":"Wed","time":"1pm","djs":{"meganhullander":"megan hullander"},"blurb":"Lo-fi rock for lo-life people. Old & new music from synth, garage, punk, and psychedelic rock with a distortiony sound. Good tunes, real talk. ☮🌀💿","picture":"/uploads/5103afa62de749ee48431bb2b3d907d6.jpg","public":true,"pages":[],"episodes":[]},{"title":"2000+-","id":94,"day":"Tue","time":"12pm","djs":{"shivalig":"DJ Chobani"},"blurb":"Listen in to discussions on topical events and tunes from your fave years in recent memory","public":true,"pages":[],"episodes":[]},{"title":"The Campfire","id":78,"day":"Mon","time":"6pm","djs":{"kianakavoosi":"DJ Toasty"},"genre":"Rock","blurb":"Gather round the campfire with DJ Toasty. Cozy up and hear stories woven from words, music, and magic✨","picture":"/uploads/5f9ee3b82d7725ca344b3ed052c9ba65.jpg","public":true,"pages":[],"episodes":[]},{"title":"DARK CURRENT","id":95,"day":"Fri","time":"3pm","djs":{"normaltype666":"DIRTYNUMBANGELBOY"},"genre":"POST PUNK // SYNTHPOP // DARKWAVE","blurb":"DANCE TO FORGET // FORGET TO LOVE // LOVE TO DIE","picture":"/uploads/b768deade5da1e31e1f8cbe9e241d8c8.jpg","public":true,"pages":[],"episodes":[]},{"title":"Deep End Theory","id":97,"day":"Thu","time":"10pm","djs":{"mjedmonds":"Bitwise"},"genre":"House/Trance/Bass","blurb":"Raise your heart rate with an hour long continuous mix live every week! Each week is a different genre within electronic music. Shows are available 24/7 at https://soundcloud.com/deependtheory","picture":"/uploads/7e005414962d7c2b6fa9fbc2bb6e2581.png","public":true,"pages":[],"episodes":[]},{"title":"Amplified","id":98,"day":"Wed","time":"2pm","djs":{"tkantner":"Yung Modulus"},"genre":"Punk, Grunge, alt rock, hip-hop","blurb":"Music reminding you of the heyday of your teenage angst. Punk, grunge, alt rock, and maybe even a little hip-hop from the 90s & 00s.","picture":"/uploads/8e8f0a3fcc8edecb5e00c2317ad421f7.png","public":true,"pages":[],"episodes":[]},{"title":"Came A Long Way","id":99,"day":"Tue","time":"3pm","djs":{"elatalu":"DJ est LA"},"genre":"Hip-Hop/Rap","blurb":"The hottest hip-hop/rap tracks from the most iconic rappers of the era. The journey of these stars from hardships to top moments, and how their lives have shaped their musical style.","picture":"/uploads/0a92f5112852ff6e2f7c57da4297306e.pdf","public":true,"pages":[],"episodes":[]},{"title":"the weathered channel","id":96,"day":"Tue","time":"11am","djs":{"mgasca":"onyx lee"},"genre":"experimental/nature","blurb":"Sit back & chill or hustle & multi-task to an hour of: nature field recordings + experimental music + highlights in research academia (10/10 not a snore fest) + weekly forecast(duh) with host Onyx Lee.","picture":"/uploads/9507cae77b1be1e112c0f6a1a02b387d.png","public":true,"pages":[],"episodes":[]},{"title":"QUIZ NITE","id":100,"day":"Wed","time":"10pm","djs":{"DJ_Aboney":"DJ Aboney"},"genre":"Trivia/Quiz/Music/Loads of fun","blurb":"A trivia quiz with two guests that will be about having FUN!","public":true,"pages":[],"episodes":[]},{"title":"UCLA Radio 1","id":106,"day":"Wed","time":"7pm","djs":{"Million":"Maxatrillion"},"genre":"Indie/Electronica","blurb":"Much in the vein of BBC Radio's infamous program, UCLA Radio 1 brings you the newest in the worlds of electronic and indie music. You never know who may stop by, from up and coming music acts, that girl from last week's party, or even someone wandering accidentally through. Tune in and discover something new before that BBC cease & desist hits our airwaves!","picture":"/uploads/0df62b88466a8b86872dc2ab91aa305f.png","public":true,"pages":[],"episodes":[]},{"title":"SexWithWomen","id":104,"day":"Wed","time":"6pm","djs":{"avalonlennon":"BadBav$"},"genre":"Hip-Hop/R&B","blurb":"Let's talk about sex, baby! Tune in Wednesday nights @6pm and listen to me talk about all things SEX with the help of some naughty tracks from your favorite Hip-Hop/R&B artists.  Let's make sex a conversation and de-stigmatize it from the public sphere!","picture":"/uploads/505cfc9caa84784bf9da8deb7e6c87e8.JPG","public":true,"pages":[],"episodes":[]},{"title":"Indie Heroes","id":110,"day":"Sun","time":"6pm","djs":{"djrarehart":"DJ Rare Hart"},"genre":"Live Performance","picture":"/uploads/782167886378a8eab559c3a89b319b51.jpg","public":true,"pages":[],"episodes":[]},{"title":"~ Ear Tapas ~","id":111,"day":"Thu","time":"9pm","djs":{"sforino":"DJ Double Denim"},"blurb":"Having a late night craving? Got an appetite for some ears d'oeuvres? DJ Double Denim's got ya with a diverse weekly playlist packed with all sorts of yum yums: garage rock, surf, psychedelic, lo-fi, hip-hop/rap, you name it. So kick back and let her wine and dine your ear holes with some delightful tunage and laid back chit chat.","picture":"/uploads/ba96e55fa6a667530e514f2a6e821611.png","public":true,"pages":[],"episodes":[]},{"title":"SPOILER ROOM","id":114,"day":"Sat","time":"6pm","djs":{"SPOILER ROOM":"Little Death Peretz"},"genre":"Dark 'n' Dancy","blurb":"DJ Little Death Peretz (rhymes with \"threats\") explores the underbelly of dance music every Saturday from 6-7pm PDT. Tune in for dark wave, industrial, EBM, electropunk, disco, house, trance, and techno.","picture":"/uploads/a15786dde0a7b82f28476742d45b0212.jpg","public":true,"pages":[],"episodes":[]},{"title":"Amusement Park","id":115,"day":"Thu","time":"3pm","djs":{"elliottdesai":"Elliott Desai"},"public":true,"pages":[],"episodes":[]},{"title":"Nü Indigo","id":90,"day":"Wed","time":"2pm","djs":{"suruki93":"Medafiziks"},"genre":"Uplifting","blurb":"Elevating consciousness through  music, good vibes, and  positive messages. Come vibe with Medafiziks as he invites a weekly guest to share art, inspiring stories, insight, advice  and good music!","picture":"/uploads/4ad87ea3615d51cf62bb418a2784e5b9.png","public":true,"pages":[],"episodes":[]},{"title":"Times New Roman","id":103,"day":"Fri","time":"9pm","djs":{"kosby":"DJ KAT!"},"genre":"T@lk & h1p h0p","blurb":"","picture":"/uploads/d151fd6c0cbb000bc4399d006db696cd.jpg","public":true,"pages":[],"episodes":[]},{"title":"Kinda Loud On The Eastern Front","id":105,"day":"Fri","time":"10am","djs":{"samrobertson":"Sam"},"genre":"Balkan Beats/World Fusion","blurb":"Eastern European and Middle Eastern music as you’ve never heard before. Balkan Beats, Gypsy Punk, Turbofolk and more. Friday's @ 10:00 AM on uclaradio.com. Czech out more about the show at https://www.facebook.com/kindaloudontheeasternfront/.","picture":"/uploads/9634c0c5883558e3d33095db13f92ef3.jpg","public":true,"pages":[],"episodes":[]},{"title":"A Moment of Silence","id":117,"day":"Fri","time":"12am","djs":{"TheodoreAllen":"DJ Sneaky"},"genre":"Meditation","blurb":"For all you faded, drunk fools that think you can't go on, collect yourselves and rally for that next party. Hangovers are temporary, glory is forever","picture":"/uploads/a1a69ec63f3a24b1fa2b446e7b5e95a5.jpg","public":true,"pages":[],"episodes":[]},{"title":"Burger Radio U","id":116,"day":"Sun","time":"10pm","djs":{"DJStefanopolis":"DJ Stefanopolis"},"blurb":"Bringing to you the best alternative/indie rock around with live  in-station performances from local artists.","picture":"/uploads/896be8c051b84e22ddbbde12c0255944.jpg","public":true,"pages":[],"episodes":[]},{"title":"The Children's Department","id":101,"day":"Sat","time":"3pm","djs":{"ace711":"DJ Lani"},"genre":"Bedroom Pop","blurb":"catch DJ Lani creating playlists inspired by her fave children's books and authors","picture":"/uploads/1339816b35296ff6b056358b7e65efa5.jpg","public":true,"pages":[],"episodes":[]},{"title":"CHO1iTA BEATS","id":113,"day":"Sun","time":"8pm","djs":{"rowleycarla":"DJ CAR1iTA & DJ Aboney"},"genre":"Lowrider Feelz","blurb":"L1STEN 1N as DJ CAR1iTA & DJ Albone attempt to simulate a lowrider cruisin experience. A variety of latinesque sounds will assist us and we will PUMP UP THE JAMZ!!!! Check out more @ facebook.com/cho1itabeats bAbiEz!!!","picture":"/uploads/38fe6335d5d2ab0f775421cda305869b.png","public":true,"pages":[],"episodes":[]},{"title":"Seven Dirty Words","id":121,"day":"Wed","time":"9am","djs":{"andytalajkowski":"DJ Nasty Woman"},"genre":"NSFW","blurb":"A radio show for everything that can't be on the radio - listen in for an hour dedicated to censorship of music on public airwaves.","picture":"/uploads/733d391752163893e74457a34134eabf.jpg","public":true,"pages":[],"episodes":[]},{"title":"It's LIT","id":108,"day":"Mon","time":"8pm","djs":{"eghsieh":"Mad Libs"},"genre":"Talk","blurb":"A silly show about LITerary analysis accompanied by some silly tunez based on themes and schemes of  a new book every week. Perfect show to listen to if u are a literary shawty <3 :~)","picture":"/uploads/3be7017e8140b90cc058d74a26497978.jpg","public":true,"pages":[],"episodes":[]},{"title":"Lost in the Sauce","id":124,"day":"Tue","time":"2pm","djs":{"DJRyRy":"DJ Ry Ry"},"genre":"Talk/Sports/Music","blurb":"Everyone from UCLA athletes to student leaders will be guests on this quarter's edition of Lost in the Sauce!","picture":"/uploads/428cb16b98a69eb6ec78b84ff1fdf3d8.jpg","public":true,"pages":[],"episodes":[]},{"title":"pho.losophy","id":127,"day":"Wed","time":"9pm","djs":{"cbishov":"earth boy pure"},"genre":"life talk psychedelia","blurb":"pho.losophy covers  my various thoughts from the weeks prior and is treated as a virtual, auditory diary. Previous episodes have discussed topics ranging from the definition of \"life intelligence\" to different planes of consciousness.","picture":"/uploads/52168ea10a9a4e8f5b0191b69b044d32.jpg","public":true,"pages":[],"episodes":[]},{"title":"The Fun House","id":118,"day":"Sat","time":"8pm","djs":{"bgdavis93":"DJ Turf Cobain"},"genre":"Dad Rock","blurb":"The product of a life spent digging through milk crates","picture":"/uploads/d3997fbf66703003fcd9ba4bde40c9e2.png","public":true,"pages":[],"episodes":[]},{"title":"The Briefing","id":129,"day":"Tue","time":"4pm","djs":{"briannaklipp":"Don Kaiper"},"blurb":"The Briefing is your weekly guide to understanding international and domestic policies. Tune in to hear the hosts provide objective reporting as they break-down the jargon, philosophical assumptions, and future implications of new policies.","public":true,"pages":[],"episodes":[]},{"title":"Bruins Talkin' Toons","id":131,"day":"Wed","time":"11pm","djs":{"colin_t":"Colin"},"genre":"Comedy","blurb":"Join hosts Colin and Ben as they talk all things animation. Interviewing show creators to voice actors, BTT will always leave you laughing.","picture":"/uploads/4e2f9c49d9c7d9f826f4374bdcc81c6b.jpg","public":true,"pages":[],"episodes":[]},{"title":"Fine Dining","id":130,"day":"Mon","time":"1pm","djs":{"annierimmon":"Sorta Gourmet"},"genre":"Food/Lifestyle","blurb":"The only food-centric show on UCLARadio. Every week I review a recipe, restaurant, and interview someone in the food world! Come dine with me!!","picture":"/uploads/b38dde1f2d9157636faac7dca0ac8dff.jpg","public":true,"pages":[],"episodes":[]},{"title":"The Variety Show","id":132,"day":"Sun","time":"5pm","djs":{"annierimmon":"Sorta Gourmet"},"genre":"Comedy","blurb":"The Comedy Departments showcase show! Sketches, improv, parody songs and more! Stay tuned for laughs and giggles.","public":true,"pages":[],"episodes":[]},{"title":"Mood Ring","id":133,"day":"Tue","time":"10pm","djs":{"ekelder":"DJ BeddBuggg"},"blurb":"Every week is a new mood, vibe, feeling or emotion with a playlist to match. Come feel your feels with DJ BeddBugg every Tuesdays at 10pm!","public":true,"pages":[],"episodes":[]},{"title":"Jazz O' Clock","id":87,"day":"Sat","time":"7pm","djs":{"sambcel":"DJ Benton Samuels"},"genre":"Jazz","blurb":"Tired of hearing Take Five and Chameleon on KJazz 88.1? Well this is the right show for you. Here on Jazz O'Clock, we include jazz from the farthest reaches of the genre while still retaining the greatest hits.","picture":"/uploads/4d02496fe339baab6c1f4b5b6790f14a.png","public":true,"pages":[],"episodes":[]},{"title":"The Undergrind","id":135,"day":"Mon","time":"9am","djs":{"uberhummus":"Strati"},"blurb":"The Undergrind brings a dose of underground to your daily grind. Music for your listening pleasure to get you through your day. Whether you're studying, cleaning, driving, walking to class, or still peeking over your blankets in bed, I'll be mixing an hour or stuff you didn't know you wanted to listen to. Live elements are gonna be a big part of the show, get ready to hear some vocals from yours truly\n\n- Strati","picture":"/uploads/15384e7de12822b27fffe5d732b56005.jpeg","public":true,"pages":[],"episodes":[]},{"title":"Insp.byPants","id":138,"day":"Fri","time":"8pm","djs":{"funkmasterfatnut":"DJ Longjohn"},"genre":"Chillwave/Rap","blurb":"Ride the Vibe with me and my friends.","picture":"/uploads/877b120c287fe0799b7d808acd30415c.jpg","public":true,"pages":[],"episodes":[]},{"title":"NSFW","id":128,"day":"Thu","time":"10am","djs":{"ramtinvafa":"DJ Ram"},"genre":"House/ Hip Hop/ Trap/ Disco","blurb":"Live Mix","public":true,"pages":[],"episodes":[]}];

//content of events page
var ShowsContent = React.createClass({

	getCurHour: function() {
			var d = new Date();
			var time;

			switch (d.getHours()) {
				case 7:
					time = "7am";
					break;
				case 8:
					time = "8am";
					break;
				case 9:
					time = "9am";
					break;
				case 10:
					time = "10am";
					break;
				case 11:
					time = "11am";
					break;
				case 12:
					time = "12pm";
					break;
				case 13:
					time = "1pm";
					break;
				case 14:
					time = "2pm";
					break;
				case 15:
					time = "3pm";
					break;
				case 16:
					time = "4pm";
					break;
				case 17:
					time = "5pm";
					break;
				case 18:
					time = "6pm";
					break;
				case 19:
					time = "7pm";
					break;
				case 20:
					time = "8pm";
					break;
				case 21:
					time = "9pm";
					break;
				case 22:
					time = "10pm";
					break;
				case 23:
					time = "11pm";
					break;
				default:
					time = "1am";
					break;
			}

			return time;
	},

	getCurDay: function() {
			var d = new Date();
			var day;

			switch (d.getDay()) {
				case 0:
					day = "Sun";
					break;
				case 1:
					day = "Mon";
					break;
				case 2:
					day = "Tue";
					break;
				case 3:
					day = "Wed";
					break;
				case 4:
					day = "Thu";
					break;
				case 5:
					day = "Fri";
					break;
				case 6:
					day = "Sat";
					break;
				default:
					day = "Sun"
					break;
			}

			return day;
	},

	getInitialState: function() {
		
		var d = new Date();
		var day = this.getCurDay();
		var time = this.getCurHour();
		var i;

		for (i=0; i < showData.length; i++) {
			if (showData[i].time == time && showData[i].day == day) {
				break;
			}
			if(i == (showData.length - 1)) {
				day = "Fri";
				time = "9am";
				i = 1;
				break;
			}
		}
		return{
			title: showData[i].title,
			id: showData[i].id,
			day: showData[i].day,
			time: showData[i].time,
			djs: showData[i].djs,
			genre: showData[i].genre,
			blurb: showData[i].blurb,
			picture: showData[i].picture,
			pub: showData[i].public,
			pages: showData[i].pages,
			episodes: showData[i].episodes,
			dDay: day,
			dHour: time
		}
	},

	handleShowChange: function(d,t) {
	
		for (var i=0; i < showData.length; i++) {
			if (showData[i].time == t && showData[i].day == d) {
				break;
			}
		}
		this.setState({
			title: showData[i].title,
			id: showData[i].id,
			day: showData[i].day,
			time: showData[i].time,
			djs: showData[i].djs,
			genre: showData[i].genre,
			blurb: showData[i].blurb,
			picture: showData[i].picture,
			pub: showData[i].public,
			pages: showData[i].pages,
			episodes: showData[i].episodes
		});
	},

	handleClick: function(d,t) {
		this.setState({
			dDay: d,
			dHour: t
		});
	},

	generateSlotsRow: function(t) {
		var slots = [];
		var day;

		for (var j = 0; j < 7; j++) {

			switch (j) {
				case 0:
					day = "Sun";
					break;
				case 1:
					day = "Mon"
					break;
				case 2:
					day = "Tue";
					break;
				case 3:
					day = "Wed";
					break;
				case 4:
					day = "Thu";
					break;
				case 5:
					day = "Fri";
					break;
				case 6:
					day = "Sat";
					break;
				default:
					break;
			}

			slots.push({day: day, time: t});
			
		}
		return slots;
	},


	render: function() {

		var headsStyle = {
			fontSize: '11px',
			marginRight: '1px',
			marginBottom: '2px',
			display: 'inline-block', 
			position: 'relative',
			width: '8%'
			
		} 

		var timeStyle = {
			fontSize: '11px',
			marginRight: '3px',
			display: 'inline-block', 
			position: 'relative',
			width: '8%',
			top: 7.5			
		} 

		var slots9am = this.generateSlotsRow("9am");
		var slots10am = this.generateSlotsRow("10am");
		var slots11am = this.generateSlotsRow("11am");
		var slots12pm = this.generateSlotsRow("12pm");
		var slots1pm = this.generateSlotsRow("1pm");
		var slots2pm = this.generateSlotsRow("2pm");
		var slots3pm = this.generateSlotsRow("3pm");
		var slots4pm = this.generateSlotsRow("4pm");
		var slots5pm = this.generateSlotsRow("5pm");
		var slots6pm = this.generateSlotsRow("6pm");
		var slots7pm = this.generateSlotsRow("7pm");
		var slots8pm = this.generateSlotsRow("8pm");
		var slots9pm = this.generateSlotsRow("9pm");
		var slots10pm = this.generateSlotsRow("10pm");
		var slots11pm = this.generateSlotsRow("11pm");

		return(
			<div>
				{/*}
				<div className="colorKey">
					<div className="colorKeyLabel">
						<p>Current Show</p>
						<div className="dot" style={{backgroundColor: "#3c84cc"}}></div>
					</div>
					<div className="colorKeyLabel">
						<p>Spotlight Show</p>
						<div className="dot" style={{backgroundColor: "#098440"}}></div>
					</div>
				</div>
				*/}
				<div>
					<Grid style={{ width: '100%', marginTop: '30px'}}>
						<Col xs={12} md={7}>
						
							<p style={headsStyle}></p>  <p style={headsStyle}>Sun</p> <p style={headsStyle}>Mon</p> <p style={headsStyle}>Tues</p> <p style={headsStyle}>Weds</p> <p style={headsStyle}>Thurs</p> <p style={headsStyle}>Fri</p> <p style={headsStyle}>Sat</p> 
							
							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>9am</p> 
									{slots9am.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>10am</p> 
								{slots10am.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>11am</p> 
								{slots11am.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>12pm</p> 
								{slots12pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>1pm</p> 
								{slots1pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>2pm</p> 
								{slots2pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>3pm</p> 
								{slots3pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>4pm</p> 
								{slots4pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>5pm</p> 
								{slots5pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>6pm</p> 
								{slots6pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>7pm</p> 
								{slots7pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>8pm</p> 
								{slots8pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>9pm</p> 
								{slots9pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>10pm</p> 
								{slots10pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>

							<div style={{ width: '100%', margin: '0 auto' }}>
								<p style={timeStyle}>11pm</p> 
								{slots11pm.map(item => (
										 <ShowBlock day={item.day} time={item.time} getCurDay={this.getCurDay} getCurHour={this.getCurHour} dDay={this.state.dDay} dHour={this.state.dHour} clickHandler={this.handleClick} hoverHandler={this.handleShowChange} />
									))}
							</div>
						
							
						</Col>
						<Col xs={12} md={5}>
							<Blurb time={this.state.time} id={this.state.id}  day={this.state.day} title={this.state.title} djs={this.state.djs} genre={this.state.genre} blurb={this.state.blurb} picture={this.state.picture} pub={this.state.pub} pages={this.state.pages} episodes={this.state.episodes} />

						</Col>
					</Grid>
				</div>
			</div>
		);
	}

});

module.exports = ShowsContent;