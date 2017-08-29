// home.html
// let DJ edit personal info

const React = require('react');
const ReactDOM = require('react-dom');

const urls = {
  url: '/panel/api/faq',
};

// Panel Elements
const PanelLinksNavbar = require('./panel/PanelLinksNavbar.jsx');

// Boostrap Components
const Accordion = require('react-bootstrap').Accordion;
const Panel = require('react-bootstrap').Panel;
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;
const Grid = require('react-bootstrap').Grid;

const FAQPage = React.createClass({
  render() {
    return (
      <div className="panelPage">
        <Grid>
          <PanelLinksNavbar />
          <FAQ urls={this.props.urls} />
        </Grid>
      </div>
    );
  },
});

const FAQ = React.createClass({
  getInitialState() {
    return { faqs: [], tempFAQs: [], editable: false, editing: false };
  },
  loadDataFromServer() {
    $.ajax({
      url: this.props.urls.url,
      dataType: 'json',
      cache: false,
      success: function(o) {
        this.setState({ faqs: o.faqs });
        if (o.editable) {
          this.setState({ editable: o.editable });
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this),
    });
  },
  updateFAQ(faqs) {
    this.setState({ tempFAQs: faqs });
  },
  updateQuestion(qid, value) {
    const faqs = this.state.tempFAQs;
    const faq = faqs[qid];
    faq.question = value;
    faqs[qid] = faq;
    this.setState({ tempFAQs: faqs });
  },
  updateAnswer(qid, value) {
    const faqs = this.state.tempFAQs;
    const faq = faqs[qid];
    faq.answer = value;
    faqs[qid] = faq;
    this.setState({ tempFAQs: faqs });
  },
  addQuestion() {
    const faqs = this.state.tempFAQs;
    const lastID = faqs.length > 0 ? faqs[faqs.length - 1].id + 1 : 1;
    faqs.push({ id: lastID, question: '', answer: '' });
    this.setState({ tempFAQs: faqs });
  },
  deleteQuestion(qid) {
    const faqs = this.state.tempFAQs;
    faqs.splice(qid, 1);
    this.setState({ tempFAQs: faqs });
  },
  submitData() {
    const oldFAQs = this.state.faqs;
    // optimistically update local info
    this.setState({ faqs: this.state.tempFAQs });
    $.ajax({
      url: this.props.urls.url,
      dataType: 'json',
      type: 'POST',
      data: { faqs: JSON.stringify(this.state.tempFAQs) },
      success: function(faqs) {
        this.setState({ editing: false, tempFAQs: [] });
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ faqs: oldFAQs });
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this),
    });
  },
  toggleEditing() {
    this.setState({
      tempFAQs: this.state.faqs.slice(0),
      editing: !this.state.editing,
    });
  },
  componentDidMount() {
    this.loadDataFromServer();
  },
  render() {
    if (this.state.editing) {
      const updateQuestion = this.updateQuestion;
      const updateAnswer = this.updateAnswer;
      const deleteQuestion = this.deleteQuestion;
      var faqs = this.state.tempFAQs.map((question, i) =>
        <QuestionEdit
          key={i}
          qid={i}
          question={question.question}
          answer={question.answer}
          handleUpdateQuestion={updateQuestion}
          handleUpdateAnswer={updateAnswer}
          handleDelete={deleteQuestion}
        />
      );
    } else {
      var questions = this.state.faqs.map((faq, i) =>
        <Panel header={faq.question} eventKey={i} key={i}>
          {faq.answer}
        </Panel>
      );
    }
    return (
      <div className="faq">
        {this.state.editing
          ? <div className="editQuestions">
              {faqs}
              <div className="mainActions">
                <a onClick={this.addQuestion}>+ Add New Question</a>
                <span className="rightFloat">
                  <Button onClick={this.submitData} className="lightPadding">
                    Submit
                  </Button>
                  <Button
                    className="cancelLink lightPadding"
                    onClick={this.toggleEditing}>
                    Cancel
                  </Button>
                </span>
              </div>
            </div>
          : <div className="questions">
              <Accordion>
                {questions}
              </Accordion>
              {this.state.editable
                ? <p className="mainActions">
                    <a className="rightFloat" onClick={this.toggleEditing}>
                      Edit
                    </a>
                  </p>
                : ''}
            </div>}
      </div>
    );
  },
});

const QuestionEdit = React.createClass({
  updateQuestion(e) {
    this.props.handleUpdateQuestion(this.props.qid, e.target.value);
  },
  updateAnswer(e) {
    this.props.handleUpdateAnswer(this.props.qid, e.target.value);
  },
  deleteQuestion() {
    this.props.handleDelete(this.props.qid);
  },
  render() {
    return (
      <div className="questionEdit">
        <p className="actions">
          Question {this.props.qid + 1}{' '}
          <a className="cancelLink rightFloat" onClick={this.deleteQuestion}>
            Delete
          </a>
        </p>
        <form className="form-horizontal">
          <Input
            type="text"
            value={this.props.question}
            placeholder="Question"
            ref="input"
            groupClassName="input"
            wrapperClassName="col-xs-12"
            onChange={this.updateQuestion}
          />
          <Input
            type="textarea"
            value={this.props.answer}
            placeholder="Answer"
            ref="input"
            groupClassName="input"
            wrapperClassName="col-xs-12"
            onChange={this.updateAnswer}
          />
        </form>
      </div>
    );
  },
});

ReactDOM.render(<FAQPage urls={urls} />, document.getElementById('content'));
