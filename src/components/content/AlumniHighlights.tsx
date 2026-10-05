import { useSlugStore } from "../../store/useSlugStore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useRef } from "react";
import mbaAlumniStoriesData from "../../data/mba/testimonial.json";
import mscAlumniStoriesData from "../../data/msc/testimonial.json";
import useCarousel from "../../hooks/customHook/useCarousel";
import { localizedText, LocalizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

export type AlumniStory = {
  name: LocalizedText;
  batch: LocalizedText;
  location: "yangon" | "mandalay";
  designation: LocalizedText;
  company: LocalizedText;
  image: string;
  story: LocalizedText;
};

type AlumniFeature = {
  src: string;
  title: string;
};

export const mbaAlumniStories = mbaAlumniStoriesData as AlumniStory[];
export const mscAlumniStories = mscAlumniStoriesData as AlumniStory[];
export const alumniStories = mbaAlumniStories;

export const getAlumniStories = (isMSC: boolean) =>
  isMSC ? mscAlumniStories : mbaAlumniStories;

const mbaAlumniFeatures: AlumniFeature[] = [
  {
    src: "https://www.youtube.com/embed/u98HdxO5-SY",
    title: "I Value My Learning - From Learning to Leadership ✨",
  },
  {
    src: "https://www.youtube.com/embed/dk4Yd1XX-Ng",
    title: "The Academic Journey Bachelor's to Master's",
  },
  {
    src: "https://www.youtube.com/embed/ovQNbt9ZW3k",
    title: "MBA Student Testimonial_Ma Aye Chan Moe",
  },
  {
    src: "https://www.youtube.com/embed/UcflY1k10R0",
    title: "I Value My Learning",
  },
  {
    src: "https://www.youtube.com/embed/JZHblutHQfQ",
    title: "I Value My Learning",
  },
  {
    src: "https://www.youtube.com/embed/1W4XOzdo_SA",
    title: "Guiding Students, Growing Myself - My MBA Moves Me Forward",
  },
];

const mscAlumniFeatures: AlumniFeature[] = [
  {
    src: "https://www.youtube.com/embed/YvVgtOFukjs",
    title: "I Value My Learning - Beyond Tech, Into Leadership 💻",
  },
  {
    src: "https://www.youtube.com/embed/DldCzQvd8-U",
    title: "𝗠𝗦𝗰 (𝗖𝗼𝗺𝗽𝘂𝘁𝗲𝗿 𝗦𝗰𝗶𝗲𝗻𝗰𝗲) - 𝗦𝘁𝘂𝗱𝗲𝗻𝘁 𝗧𝗲𝘀𝘁𝗶𝗺𝗼𝗻𝗶𝗮𝗹",
  },
];

interface AlumniHighlightsProps {
  onViewAllStories?: () => void;
}

function AlumniHighlights({ onViewAllStories }: AlumniHighlightsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const featuresCarouselRef = useRef<HTMLDivElement>(null);

  const { isMSC } = useSlugStore();
  const { language, t } = useTranslation();
  const alumniStories = getAlumniStories(isMSC);
  const alumniFeatures = isMSC ? mscAlumniFeatures : mbaAlumniFeatures;
  const carouselStories = alumniStories.slice(0, 6);

  const {
    canScrollPrevious,
    canScrollNext,
    scroll: scrollStories,
    updateButtons: updateCarouselButtons,
  } = useCarousel(carouselRef);

  const {
    canScrollPrevious: canScrollPreviousFeatures,
    canScrollNext: canScrollNextFeatures,
    scroll: scrollFeatures,
    updateButtons: updateFeaturesButtons,
  } = useCarousel(featuresCarouselRef);

  useEffect(() => {
    const autoSlideInterval = window.setInterval(() => {
      scrollStories("right", true);
    }, 5000);

    return () => {
      window.clearInterval(autoSlideInterval);
    };
  }, [scrollStories]);

  useEffect(() => {
    if (alumniFeatures.length <= 1) {
      return;
    }

    const autoSlideInterval = window.setInterval(() => {
      scrollFeatures("right", true);
    }, 6000);

    return () => {
      window.clearInterval(autoSlideInterval);
    };
  }, [scrollFeatures, alumniFeatures.length]);

  return (
    <section>
      <div className="mb-12">
        <span className="inline-flex rounded-md bg-[#D30000] px-4 py-2 text-[13px] font-semibold 
                        text-white-100">
          {t("alumni.empoweredByKnowledge")}
        </span>
        <h1 className="mt-4 text-[32px] font-bold leading-tight text-[#262626] md:text-[40px]">
          {t(isMSC ? "alumni.mscJourneyToSuccess" : "alumni.mbaJourneyToSuccess")}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#262626] md:text-base">
          {t(isMSC ? "alumni.mscDescription" : "alumni.mbaDescription")}
        </p>
      </div>

      <div className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#262626] md:text-2xl">
            {t("alumni.successStories")}
          </h2>
          <button
            type="button"
            onClick={onViewAllStories}
            className="border-0 bg-transparent p-0 text-right text-xs font-semibold text-[#262626] underline hover:text-[#D30000]"
          >
            {t("alumni.viewAllStories")}
          </button>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            onScroll={updateCarouselButtons}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {carouselStories.map((story, index) => (
              <article
                key={`${localizedText(story.name, language)}-${index}`}
                className="flex min-h-[430px] w-full shrink-0 snap-start flex-col justify-between rounded-xl border border-gray-50 bg-white-100 p-5 shadow-sm lg:w-[calc(50%_-_12px)] xl:w-[calc(33.333%_-_16px)]"
              >
                <div className="mt-2 min-w-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 40 30" fill="none">
                    <path d="M40 30V15H30C30 9.45 34.45 5 40 5V0C31.75 0 25 6.75 25 15V30H40ZM15 30V15H5C5 9.45 9.45 5 15 5V0C6.75 0 0 6.75 0 15V30H15Z" 
                      fill="#D30000"/>
                  </svg>
                  <p className="text-sm leading-7 text-[#262626] mt-6 break-words">
                    {localizedText(story.story, language)}
                  </p>
                </div>

                <div className="flex h-[160px] items-center border-t border-dashed border-gray-50 pt-4 mt-8">
                  <div className="flex w-full items-center gap-4">
                    <img
                      src={story.image}
                      alt={localizedText(story.name, language)}
                      className="h-[80px] w-[80px] shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-bold text-[#262626]">
                        {localizedText(story.name, language)}
                      </h3>
                      <p className="mt-1 break-words text-[14px] font-semibold leading-5 text-[#171717]">
                        {localizedText(story.designation, language)}
                      </p>
                      <p className="break-words text-[14px] font-semibold leading-5 text-[#171717]">
                        {localizedText(story.company, language)}
                      </p>
                      <p className="mt-1 text-[12px] font-medium text-[#404040]">
                        {localizedText(story.batch, language)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {canScrollPrevious && (
            <button
              type="button"
              onClick={() => scrollStories("left")}
              aria-label={t("alumni.previousStory")}
              className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-50 bg-white-100 p-0 text-[#404040] shadow-md hover:text-[#D30000] md:flex"
            >
              <KeyboardArrowLeftIcon />
            </button>
          )}
          {canScrollNext && (
            <button
              type="button"
              onClick={() => scrollStories("right")}
              aria-label={t("alumni.nextStory")}
              className="absolute right-0 top-1/2 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-50 bg-white-100 p-0 text-[#404040] shadow-md hover:text-[#D30000] md:flex"
            >
              <KeyboardArrowRightIcon />
            </button>
          )}

          <div className="mt-3 flex justify-center gap-4 md:hidden">
            {canScrollPrevious && (
              <button
                type="button"
                onClick={() => scrollStories("left")}
                aria-label={t("alumni.previousStory")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white-100 p-0 text-[#404040] shadow-sm hover:text-[#D30000]"
              >
                <KeyboardArrowLeftIcon />
              </button>
            )}
            {canScrollNext && (
              <button
                type="button"
                onClick={() => scrollStories("right")}
                aria-label={t("alumni.nextStory")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white-100 p-0 text-[#404040] shadow-sm hover:text-[#D30000]"
              >
                <KeyboardArrowRightIcon />
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#262626] md:text-2xl">
            {t("alumni.features")}
          </h2>
          <a
            href="https://www.youtube.com/@strategyfirst-intl-college"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-[#262626] underline hover:text-[#D30000] text-right"
          >
            {t("alumni.joinYouTube")}
          </a>
        </div>

        <div className="relative">
          <div
            ref={featuresCarouselRef}
            onScroll={updateFeaturesButtons}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {alumniFeatures.map((feature) => (
              <div
                key={feature.src}
                className="aspect-video w-full shrink-0 snap-start overflow-hidden rounded-xl bg-gray-50 lg:w-[calc(50%_-_12px)]"
              >
                <iframe
                  height="100%"
                  width="100%"
                  src={feature.src}
                  title={feature.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ))}
          </div>

          {canScrollPreviousFeatures && (
            <button
              type="button"
              onClick={() => scrollFeatures("left")}
              aria-label={t("alumni.previousFeature")}
              className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-50 bg-white-100 p-0 text-[#404040] shadow-md hover:text-[#D30000] md:flex"
            >
              <KeyboardArrowLeftIcon />
            </button>
          )}
          {canScrollNextFeatures && (
            <button
              type="button"
              onClick={() => scrollFeatures("right")}
              aria-label={t("alumni.nextFeature")}
              className="absolute right-0 top-1/2 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-50 bg-white-100 p-0 text-[#404040] shadow-md hover:text-[#D30000] md:flex"
            >
              <KeyboardArrowRightIcon />
            </button>
          )}

          <div className="mt-3 flex justify-center gap-4 md:hidden">
            {canScrollPreviousFeatures && (
              <button
                type="button"
                onClick={() => scrollFeatures("left")}
                aria-label={t("alumni.previousFeature")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white-100 p-0 text-[#404040] shadow-sm hover:text-[#D30000]"
              >
                <KeyboardArrowLeftIcon />
              </button>
            )}
            {canScrollNextFeatures && (
              <button
                type="button"
                onClick={() => scrollFeatures("right")}
                aria-label={t("alumni.nextFeature")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white-100 p-0 text-[#404040] shadow-sm hover:text-[#D30000]"
              >
                <KeyboardArrowRightIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AlumniHighlights;
