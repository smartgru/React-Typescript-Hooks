import React from 'react';

import { default as BootstrapModal, ModalProps as BootstrapModalProps } from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';

import styles from './Modal.module.scss';

import closeIconSvg from '../../common/images/close-icon.svg';

export interface ModalProps extends BootstrapModalProps {
  title: [string, string];
  onClose?: () => void;
  show?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ title, show = true, onClose, children, ...otherProps }) => {
  const history = useHistory();

  let onCloseFn = onClose;
  if (!onClose) {
    onCloseFn = () => {
      history.goBack();
    };
  }
  return (
    <BootstrapModal {...otherProps} show={show} onHide={onCloseFn} dialogClassName={styles.modalContent} centered>
      <div className={styles.modalHeader}>
        <div className={styles.modalHeaderTitleLeft}>{title[0]}</div>
        <div className={styles.modalHeaderTitleDelimiter} />
        <div className={styles.modalHeaderTitleRight}>{title[1]}</div>
        <div className={styles.modalHeaderTitleCloseIcon} onClick={onCloseFn}>
          <img src={closeIconSvg} width={33} height={34} alt="Close" />
        </div>
      </div>
      <div className={styles.modalHeaderGradient} />
      <div className={styles.modalBody}>{children}</div>
    </BootstrapModal>
  );
};
