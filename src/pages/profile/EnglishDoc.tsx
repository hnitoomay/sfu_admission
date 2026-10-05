import { useState } from "react";
import DocCard from "../../components/DocCard";
import LoadingSpinner from "../../components/Loading";
import {
  deleteEngDoc,
  downloadEngDoc,
} from "../../services/user/fileAction";
import { useGetAuthUser } from "../../services/user/getAuthUser";
import { downloadBlob } from "../../lib/helper";
import { CardContext } from "../../hooks/context/CardContext";
import { useTranslation } from "../../i18n/useTranslation";

function EnglishDoc() {
  const { user, isErrorUser, userLoading, mutate } = useGetAuthUser();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const onDeleteEngDoc = async (id: number) => {
    setLoading(true);
    const response = await deleteEngDoc(id);
    if (response.message === "Successfully") {
      mutate();
      setLoading(false);
    }
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await downloadEngDoc(url);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      downloadBlob(blob, "englsish");
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <>
      {(userLoading || isErrorUser || loading) && <LoadingSpinner />}
      <CardContext.Provider value={{ type: "english" }}>
        <DocCard
          title={t("profile.englishProficiencyDocument")}
          data={user?.english_result}
          fileName={t("profile.englishDocumentShort")}
          mutate={mutate}
          onDelete={onDeleteEngDoc}
          onDownload={handleDownload}
        />
      </CardContext.Provider>
    </>
  );
}

export default EnglishDoc;
