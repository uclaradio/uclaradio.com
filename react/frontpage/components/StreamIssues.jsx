// StreamIssuesPage.jsx

import React from 'react';

require('./StreamIssuesPage.scss');

const StreamIssuesPage = () => (
	<div className="streamIssues">
		<h3>Stream Issues</h3>
		<p>Is something not working for you? Some common ways to fix stream issues:</p>
		<ul>
			<li>Refresh the page! Sometimes broken javascript causes problems, if so you can to refresh the page to fix it.</li>
			<li>Streaming on campus? Unfortunately our stream is blocked on the "UCLA_Web" wifi network because we stream on port 8000. Make sure to use "eduroam" when on campus at UCLA. It's more secure anyway!</li>
			<li>Website too slow? Try our iOS app <a href="https://itunes.apple.com/us/app/ucla-radio/id420784130?mt=8">on the App Store</a></li>
			<li>Email <a href="mailto:radio.web@media.ucla.edu">radio.web@media.ucla.edu</a>. We're always trying to improve.</li>
		</ul>
	</div>
);

module.exports = StreamIssuesPage;
