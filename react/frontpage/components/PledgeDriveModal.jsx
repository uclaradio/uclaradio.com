const React = require('react');
import { Modal, Button } from 'react-bootstrap';
import  { Link } from 'react-router';
import RectImage from '../../common/RectImage.jsx';

const photoPopUp = {img: "/img/pledgeDrive17PopUp.jpg", "link": "http://spark.ucla.edu/uclaradio"}

const PledgeDriveModal = React.createClass({
  getInitialState() {
    return { showModal: true };
  },

  close() {
    this.setState({ showModal: false });
  },

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Body>
          <Link to={photoPopUp.link}>
            <img style={{ width: "100%"}} src={photoPopUp.img}> </img>
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Donate Later</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default PledgeDriveModal;
