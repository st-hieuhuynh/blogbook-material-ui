import React from 'react';

interface ModalProps {
  children: JSX.Element;
  setShow: Function;
  className: string;
}
const Modal = (props: ModalProps) => {
  const closeModal = () => {
    props.setShow(false);
  };
  return (
    <>
      <div className="modal-shadow" onClick={closeModal} />
      <div className={`modal ${props.className}`}>
        <button className={`btn btn-danger close-btn`} onClick={closeModal}>
          &#10006;
        </button>
        <div className="modal-content">{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
