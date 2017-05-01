const React = require('react');
import { Modal, Button } from 'react-bootstrap';

import  { Link } from 'react-router';

const PledgeDrivePhoto = {
  img: "/img/p-drive-modal.jpg",
  link: "http://spark.ucla.edu/uclaradio"
};

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
          <a href={PledgeDrivePhoto.link}>
            <img src={PledgeDrivePhoto.img} style={{width: '100%'}}> </img>
          </a>  
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Donate Later</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default PledgeDriveModal;
