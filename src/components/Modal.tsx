import { Modal } from "flowbite-react";
import { ReactNode } from "react";
import "../css/custom.css";
import { classNames } from "../lib/helper";

interface ModalCompProps {
  // showModal?: boolean;
  title?: string;
  children?: ReactNode;
  className?: string;
  openModal: boolean;
  closeModal?: () => void;
}

function ModalComp(props: ModalCompProps) {
  const { title, children, className, openModal, closeModal } = props;

  return (
    <Modal show={openModal} onClose={closeModal} size="7xl">
      <div
        className={classNames(
          className ? className : "",
          "bg-white-100 rounded-lg shadow-lg shadow-gray-850/20 overflow-auto"
        )}
      >
        <Modal.Header className="flex items-center justify-center border-b-2 border-white-100 shadow-lg shadow-gray-850/20 text-gray-800 font-bold sm:py-3 md:py-4">
          {title}
        </Modal.Header>
        <Modal.Body className="">{children}</Modal.Body>
      </div>
    </Modal>
  );
}

export default ModalComp;
