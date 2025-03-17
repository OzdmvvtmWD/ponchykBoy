import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import "./ModalDetailInfo.css"

function ModalDetailInfo(props) {
  return (
    <Modal
      {...props}
      size="lg"

      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {props.iteminfo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Image src={props.iteminfo.image} alt='image_of_item' fluid width="200" height="200" /> */}
        <p>
            {props.iteminfo.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {props.iteminfo.cost}$ 
        <Button >add in cart</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default ModalDetailInfo;