// WaterFallContent.jsx
var React = require('react');
var Dates = require('../misc/Dates.js');
var Waterfall = require('./responsive_waterfall.js');
var SocialMedia = "/getSocialMedia";
var getMoreFBPosts = "/getMoreFBPosts";
var waterfall;
var boxHandle = newNode();

var WaterFallContent = React.createClass({
	getInitialState: function() {
		return {
			newData: false,
			socialMediaPosts: []
		};
	},
	componentWillMount: function() {
		this.serverRequest = $.get(SocialMedia, function (result) {
			this.setState({
				initialData: true,
				paginatedDataInProgress: false,
				socialMediaPosts:result['social_media'],
				fb_pagination_until:result['fb_pagination_until'],
				fb_pagination_token:result['fb_pagination_token']
			});
		}.bind(this));
	},
	componentDidMount: function() {
		window.addEventListener('scroll', this.handleScroll);
	},
	componentWillUnmount: function() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	componentDidUpdate: function() {
		//once data has been recieved from the GET requests and formatted on the page
		//this will cause cards on radio to reorganize to row-wise chronology
		if(this.state.initialData == true) {
			waterfall = new Waterfall({ minBoxWidth: 250 });
			this.setState({
				initialData: false
			});
		}
	},
	handleScroll: function(event) {
        var i = waterfall.getHighestIndex();
        if(i > -1) {
            // get last box of the column
            var lastBox = Array.prototype.slice.call(waterfall.columns[i].children, -1)[0];
            if(checkSlide(lastBox)) {
            	if(this.state.paginatedDataInProgress == false) {
            		//Locking mechanism so scrolling won't cause an infinite amt of requests
            		this.setState({
            			paginatedDataInProgress: true
            		});

					this.serverRequest = $.post(getMoreFBPosts, {
							until: this.state.fb_pagination_until
						},function (result) {
    					result['social_media'].map(function(el) {
    						var dateString = formatDate(el['created_time']);
    						var boxHandle = newNode(el['full_picture'], el['message'], dateString);
    						waterfall.addBox(boxHandle);
    					});
						this.setState({
							fb_pagination_until: result['fb_pagination_until'],
							paginatedDataInProgress: false
						});
					}.bind(this));            		
            	}

            }
        }
	},
	render: function() {
		return(
			 <div className='wf-container'>
			{ this.state.socialMediaPosts.map (function(el) {
					return (
							<div className='wf-box'>
								<a href={ (el['link'] || el['post_url'])} target="_blank" key={el['link']}>
									<div className='wf-box-content'>
									{ (el['platform'] == 'TUMBLR') && 
										<div className='wf-box-content-blog'>{el['summary']}</div>}
									{ (el['platform'] == 'FB') && el['full_picture'] && 
										<img src={el['full_picture']} /> }
									{ (el['platform'] == 'FB') && el['message'] && 
										!el['message'].includes("http") && 
										<div className='wf-box-content-text'>
											{
												<div className='wf-box-content-text-date'>{formatDate(el['created_time'])}</div> 
											}
											{
												el['message']
											}
										</div>
									}
									</div>
								</a>
							</div>
					);
				})
			}
			</div>
		);
	}
});


function checkSlide(elem) {
        if(elem) {
            var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +
                               (document.documentElement.clientHeight || document.body.clientHeight);
            var elemHeight = elem.offsetTop + elem.offsetHeight / 2;
            return elemHeight < screenHeight;
        }
}

function newNode(full_picture, summary, created_time) {        
    var box = document.createElement('div');
    box.className = 'wf-box';
    var box_content = document.createElement('div');
    box_content.className = 'wf-box-content';
    var image = document.createElement('img');
    image.src = full_picture;
    box_content.appendChild(image);
    var box_content_text = document.createElement('div');
        box_content_text.className = 'wf-box-content-text';
    var box_content_date = document.createElement('div');
     	box_content_date.className = 'wf-box-content-text-date';
     	box_content_date.appendChild(document.createTextNode(created_time));
    box_content_text.appendChild(box_content_date);
    box_content_text.appendChild(document.createTextNode(summary));
    summary = String(summary);
    box_content.appendChild(box_content_text);
    if(!summary.includes("http")) {
    	box.appendChild(box_content);    
    }
    return box;
}

var containsHttp = function(myString) {
	return myString.split(" ").map(function(el) { return el.includes("http") ? "click" : el }).join(' ');
}

var formatDate = function(dateString) {
    var date = new Date(dateString);
	return Dates.availableDays[date.getDay()] + ", " + date.getMonth() + "/" + date.getDate();
}
module.exports = WaterFallContent;