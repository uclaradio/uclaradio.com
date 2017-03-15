// EventTab.jsx
// list of events in events tab of frontpage

import React from 'react';

import { Link } from 'react-router';

// Common Elements
import RectImage from '../../common/RectImage.jsx';
import Loader from './Loader.jsx';



import { Bootstrap, Grid, Col } from 'react-bootstrap'


// var Album = require('./TopAlbumsList.jsx');

//need to import data for albums

require('./TopAlbumsTab.scss');
var Tabs = require('react-simpletabs');

var albumsWeek = [
{ album: 'I See You', artist: 'The xx', imgUrl: 'http://cdn4.pitchfork.com/albums/24233/homepage_large.55fa992b.jpg',  albumReview:'https://www.tumblr.com'},
{ album: 'We got it from here...Thank you 4 your service!', artist: 'A Tribe Called Quest', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e6/We_Got_It_From_Here,_Thank_You_For_Your_Service.png', albumReview:'https://www.tumblr.com'},
{ album: 'Ballad of the Dying Man', artist: 'Father John Misty', imgUrl: 'https://cdn.pastemagazine.com/www/articles/father%20john%20misty%20ballad%20main.png', albumReview:'https://www.tumblr.com'},
{ album: 'This Old Dog', artist: 'Mac DeMarco', imgUrl: 'http://thefader-res.cloudinary.com/images/w_760,c_limit,f_auto,q_auto:best/unnamed_1_jw9uhi/mac-demarco-this-old-dog.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'A Seat at the Table', artist: 'Solange', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Solange_-_A_Seat_at_the_Table.png', albumReview:'https://www.tumblr.com'},
{ album: 'Yours Conditionally', artist: 'Tennis', imgUrl: 'http://dis.resized.images.s3.amazonaws.com/540x540/104526.jpeg', albumReview:'https://www.tumblr.com'},
{ album: 'Drunk', artist: 'Thundercat', imgUrl: 'https://consequenceofsound.files.wordpress.com/2017/01/bfdnl064_thundercat_drunk_packshot.jpg?quality=80&w=380&h=380&crop=1', albumReview:'https://www.tumblr.com'},
{ album: 'Everybody Works', artist: 'Jay Som', imgUrl: 'http://images.junostatic.com/full/CS639894-01B-BIG.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Either/Or (Deluxe)', artist: 'Elliott Smith', imgUrl: 'http://www.brooklynvegan.com/files/2017/01/elliot-smith.jpg?w=630&h=630&zc=1&s=0&a=t&q=89', albumReview:'https://www.tumblr.com'},
{ album: 'Fresh Air', artist: 'HOMESHAKE', imgUrl: 'https://i.ytimg.com/vi/56eFcflawBc/hqdefault.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Process', artist: 'Sampha', imgUrl: 'https://consequenceofsound.files.wordpress.com/2017/02/sampha-process-album-stream-download-listen.jpg?quality=80&w=380&h=380&crop=1', albumReview:'https://www.tumblr.com'},
{ album: 'Pageant', artist: 'PWR BTTM', imgUrl: 'http://static.spin.com/files/2017/02/pwr-bttm-pageant-1487083066-compressed.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Hang', artist: 'Foxygen', imgUrl: 'https://consequenceofsound.files.wordpress.com/2017/01/foxygen.jpg?quality=80&w=380&h=380&crop=1', albumReview:'https://www.tumblr.com'},
{ album: 'Flipside [single]', artist: 'Bleached', imgUrl: 'http://www.stereoboard.com/images/stories/2013/images/A-Z%20Main%20Artist%20Images/B/bleached_hb_0101217.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Loose Ends', artist: 'Clap Your Hands Say Yeah', imgUrl: 'http://netstorage.metrolyrics.com/albums/2017/02/7743739jpg.jpg', albumReview:'https://www.tumblr.com'},


{album:"Little Fictions",artist:"Elbow",imgUrl:"https://rollingstoneaus.com/assets/Uploads/Elbow-Little-Fictions.jpg"},
{album:"Sick Scenes",artist:"Los Campesions!",imgUrl:"http://pitchfork-cdn.s3.amazonaws.com/content/Sick%20Scenes%20digital%20art%20hi-res.jpg"},
{album:"Impermanence",artist:"Peter Silberman",imgUrl:"https://kingsroadmerch.s3.amazonaws.com/images/us/3/2/9/32923_400x400.jpg"},
{album:"Themes for Dying Earth",artist:"Teen Daze",imgUrl:"http://exclaim.ca/images/TeenDazeDyingEarth.jpg"},
{album:"French Kiwi Juice",artist:"FKJ",imgUrl:"http://s3-ap-southeast-1.amazonaws.com/juiceonline-production/wp-content/uploads/2017/03/08122623/FKJ-Waiting1.jpg"},
{album:"An Odd Entrances",artist:"Thee Oh Sees",imgUrl:"http://pitchfork-cdn.s3.amazonaws.com/content/CF-085cover.jpg"},
{album:"Offers",artist:"NE-HI",imgUrl:"https://consequenceofsound.files.wordpress.com/2016/11/unnamed-22.jpg?quality=80&w=800&h=800"},
{album:"Luck Man",artist:"Tim Cohen",imgUrl:"http://static.stereogum.com/uploads/2016/12/Tim-Cohen-Luck-Man-1481580903-640x640.jpg"},
{album:"Abendrot",artist:"You Blew It!",imgUrl:"http://s0.merchdirect.com/images/19142/v600_YouBlewIt_Abendrot_4200__1_.jpghttp://s0.merchdirect.com/images/19142/v600_YouBlewIt_Abendrot_4200__1_.jpg"},
{album:"EP II",artist:"Buscabulla",imgUrl:"http://cdn2.pitchfork.com/albums/24350/ff115c0d.jpg"},
{album:"Break Apart",artist:"Bonobo",imgUrl:"http://exclaim.ca/images/BonoboMigration.jpg"},
{album:"Sensorimotor",artist:"Lusine",imgUrl:"http://cdn.ghostly.com/images/artists/17/albums/550/GI-287_3000x300_540_540.jpg"},
{album:"RTJ3",artist:"Run the Jewels",imgUrl:"http://media.araca.com/media/catalog/product/cache/97/image/9df78eab33525d08d6e5fb8d27136e95/r/t/rtj_3_album_cover.png"},
{album:"5 Selections from 50 Song Memoir",artist:"The Magnetic Fields",imgUrl:"http://static.stereogum.com/uploads/2016/11/The-Magnetic-Fields-50-Song-Memoir-1479398892-640x640.jpg"},
{album:"Landmark",artist:"Hippo Campus",imgUrl:"http://www.gomn.com/wp-content/uploads/2016/10/hippo-campus-landmark-album-art.jpg"}


];

var albumsMonth = [
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumReview:'https://www.tumblr.com'}
];

var albumsYear = [
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumReview:'https://www.tumblr.com'},
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumReview:'https://www.tumblr.com'}
];


//modular css

var Album = React.createClass({
    render: function() {
        console.log('within album', this.props);
        return (

            <div className="albumItem">
                <img className="albumImage" src={this.props.imgUrl} width="100%" height="250px"></img>
				<span>
						<div className="albumText">
							<p className="albumName">{this.props.album}</p>
		                	<p className="albumArtist">{this.props.artist}</p>
                            <p className="albumSpace"> ... ... ... </p>
                            <a className="albumReview" href={this.props.albumReview}>Click for review</a>
                    </div>
				</span>

            </div>

        );
    }
});



var AlbumsList = React.createClass({
	render: function() {
	return (
				<div>
                    <div className="tracksHeader">

						<Tabs>
							<Tabs.Panel title='WEEK'>
								{albumsWeek.map(function(albumItem, index){
									console.log(albumItem);
									return <Album key={index} album={albumItem.album} artist={albumItem.artist} imgUrl={albumItem.imgUrl}/>;
								})}
				        	</Tabs.Panel>
				        	<Tabs.Panel title='MONTH'>
								{albumsMonth.map(function(albumItem, index){
									console.log(albumItem);
									return <Album key={index} album={albumItem.album} artist={albumItem.artist} imgUrl={albumItem.imgUrl}/>;
								})}
				        	</Tabs.Panel>
				        	<Tabs.Panel title='YEAR'>
								{albumsYear.map(function(albumItem, index){
									console.log(albumItem);
									return <Album key={index} album={albumItem.album} artist={albumItem.artist} imgUrl={albumItem.imgUrl}/>;
								})}
				        	</Tabs.Panel>
						</Tabs>

					</div>

                </div>
			);
    }
});


module.exports = AlbumsList;
