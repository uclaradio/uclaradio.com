// frontpage.jsx
// Radio Front Page

var React = require('react');
var ReactDOM = require('react-dom');

// FrontPage Elements
var TriangleCanvas = require('./frontpage/TriangleCanvas.jsx');
var FrontPageNavbar = require('./frontpage/FrontPageNavbar.jsx');
var StreamBar = require('./frontpage/StreamBar.jsx');
var LiveShowInfo = require('./frontpage/LiveShowInfo.jsx');
var WaterFallContent = require('./frontpage/WaterFallContent.jsx');
var DJInfo = require('./frontpage/DJInfo.jsx');
var DJList = require('./frontpage/DJList.jsx');

// Common Elements
var RectImage = require('./common/RectImage.jsx');

// Bootstrap elements
var Bootstrap = require('react-bootstrap');
var Grid = Bootstrap.Grid;
var Col = Bootstrap.Col;

// Custom
var theme = require('./misc/theme');

var nowPlayingURL = "/api/nowplaying";

// Hard coded data for now: 
var data = [{"username":"sanjaypawar25","fullName":"Sanjay Pawar","email":"sanjaypawar25@gmail.com"},{"username":"dloza123","fullName":"Daniil Loza","djName":"DJ D Lo","email":"daniil.loza@gmail.com"},{"username":"alisonchi","fullName":"Alison Chi","djName":"DJ no chill","picture":"/uploads/528acf8e931c2408879d99c352563a44.jpg","email":"alisonxchi@gmail.com"},{"username":"djrarehart","fullName":"Joel Moreno","djName":"DJ Rare Hart","picture":"/uploads/9b51ddadbc71dfc282701805aacb44a7.JPG","email":"joelsmoreno1993@gmail.com","phone":"6262535619"},{"username":"annierimmon","fullName":"Annie Rimmon","djName":"DJ Sorta Gourmet","email":"annierimmon@ucla.edu","phone":"3106510180"},{"username":"issadn@ucla.edu","fullName":"Issa Nasrallah","email":"issadn@ucla.edu"},{"username":"maddiegavin","fullName":"Maddie Gavin","djName":"officer gavin","picture":"/uploads/9ccf1492dc3037cecf1cdb2e52ed8e80.jpg","email":"maddiegav@gmail.com","phone":"8476025309"},{"username":"ninastanding","fullName":"Nina Standing","djName":"The Hootengrannies","picture":"/uploads/7e623010677cb863b7b6906af4ae9f4b.jpg","email":"ninaestanding@gmail.com","phone":"7075401792"},{"username":"evamariapino","fullName":"Eva Maria Pino","djName":"DJ Bittersweet","picture":"/uploads/bb0141c98a56ed83f77e0cb12e67939f.jpg","email":"agm@uclaradio.com","phone":"8058070935"},{"username":"1023alexa","fullName":"Alexa Lee","email":"1023alexa@gmail.com"},{"username":"mjedmonds","fullName":"Mark Edmonds","email":"mark@mjedmonds.com"},{"username":"kyle.frank","fullName":"Kyle Frankhuizen","email":"kfrankhuizen@ucla.edu"},{"username":"nscolieri","fullName":"Nicolo Scolieri","djName":"","picture":"/uploads/3982408bffe9b4d26694abd24c57f753.jpg","email":"nscolieri@yahoo.com"},{"username":"malikf7","fullName":"Faizan Malik","djName":"DJ Yung_Fai","picture":"/uploads/3a54feea13250c1ed57d079b2414cc27.JPG","email":"malikf7@gmail.com","phone":"914-708-8381"},{"username":"gm","fullName":"General Manager","djName":"Big Gee-Em","email":"gm@uclaradio.com"},{"username":"bethanytr","fullName":"Bethany Rennard","email":"bethany.rennard@gmail.com"},{"username":"gracie","fullName":"Gracie Phillips","djName":"DJ Tallest Gracie on Earth","email":"grace.phillips@ucla.edu","phone":"2163151170"},{"username":"Gjlaird","fullName":"Garrett Laird","email":"Gjlaird@ucla.edu"},{"username":"cfrost13","fullName":"Cole Frost","email":"cfrost13@ucla.edu"},{"username":"Loganpatton97","fullName":"Logan Patton","email":"loganpatton97@g.ucla.edu"},{"username":"DJ Sleepless","fullName":"Marcia Brinck","email":"mbrinck@ucla.edu"},{"username":"jason_mally","fullName":"Jason Mally","djName":"J Mally","email":"jasonmally1@gmail.com"},{"username":"atalajkowski","fullName":"Andy Talajkowski","email":"talajkowskia@gmail.com"},{"username":"torp808","fullName":"Alex Torpey","email":"actorpey1@gmail.com"},{"username":"DJSpecialMess","fullName":"Terry Hu","email":"thu25@g.ucla.edu"},{"username":"chasemadorsky","fullName":"Chase Madorsky","email":"themadorskanator@aol.com"},{"username":"dkhaothong","fullName":"derek khaothong","djName":"Derek","email":"derek.khaothong@gmail.com"},{"username":"laylamo","fullName":"Layla Moheimani","djName":"DJ Merna Rex","email":"laylabruin@gmail.com"},{"username":"bhewitt","fullName":"Brittany Hewitt","djName":"DJ Britt and DJ masht potatoes","email":"Bhewitt@media.ucla.edu"},{"username":"caseylee","fullName":"Casey Lee","djName":"DJ KC","picture":"/uploads/1adc3f93d7071828b2e87052d6ccd106.jpg","email":"caseylee2018@g.ucla.edu","phone":"(510) 908-3808"},{"username":"mgasca","fullName":"Maria Gasca","djName":"DJ Onyx Lee Adams","picture":"/uploads/f722f47494db1070fb1bfb208496a12d.gif","email":"mgasca1997@gmail.com"},{"username":"ekelder","fullName":"Elise Kelder","djName":"DJ BeddBuggg","email":"ekelder@student.rcc.edu"},{"username":"ajdonahue","fullName":"Aidan Donahue ","djName":"Captain Boogaloo","email":"Ajdonahue@ucla.edu "},{"username":"mangelanguyen","fullName":"Angela Nguyen","djName":"Angela Nguyen","picture":"/uploads/30e6baf5fd02f4499b25d44c568da05b.png","email":"mangelanguyen@gmail.com","phone":"5625372383"},{"username":"djkarl","fullName":"Dylan Karlsson","djName":"DJ Karl","picture":"/uploads/5743a530c6dbe14f501af1a1209599b8.png","email":"karlsson.dylan@gmail.com"},{"username":"RohnieW","fullName":"Rohnie Williams","djName":"DJ Yung Masht Potatoes","email":"rohniewi@live.com","phone":"9519611019"},{"username":"hsuregan","fullName":"Regan Hsu","djName":"Regan Hsu","picture":"/uploads/9f61f4047ddb17d3778253d4380987de.png","email":"rhsu@media.ucla.edu","phone":"5125176805"},{"username":"awilliams","fullName":"Annie Williams","djName":"DJ Cherry Bomb","picture":"/uploads/cbccab58b6acbbd8b456b7812f499d6d.jpg","email":"awilliams8316@g.ucla.edu"},{"username":"chris","fullName":"Chris Laganiere","djName":"DJ Jamburglar","picture":"/uploads/288034be36b001a18e5705434c2a17f5.png","email":"chrislaganiere@ucla.edu","phone":"661.309.8154"},{"username":"nmockovciak","fullName":"Nicolas Mockovciak","djName":"spinach boi & DJ Centrifuge","picture":"/uploads/ab3b0c558aedbd325b7232a7e21cca81.jpg","email":"nmockovciak@gmail.com","phone":"7079803389"},{"username":"mrbryan273","fullName":"Bryan Isaac Villalpando","djName":"DJ Villalpando","picture":"/uploads/722dae0766379474e485a51072425e4e.jpg","email":"bryan.villalpando@ucla.edu"},{"username":"elliottdesai","fullName":"Elliott Desai","djName":"Elliott Desai","picture":"/uploads/3914faf43751dfe78dbcc7bf997f5555.JPG","email":"elliott.desai@gmail.com"},{"username":"2shotrob","fullName":"Robert George Sada","email":"robertsada@gmail.com"},{"username":"sforino","fullName":"Sophia Forino","djName":"DJ Baby Blue","picture":"/uploads/be6cdc7b04d3e071920d4db716af41af.jpg","email":"forino.sophia@gmail.com","phone":"(949) 244-6313"},{"username":"gretugh","fullName":"Greta Langenberg","djName":"DJ gretugh","picture":"/uploads/e007b4b945d35400d10bb058cdbaf39d.jpg","email":"glangenberg@ucla.edu"},{"username":"LvrdTrav","fullName":"Traver Hill II","djName":"LvrdTrav","picture":"/uploads/deff70453a558cc90f52f07e6ca8e725.PNG","email":"Traver.hill2@yahoo.com","phone":"9032713823"},{"username":"juliamaltz","fullName":"Julia Maltz","djName":"Amerikanski Spy","picture":"/uploads/77e5f248755f5324ece6980890412454.jpg","email":"juliamaltz@yahoo.com","phone":"7322215420"},{"username":"agershman","fullName":"Anastasia Gershman","email":"anniegershman@gmail.com"},{"username":"rytowne","fullName":"Ryland Towne","djName":"DJ RyRy","email":"rytowne@yahoo.com"},{"username":"Scott_Geesus","fullName":"Scott Gee","djName":"Big Gee-M","picture":"/uploads/b8428fa41d23500ef2034c6504c64509.jpg","email":"sgee107@gmail.com","phone":"6095712322"},{"username":"ramtinvafa","fullName":"Ramtin Vafa","djName":"DJ Ramtin","email":"ramtinvm@gmail.com"},{"username":"uberhummus","fullName":"Hector Tovar","djName":"Hash Ketchum","picture":"/uploads/89c5b0f24b66e8a22a122e20da19cb4c.png","email":"uberhummus@g.ucla.edu","phone":"5622014737"},{"username":"amycummings","fullName":"Amy Cummings","djName":"DJ Ghost","picture":"/uploads/fcec197835338c8ff26bea3961dcd01c.jpeg","email":"amycummings@ucla.edu"},{"username":"suruki93","fullName":"Brian Suruki","djName":"Medafiziks","picture":"/uploads/f928c1e70b3415581710fdcbf0cbfc78.jpg","email":"suruki93@gmail.com"},{"username":"Million","fullName":"Maxamillion Polo","djName":"Maxatrillion","picture":"/uploads/199fffe3e0a00f2888ec57117d77f6af.jpg","email":"mkpolo@ucla.edu"},{"username":"funkmasterfatnut","fullName":"John Chou","djName":"Funkmaster FatNut & DJ 2ShotRob","email":"johntchou@gmail.com"}];

var FrontPage = React.createClass({
  getInitialState: function() {
    return {
      show: null
    };
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  componentDidMount: function() {
    this.updateNowPlaying();
    // refresh tracks every 30 seconds
    this.interval = setInterval(this.updateNowPlaying, 30*1000);
  },
  updateNowPlaying: function() {
    $.ajax({
      url: nowPlayingURL,
      dataType: 'json',
      cache: false,
      success: function(nowPlaying) {
        this.setState({show: nowPlaying});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({show: null});
        console.error(nowPlayingURL, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var showShow = this.state.show && this.state.show.title != null;
    return (
      <div className="frontPage">
        <TriangleCanvas xColors={theme.timezoneColorScheme()}>
          <div class="container" id="main">
            <Grid>

              <Col xs={12} md={3} style={{paddingLeft: "7.5px", paddingRight: "7.5px"}}>
                <div className="radioInfo frontWell">
                  <a href="/beta">
                    <RectImage maxWidth="250px"
                      src="/img/uclaradio-black.png" />
                  </a>
                  <p>UCLA Radio is an entirely student-run radio station. We broadcast all day, every day from a secret cave in Ackerman Student Union.</p>
                </div>
                <LiveShowInfo show={showShow ? this.state.show : null} title="Now Playing" />
              </Col>

              <Col xs={12} md={9} style={{paddingLeft: "7.5px", paddingRight: "7.5px"}}>
                <FrontPageNavbar />
                <DJList />
              </Col>

            </Grid>
          </div>
        <StreamBar currentShowTitle={showShow ? this.state.show.title : null} />
        </TriangleCanvas>
      </div>
    )
  }
});

ReactDOM.render(
  <FrontPage />,
  document.getElementById('content')
);
