import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { activities, ActivityEvent } from "./ActivitiesEvents";
import { localizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

interface EventDetailProps {
  onBack?: () => void;
  activity?: ActivityEvent;
}

function EventDetail({ onBack, activity = activities[0] }: EventDetailProps) {
  const { language } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const galleryImages = activity.galleryImages;
  const selectedImage =
    selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  const showPreviousImage = () => {
    setSelectedImageIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? galleryImages.length - 1 : current - 1;
    });
  };

  const showNextImage = () => {
    setSelectedImageIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === galleryImages.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <section>
      <div className="mb-3 flex items-center gap-3 text-[14px]">
        <button
          type="button"
          onClick={onBack}
          className="bg-transparent px-0 font-normal text-[#737373] hover:text-[#D30000]"
        >
          Activities and Events
        </button>
        <span className="font-medium text-[#404040]">{">"}</span>
        <span className="font-medium text-[#404040]">
          {localizedText(activity.title, language)}
        </span>
      </div>

      <article>
        <h1 className="text-[18px] font-bold leading-8 text-[#262626] 
          md:text-[20px] md:leading-8">
          {localizedText(activity.title, language)}
        </h1>

        <p className="mt-4 text-[14px] font-medium text-[#404040]">
          {activity.date}
        </p>

        <img
          src={activity.bannerImage}
          alt={localizedText(activity.title, language)}
          className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
        />

        <div className="mt-8 text-sm leading-8 text-[#262626]">
          {activity.description.map((paragraph) => (
            <p key={localizedText(paragraph, language)}>
              {localizedText(paragraph, language)}
            </p>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImageIndex(index)}
              className="overflow-hidden rounded-none border-0 bg-transparent p-0"
            >
              <img
                src={image}
                alt={`Event gallery ${index + 1}`}
                className="w-full"
              />
            </button>
          ))}
        </div>
      </article>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black-100/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setSelectedImageIndex(null)}
            aria-label="Close image preview"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white-100/40 bg-white-100 p-0 text-[#262626]"
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            onClick={showPreviousImage}
            aria-label="Previous image"
            className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white-100/40 bg-white-100 p-0 text-[#262626]"
          >
            <KeyboardArrowLeftIcon />
          </button>

          <img
            src={selectedImage}
            alt="Selected event gallery"
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          />

          <button
            type="button"
            onClick={showNextImage}
            aria-label="Next image"
            className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white-100/40 bg-white-100 p-0 text-[#262626]"
          >
            <KeyboardArrowRightIcon />
          </button>
        </div>
      )}
    </section>
  );
}

export default EventDetail;
