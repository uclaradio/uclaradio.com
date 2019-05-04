import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const PledgeDriveModal = React.createClass({
  getInitialState() {
    return { showModal: true };
  },

  close() {
    this.setState({ showModal: false });
  },

  render() {
    console.log('in here');
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Body>
          <a href="http://spark.ucla.edu/uclaradio">
            <img src="/img/pledge-drive-popup.gif" style={{ width: '100%' }}>
              {' '}
            </img>
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Donate Later</Button>
        </Modal.Footer>
      </Modal>
    );
  },
});

export default PledgeDriveModal;
