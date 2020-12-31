import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { Modal } from 'react-responsive-modal';

import 'react-responsive-modal/styles.css';
import styles from '../styles/Home.module.css'

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
      <img className={styles.modalImage} src={props.src}></img>
    </Modal>
  )
}
