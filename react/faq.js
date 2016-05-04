// home.html
// let DJ edit personal info

var React = require('react');
var ReactDOM = require('react-dom');

var urls = {url: "/panel/api/faq"};

// Custom elements
var PanelLinksNavbar = require('./components/PanelLinksNavbar.jsx');

// Boostrap Components
var Accordion = require('react-bootstrap').Accordion;
var Panel = require('react-bootstrap').Panel;

var FAQPage = React.createClass({
  getInitialState: function() {
    return {faqs: []};
  },
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urls.url,
      dataType: 'json',
      cache: false,
      success: function(faqs) {
        this.setState({faqs: faqs});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    var questions = this.state.faqs.map(function(faq, i) {
      return (<Panel header={faq.question} eventKey={i} key={i}>
                {faq.answer}
              </Panel>);
    });
    return (
      <div className="faqPage">
          <PanelLinksNavbar />
          <Accordion>
            {questions}
          </Accordion>
      </div>
    );
  }
});

ReactDOM.render(
  <FAQPage urls={urls} />,
  document.getElementById('content')
);
