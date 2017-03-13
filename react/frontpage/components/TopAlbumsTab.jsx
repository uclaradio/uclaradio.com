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
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg',  albumreview:'https://tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumreview:'https://tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumreview:'https://tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumreview:'https://tumblr.com'},
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumreview:'https://tumblr.com'},
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg', albumreview:'https://tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumreview:'https://tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumreview:'https://tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumreview:'https://tumblr.com'},
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumreview:'https://tumblr.com'}
];

var albumsMonth = [
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumreview:'https://tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumreview:'https://tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumreview:'https://tumblr.com'},
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumreview:'https://tumblr.com'},
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg', albumreview:'https://tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumreview:'https://tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumreview:'https://tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumreview:'https://tumblr.com'},
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumreview:'https://tumblr.com'},
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg', albumreview:'https://tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumreview:'https://tumblr.com'}
];

var albumsYear = [
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumreview:'https://tumblr.com'},
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg', albumreview:'https://tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Good Intent', artist: 'Kimbra', imgUrl: 'https://i.ytimg.com/vi/LdRx3TRLqWc/hqdefault.jpg', albumreview:'https://tumblr.com'},
{ album: 'Malibu', artist: 'Hello', imgUrl: 'http://static.vibe.com/files/2016/01/anderson-paak1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumreview:'https://tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumreview:'https://tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumreview:'https://tumblr.com'},
{ album: 'Enchant', artist: 'Emilie Autumn', imgUrl: 'https://tytmb.files.wordpress.com/2011/10/enchant1.jpg', albumreview:'https://tumblr.com'},
{ album: 'Dark Passion Play', artist: 'Nightwish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Dark_Passion_Play.jpg', albumreview:'https://tumblr.com'},
{ album: 'Black Devotion', artist: 'Drift', imgUrl: 'https://f4.bcbits.com/img/a1787666795_10.jpg', albumreview:'https://tumblr.com'},
{ album: 'Shepard Moons', artist: 'Enya', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/715Xj-ddozL._SL1069_.jpg', albumreview:'https://tumblr.com'},
{ album: 'Almost Human', artist: 'Voltaire', imgUrl: 'http://www.aq.com/events/voltaire/images/voltaire-album-280.jpg', albumreview:'https://tumblr.com'}
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
                            <a className="albumReview" href={this.props.albumreview}>Click for review</a>
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
							<Tabs.Panel title='Week'>
								{albumsWeek.map(function(albumItem, index){
									console.log(albumItem);
									return <Album key={index} album={albumItem.album} artist={albumItem.artist} imgUrl={albumItem.imgUrl}/>;
								})}
				        	</Tabs.Panel>
				        	<Tabs.Panel title='Month'>
								{albumsMonth.map(function(albumItem, index){
									console.log(albumItem);
									return <Album key={index} album={albumItem.album} artist={albumItem.artist} imgUrl={albumItem.imgUrl}/>;
								})}
				        	</Tabs.Panel>
				        	<Tabs.Panel title='Year'>
								{albumsYear.map(function(albumItem, index){
									console.log(albumItem);
									return <Album key={index} album={albumItem.album} artist={albumItem.artist} imgUrl={albumItem.imgUrl}/>;
								})}
				        	</Tabs.Panel>
						</Tabs>

					</div>


						{/*albumsMonth.map(function(albumItem, index){
							console.log(albumItem);
							return <Album key={index} album={albumItem.album} artist={albumItem.artist} imgUrl={albumItem.imgUrl}/>;
						})*/}

                </div>
			);
    }
});


module.exports = AlbumsList;
