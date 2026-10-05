import { useState } from "react";
import DocCard from "../../components/DocCard";
import LoadingSpinner from "../../components/Loading";
import {
  deleteCertificateDoc,
  downloadCertificateDoc,
} from "../../services/user/fileAction";
import { useGetAuthUser } from "../../services/user/getAuthUser";
import { CardContext } from "../../hooks/context/CardContext";
import { downloadBlob } from "../../lib/helper";
import { useTranslation } from "../../i18n/useTranslation";

function CertificateDoc() {
  const { user, isErrorUser, userLoading, mutate } = useGetAuthUser();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const onDeleteCertiDoc = async (id: number) => {
    setLoading(true);
    const response = await deleteCertificateDoc(id);
    if (response.message === "Successfully") {
      mutate();
      setLoading(false);
    }
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await downloadCertificateDoc(url);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      downloadBlob(blob, "certificate");
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <>
      {(userLoading || isErrorUser || loading) && <LoadingSpinner />}
      <CardContext.Provider value={{ type: "certificate" }}>
        <DocCard
          title={t("profile.certificateDocument")}
          data={user?.certificate_doc}
          fileName={t("profile.certificateDocumentShort")}
          mutate={mutate}
          onDelete={onDeleteCertiDoc}
          onDownload={handleDownload}
        />
      </CardContext.Provider>
    </>
  );
}

export default CertificateDoc;
