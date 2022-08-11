import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/action';
import styles from './styles.module.css';

/* Полупрозрачная подложка под модальное окно */
function ModalOverlay() {

  const statusModal = useSelector((state) => state.modalStatus);

  const dispatch = useDispatch();

  const close = () => {
    if (statusModal === true) {
      dispatch(closeModal(null))
    }
  }

  return <div className={styles.overlay} onClick={close} />;
}

export default ModalOverlay;
