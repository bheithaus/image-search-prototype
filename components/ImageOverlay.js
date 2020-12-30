import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function ImageGrid(props) {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false)
    props.onClose()
  };

  useEffect(() => {
    setOpen(props.open)
  }, [props])

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <img src={props.src}></img>
    </Modal>
  )
}
