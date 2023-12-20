import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";

import "./Modal.css";

const modalsContainer = document.getElementById("modal-root");
const Modal = forwardRef(function Modal({ children }, ref) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },

      close() {
        dialogRef.current.close();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialogRef}
      id="modal"
      className="d-flex flex-column w-50 mx-auto mt-5 border-0 p-3 rounded"
    >
      {children}
      <form method="dialog" className="mt-3 text-end">
        <button className="btn btn-secondary">Close</button>
      </form>
    </dialog>,
    modalsContainer
  );
});

export default Modal;
