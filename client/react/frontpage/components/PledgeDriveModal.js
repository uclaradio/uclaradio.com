import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router';

class PledgeDriveModal extends React.Component {
  state = { showModal: true };

  close = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Body>
          <a href="http://spark.ucla.edu/uclaradio">
            <img src="/img/p-drive-modal.png" style={{ width: '100%' }}>
              {' '}
            </img>
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Donate Later</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PledgeDriveModal;
