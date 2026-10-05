import { useState } from "react";
import DocCard from "../../components/DocCard";
import LoadingSpinner from "../../components/Loading";
import {
  deleteRecDoc,
  downloadRecDoc,
} from "../../services/user/fileAction";
import { useGetAuthUser } from "../../services/user/getAuthUser";
import { downloadBlob } from "../../lib/helper";
import { CardContext } from "../../hooks/context/CardContext";
import { useTranslation } from "../../i18n/useTranslation";

function RecDoc() {
  const { user, isErrorUser, userLoading, mutate } = useGetAuthUser();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const onDeleteRecDoc = async (id: number) => {
    setLoading(true);
    const response = await deleteRecDoc(id);
    if (response.message === "Successfully") {
      mutate();
      setLoading(false);
    }
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await downloadRecDoc(url);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      downloadBlob(blob, "recomendation");
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <>
      {(userLoading || isErrorUser || loading) && <LoadingSpinner />}
      <CardContext.Provider value={{ type: "recommend" }}>
        <DocCard
          title={t("profile.recommendationLetterDocument")}
          data={user?.rec_letters}
          fileName={t("profile.recommendationDocumentShort")}
          mutate={mutate}
          onDelete={onDeleteRecDoc}
          onDownload={handleDownload}
        />
      </CardContext.Provider>
    </>
  );
}

export default RecDoc;
