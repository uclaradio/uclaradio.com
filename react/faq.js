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
var Input = require('react-bootstrap').Input;

var FAQPage = React.createClass({
  getInitialState: function() {
    return {faqs: [], tempFAQs: [], editable: false, editing: false};
  },
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urls.url,
      dataType: 'json',
      cache: false,
      success: function(o) {
        this.setState({faqs: o.faqs});
        if (o.editable) {
          this.setState({editable: o.editable})
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this)
    });
  },
  updateFAQ: function(faqs) {
    this.setState({tempFAQs: faqs});
  },
  addQuestion: function() {
    var faqs = this.state.tempFAQs;
    var lastID = (faqs.length > 0) ? faqs[faqs.length-1].id + 1 : 1;
    faqs.push({"id": lastID, "question": "", "answer": ""});
    this.setState({tempFAQs: faqs});
  },
  submitData: function() {
    console.log("updating data");
    var oldFAQs = this.state.faqs;
    // optimistically update local info
    this.setState({faqs: this.state.tempFAQs});
    $.ajax({
      url: this.props.urls.url,
      dataType: 'json',
      type: 'POST',
      data: {faqs: JSON.stringify(this.state.tempFAQs)},
      success: function(faqs) {
        this.setState({editing: false, faqs: faqs, tempFAQs: []});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({faqs: oldFAQs});
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this)
    });
  },
  toggleEditing: function() {
    var faqsCopy = $.extend(true, {}, {faqs: this.state.faqs});
    this.setState({tempFAQs: faqsCopy.faqs, editing: !this.state.editing});
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    var questions = this.state.faqs.map(function(faq, i) {
      return (<Panel header={faq.question} eventKey={i} key={i}>
                {faq.answer}
              </Panel>
            );
    });
    return (
      <div className="faqPage">
          <PanelLinksNavbar />
          {this.state.editing
          ?
          <div className="editQuestions">
          <FAQEdit faqs={this.state.tempFAQs} updateFAQ={this.updateFAQ} addQuestion={this.addQuestion} />
          <FloatingSelect submit="Submit" handleSubmit={this.submitData}
            cancel="Cancel" handleCancel={this.toggleEditing} />
          </div>
          :
          <div className="questions">
            <Accordion>
              {questions}
            </Accordion>
            {this.state.editable
            ?
              <FloatingSelect submit="Edit" handleSubmit={this.toggleEditing} />
            :
              ''
            }
          </div>
          }
      </div>
    );
  }
});

var FloatingSelect = React.createClass({
  render: function() {
    return (
      <div className="floatingSelect">
        <p className="centered">
        <a onClick={this.props.handleSubmit}>{this.props.submit}</a>
        {this.props.cancel
          ?
            <span className="leftMargin"><a className="cancelLink" onClick={this.props.handleCancel}>{this.props.cancel}</a></span>
          :
          ''
        }
        </p>
      </div>
    );
  }
});

var FAQEdit = React.createClass({
  getInitialState: function() {
    return {faqs: this.props.faqs};
  },
  updateQuestion: function(qid, value) {
    var faqs = this.props.faqs;
    var faq = faqs[qid];
    faq.question = value;
    faqs[qid] = faq;
    this.props.updateFAQ(faqs);
  },
  updateAnswer: function(qid, value) {
    var faqs = this.props.faqs;
    var faq = faqs[qid];
    faq.answer = value;
    faqs[qid] = faq;
    this.props.updateFAQ(faqs);
  },
  render: function() {
    var updateQuestion = this.updateQuestion;
    var updateAnswer = this.updateAnswer;
    var faqs = this.props.faqs.map(function(question, i) {
      return (<QuestionEdit key={i} qid={i} question={question.question} answer={question.answer}
                handleUpdateQuestion={updateQuestion} handleUpdateAnswer={updateAnswer} />
            );
    });
    return (
      <div className="faqEdit">
        {faqs}
        <FloatingSelect submit="+ Add New Question" handleSubmit={this.props.addQuestion} />
      </div>
    );
  }
});

var QuestionEdit = React.createClass({
  updateQuestion: function(e) {
    this.props.handleUpdateQuestion(this.props.qid, e.target.value);
  },
  updateAnswer: function(e) {
    this.props.handleUpdateAnswer(this.props.qid, e.target.value);
  },
  render: function() {
    return (
      <div className="questionEdit">
        <p>Question {this.props.qid}</p>
        <Input
          type="text"
          value={this.props.question}
          placeholder="Question"
          ref="input"
          groupClassName="input"
          wrapperClassName="col-xs-12"
          onChange={this.updateQuestion} />
        <Input
          type="textarea"
          value={this.props.answer}
          placeholder="Answer"
          ref="input"
          groupClassName="input"
          wrapperClassName="col-xs-12"
          onChange={this.updateAnswer} />
      </div>
    );
  }
});

ReactDOM.render(
  <FAQPage urls={urls} />,
  document.getElementById('content')
);
