import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSlugStore } from "../../store/useSlugStore";
import mbaScholarsData from "../../data/mba/scholar.json";
import mscScholarsData from "../../data/msc/scholar.json";
import useCarousel from "../../hooks/customHook/useCarousel";
import { localizedText, LocalizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

const scholarshipFilters = [
  { labelKey: "scholarship.full", value: "full" },
  { labelKey: "scholarship.partial", value: "partial" },
  { labelKey: "scholarship.futureTeacher", value: "future-teacher" },
  { labelKey: "scholarship.payItForward", value: "pay-it-forward" },
] as const;

type Scholar = {
  name: LocalizedText;
  type: (typeof scholarshipFilters)[number]["value"];
  programme: LocalizedText;
  batch: LocalizedText;
  year: LocalizedText;
  image: string;
};

const mbaScholars = mbaScholarsData as Scholar[];
const mscScholars = mscScholarsData as Scholar[];

const mbaScholarshipFeatures = [
  {
    title: "𝑴𝑩𝑨 - 𝑭𝒖𝒕𝒖𝒓𝒆 𝑻𝒆𝒂𝒄𝒉𝒆𝒓 𝑺𝒄𝒉𝒐𝒍𝒂𝒓𝒔𝒉𝒊𝒑 𝑺𝒕𝒖𝒅𝒆𝒏𝒕 𝑹𝒆𝒇𝒍𝒆𝒄𝒕𝒊𝒐𝒏",
    src: "https://www.youtube.com/embed/LAEXCsjDIeg",
  },
  {
    title: "Master of Business Administration (MBA) - Full Scholarship Student Reflection",
    src: "https://www.youtube.com/embed/GxLQvJX3cjo",
  },
  {
    title: "𝙈𝘽𝘼 𝙎𝙘𝙝𝙤𝙡𝙖𝙧𝙨𝙝𝙞𝙥 𝙅𝙤𝙪𝙧𝙣𝙚𝙮 - &quot;𝘾𝙤𝙢𝙢𝙪𝙣𝙞𝙩𝙮 𝙎𝙚𝙧𝙫𝙞𝙘𝙚 𝙖𝙣𝙙 𝙇𝙚𝙖𝙙𝙚𝙧𝙨𝙝𝙞𝙥 𝙎𝙘𝙝𝙤𝙡𝙖𝙧𝙨𝙝𝙞𝙥&quot;",
    src: "https://www.youtube.com/embed/B8E7Idd-hmo",
  },
  {
    title: "Master of Business Administration (MBA) - Full Scholarship Student Reflection",
    src: "https://www.youtube.com/embed/VmhuNE3qvJ4",
  },
];

const mscScholarshipFeatures = [
  {
    title: "MSc (Computer Science)- Full Scholarship Student Reflection",
    src: "https://www.youtube.com/embed/G6fd8A2Nt7I",
  },
  {
    title: "MSc (Computer Science) - Full Scholarship Student Reflection",
    src: "https://www.youtube.com/embed/htkNMxBzDHg",
  },
];

function ScholarshipStudents() {
  const { isMSC } = useSlugStore();
  const { language, t } = useTranslation();
  const [selectedFilter, setSelectedFilter] =
    useState<(typeof scholarshipFilters)[number]["value"]>("full");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const scholars = isMSC ? mscScholars : mbaScholars;
  const scholarshipFeatures = isMSC
    ? mscScholarshipFeatures
    : mbaScholarshipFeatures;
  const featuresCarouselRef = useRef<HTMLDivElement>(null);
  const {
    canScrollPrevious: canScrollPreviousFeatures,
    canScrollNext: canScrollNextFeatures,
    scroll: scrollFeatures,
    updateButtons: updateFeaturesButtons,
  } = useCarousel(featuresCarouselRef);

  useEffect(() => {
    if (scholarshipFeatures.length <= 1) {
      return;
    }

    const autoSlideInterval = window.setInterval(() => {
      scrollFeatures("right", true);
    }, 6000);

    return () => {
      window.clearInterval(autoSlideInterval);
    };
  }, [scrollFeatures, scholarshipFeatures.length]);

  const availableFilters = useMemo(
    () =>
      scholarshipFilters.filter((filter) =>
        scholars.some((scholar) => scholar.type === filter.value)
      ),
    [scholars]
  );

  useEffect(() => {
    if (
      availableFilters.length > 0 &&
      !availableFilters.some((filter) => filter.value === selectedFilter)
    ) {
      setSelectedFilter(availableFilters[0].value);
    }
  }, [availableFilters, selectedFilter]);

  const selectedFilterLabel =
    availableFilters.find((filter) => filter.value === selectedFilter)
      ?.labelKey ?? "scholarship.full";
  const heading = `${t(selectedFilterLabel)} ${t("scholarship.winners")}`;
  const filteredScholars = scholars.filter(
    (scholar) => scholar.type === selectedFilter
  );

  return (
    <section>
      <div className="mb-10">
        <h1 className="text-[32px] font-bold leading-tight text-[#262626] md:text-[40px]">
          {t("scholarship.meetOurScholars")}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#262626] md:text-base">
          {isMSC ? t("scholarship.introMSC") : t("scholarship.introMBA")}
        </p>
      </div>

      <div className="mb-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-[#262626] md:text-2xl">
            {heading}
          </h2>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen((current) => !current)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E5E5E5] 
                bg-[#F5F5F5] px-4 py-2 text-[14px] font-medium text-[#262626]"
            >
              {t(selectedFilterLabel)}
              <span className="h-5 border-l border-[#E5E5E5]" />
              <KeyboardArrowDownIcon sx={{ fontSize: 22 }} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 z-10 mt-2 w-[270px] overflow-hidden rounded-xl border border-[#E5E5E5] bg-white-100 py-2 shadow-lg">
                {availableFilters.map((filter) => {
                  const isActive = selectedFilter === filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => {
                        setSelectedFilter(filter.value);
                        setIsFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between border-0 rounded-none px-4 py-3 text-left text-[14px] font-medium text-[#262626] ${
                        isActive ? "bg-[#F5F5F5]" : "bg-white-100"
                      } hover:bg-[#F5F5F5]`}
                    >
                      {t(filter.labelKey)}
                      {isActive && <CheckIcon sx={{ fontSize: 18 }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {filteredScholars.length === 0 ? (
          <div className="rounded-xl border border-gray-50 bg-white-100 px-5 py-12 text-center shadow-sm">
            <p className="text-sm font-medium text-[#404040]">
              {t("scholarship.empty")}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredScholars.map((scholar) => (
              <article
                key={localizedText(scholar.name, language)}
                className="overflow-hidden rounded-xl border border-gray-50 bg-white-100 shadow-sm"
              >
                <img
                  src={scholar.image}
                  alt={localizedText(scholar.name, language)}
                  className="w-full h-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-[20px] font-bold text-[#171717]">
                    {localizedText(scholar.name, language)}
                  </h3>
                  <p className="mt-2 text-[14px] font-semibold leading-5 text-[#262626]">
                    {localizedText(scholar.programme, language)}
                  </p>
                  <p className="mt-1 text-[14px] font-medium leading-5 text-[#262626]">
                    {localizedText(scholar.batch, language)}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2 text-[13px] font-medium text-[#262626]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 11 12" fill="none">
                      <path d="M9.625 0.875H8.3125V0.4375C8.3125 0.321468 8.26641 0.210188 8.18436 0.128141C8.10231 0.0460936 7.99103 0 7.875 0C7.75897 0 7.64769 0.0460936 7.56564 0.128141C7.48359 0.210188 7.4375 0.321468 7.4375 0.4375V0.875H3.0625V0.4375C3.0625 0.321468 3.01641 0.210188 2.93436 0.128141C2.85231 0.0460936 2.74103 0 2.625 0C2.50897 0 2.39769 0.0460936 2.31564 0.128141C2.23359 0.210188 2.1875 0.321468 2.1875 0.4375V0.875H0.875C0.642936 0.875 0.420376 0.967187 0.256282 1.13128C0.0921872 1.29538 0 1.51794 0 1.75V10.5C0 10.7321 0.0921872 10.9546 0.256282 11.1187C0.420376 11.2828 0.642936 11.375 0.875 11.375H9.625C9.85706 11.375 10.0796 11.2828 10.2437 11.1187C10.4078 10.9546 10.5 10.7321 10.5 10.5V1.75C10.5 1.51794 10.4078 1.29538 10.2437 1.13128C10.0796 0.967187 9.85706 0.875 9.625 0.875ZM7.52828 6.43453L4.90328 9.05953C4.86265 9.10021 4.8144 9.13248 4.76129 9.1545C4.70817 9.17651 4.65124 9.18784 4.59375 9.18784C4.53626 9.18784 4.47933 9.17651 4.42621 9.1545C4.3731 9.13248 4.32485 9.10021 4.28422 9.05953L2.97172 7.74703C2.88963 7.66494 2.84351 7.5536 2.84351 7.4375C2.84351 7.3214 2.88963 7.21006 2.97172 7.12797C3.05381 7.04588 3.16515 6.99976 3.28125 6.99976C3.39735 6.99976 3.50869 7.04588 3.59078 7.12797L4.59375 8.13148L6.90922 5.81547C6.94987 5.77482 6.99812 5.74258 7.05123 5.72058C7.10434 5.69858 7.16126 5.68726 7.21875 5.68726C7.27624 5.68726 7.33316 5.69858 7.38627 5.72058C7.43938 5.74258 7.48763 5.77482 7.52828 5.81547C7.56893 5.85612 7.60117 5.90437 7.62317 5.95748C7.64517 6.01059 7.65649 6.06751 7.65649 6.125C7.65649 6.18249 7.64517 6.23941 7.62317 6.29252C7.60117 6.34563 7.56893 6.39388 7.52828 6.43453ZM0.875 3.5V1.75H2.1875V2.1875C2.1875 2.30353 2.23359 2.41481 2.31564 2.49686C2.39769 2.57891 2.50897 2.625 2.625 2.625C2.74103 2.625 2.85231 2.57891 2.93436 2.49686C3.01641 2.41481 3.0625 2.30353 3.0625 2.1875V1.75H7.4375V2.1875C7.4375 2.30353 7.48359 2.41481 7.56564 2.49686C7.64769 2.57891 7.75897 2.625 7.875 2.625C7.99103 2.625 8.10231 2.57891 8.18436 2.49686C8.26641 2.41481 8.3125 2.30353 8.3125 2.1875V1.75H9.625V3.5H0.875Z" fill="#D30000"/>
                    </svg>
                    {localizedText(scholar.year, language)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-[#262626] md:text-2xl">
            {t("scholarship.features")}
          </h2>
          <a
            href="https://www.youtube.com/@strategyfirst-intl-college"
            target="_blank"
            rel="noreferrer"
            className="text-right text-xs font-semibold text-[#262626] underline hover:text-[#D30000]"
          >
            {t("scholarship.viewMore")}
          </a>
        </div>

        <div className="relative">
          <div
            ref={featuresCarouselRef}
            onScroll={updateFeaturesButtons}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {scholarshipFeatures.map((feature, index) => (
              <div
                key={`${feature.title}-${index}`}
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
              aria-label={t("scholarship.previousFeature")}
              className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-50 bg-white-100 p-0 text-[#404040] shadow-md hover:text-[#D30000] md:flex"
            >
              <KeyboardArrowLeftIcon />
            </button>
          )}
          {canScrollNextFeatures && (
            <button
              type="button"
              onClick={() => scrollFeatures("right")}
              aria-label={t("scholarship.nextFeature")}
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
                aria-label={t("scholarship.previousFeature")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white-100 p-0 text-[#404040] shadow-sm hover:text-[#D30000]"
              >
                <KeyboardArrowLeftIcon />
              </button>
            )}
            {canScrollNextFeatures && (
              <button
                type="button"
                onClick={() => scrollFeatures("right")}
                aria-label={t("scholarship.nextFeature")}
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

export default ScholarshipStudents;
