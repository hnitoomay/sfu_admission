import { useState } from "react";
import DownloadBrochureForm from "./DownloadBrochureForm";
import ModalComp from "./Modal";

function DownloadBroForMobile() {

  const [openModal, setOpenModal] = useState(true);

  const closeHandler = () => {
    setOpenModal(!openModal);
  }

  return (
    <ModalComp
      className="border rounded-lg"
      openModal={openModal}
      closeModal={() => setOpenModal(!openModal)}
    >
      <DownloadBrochureForm closeModal={() => closeHandler()}
      />
    </ModalComp>
  );
}

export default DownloadBroForMobile;
