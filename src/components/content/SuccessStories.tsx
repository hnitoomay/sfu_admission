import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useRef, useState } from "react";
import {
  getAlumniStories,
  type AlumniStory,
} from "./AlumniHighlights";
import { classNames } from "../../lib/helper";
import { useSlugStore } from "../../store/useSlugStore";
import { localizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

interface SuccessStoriesProps {
  onViewHighlights?: () => void;
}

const STORIES_PER_PAGE = 6;

function SuccessStoryCard({
  story,
  isExpanded,
  isMasonry,
  onToggleExpanded,
}: {
  story: AlumniStory;
  isExpanded: boolean;
  isMasonry: boolean;
  onToggleExpanded: () => void;
}) {
  const storyRef = useRef<HTMLParagraphElement>(null);
  const [hasMoreText, setHasMoreText] = useState(false);
  const { language } = useTranslation();
  const storyText = localizedText(story.story, language);

  useEffect(() => {
    const updateHasMoreText = () => {
      const storyElement = storyRef.current;

      if (!storyElement) {
        return;
      }

      setHasMoreText(storyElement.scrollHeight > storyElement.clientHeight + 1);
    };

    updateHasMoreText();
    window.addEventListener("resize", updateHasMoreText);

    return () => {
      window.removeEventListener("resize", updateHasMoreText);
    };
  }, [storyText, isExpanded]);

  return (
    <article
      className={classNames(
        isMasonry ? "break-inside-avoid" : "h-full",
        "rounded-xl border border-gray-50 bg-white-100 p-5 shadow-sm"
      )}
    >
      <svg
        className="mt-2"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="27"
        viewBox="0 0 40 30"
        fill="none"
      >
        <path
          d="M40 30V15H30C30 9.45 34.45 5 40 5V0C31.75 0 25 6.75 25 15V30H40ZM15 30V15H5C5 9.45 9.45 5 15 5V0C6.75 0 0 6.75 0 15V30H15Z"
          fill="#D30000"
        />
      </svg>
      <p
        ref={storyRef}
        className={classNames(
          isExpanded ? "h-auto" : "h-28 line-clamp-4",
          "mt-5 text-sm leading-7 text-[#262626]"
        )}
      >
        {storyText}
      </p>
      <div className="mt-1 h-5">
        {(hasMoreText || isExpanded) && (
          <button
            type="button"
            onClick={onToggleExpanded}
            className="border-0 bg-transparent p-0 text-[12px] font-medium text-[#3C3C3C] 
              underline hover:text-[#D30000]"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <div className="flex min-h-[160px] items-center border-t border-dashed border-gray-50 pt-5 mt-8 mb-2">
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
  );
}

function SuccessStories({ onViewHighlights }: SuccessStoriesProps) {
  const { isMSC } = useSlugStore();
  const { language, t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState<
    "all" | "yangon" | "mandalay"
  >("all");
  const [visibleCount, setVisibleCount] = useState(STORIES_PER_PAGE);
  const [expandedStoryKeys, setExpandedStoryKeys] = useState<Set<string>>(
    () => new Set()
  );
  const [columnCount, setColumnCount] = useState(1);
  const alumniStories = getAlumniStories(isMSC);
  const activeLocation = isMSC ? "yangon" : selectedLocation;
  const filteredStories =
    activeLocation === "all"
      ? alumniStories
      : alumniStories.filter((story) => story.location === activeLocation);
  const visibleStories = filteredStories.slice(0, visibleCount);
  const hasMoreStories = visibleCount < filteredStories.length;
  const hasExpandedStories =
    visibleCount > STORIES_PER_PAGE && filteredStories.length > STORIES_PER_PAGE;
  const hasExpandedCards = expandedStoryKeys.size > 0;
  const filterButtons = isMSC
    ? ([{ label: "Yangon", value: "yangon" }] as const)
    : ([
        { label: "All", value: "all" },
        { label: "Yangon", value: "yangon" },
        { label: "Mandalay", value: "mandalay" },
      ] as const);

  useEffect(() => {
    setVisibleCount(STORIES_PER_PAGE);
    setExpandedStoryKeys(new Set());
  }, [activeLocation]);

  useEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth >= 1280) {
        setColumnCount(3);
        return;
      }

      if (window.innerWidth >= 1024) {
        setColumnCount(2);
        return;
      }

      setColumnCount(1);
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);

    return () => {
      window.removeEventListener("resize", updateColumnCount);
    };
  }, []);

  const getStoryKey = (story: AlumniStory, index: number) =>
    `${localizedText(story.name, language)}-${localizedText(
      story.batch,
      language
    )}-${index}`;

  const toggleExpandedStory = (storyKey: string) => {
    setExpandedStoryKeys((current) => {
      const next = new Set(current);

      if (next.has(storyKey)) {
        next.delete(storyKey);
      } else {
        next.add(storyKey);
      }

      return next;
    });
  };

  const storyColumns = Array.from({ length: columnCount }, (_, columnIndex) =>
    visibleStories
      .map((story, index) => ({ story, index }))
      .filter(({ index }) => index % columnCount === columnIndex)
  );

  return (
    <>
        <div className="mb-4 flex items-center gap-2 text-[14px] text-[#808080]">
          <button
            type="button"
            className="bg-transparent text-[#737373] font-normal px-0 hover:text-[#D30000]"
            onClick={onViewHighlights}
          >
            Alumni Highlights
          </button>
          <span className="text-[#404040] font-medium text-lg">{">"}</span>
          <span className="text-[#404040] font-medium">Success Stories</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#262626]">
            {t("alumni.successStories")}
          </h1>
          <div className="mt-4 flex gap-1">
            {filterButtons.map((button) => {
              const isActive = activeLocation === button.value;

              return (
                <button
                  key={button.value}
                  type="button"
                  onClick={() => setSelectedLocation(button.value)}
                  className={classNames(
                    isActive
                      ? "border border-[#E5E5E5] bg-[#FAFAFA] text-[#262626]"
                      : "border-0 bg-transparent text-[#262626] hover:text-[#D30000]",
                    "rounded-full px-4 py-2 text-[14px] font-medium"
                  )}
                >
                  {button.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={classNames(
            hasMoreStories || hasExpandedStories ? "mb-10" : "",
            "relative"
          )}
        >
          {visibleStories.length === 0 ? (
            <p className="text-sm font-medium text-[#404040] text-center mt-8">
              There is no story found.
            </p>
          ) : (
            hasExpandedCards ? (
              <div
                className={classNames(
                  hasMoreStories ? "pb-5" : "",
                  "flex gap-5"
                )}
              >
                {storyColumns.map((columnStories, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="flex min-w-0 flex-1 flex-col gap-5"
                  >
                    {columnStories.map(({ story, index }) => {
                      const storyKey = getStoryKey(story, index);

                      return (
                        <SuccessStoryCard
                          key={storyKey}
                          story={story}
                          isExpanded={expandedStoryKeys.has(storyKey)}
                          isMasonry
                          onToggleExpanded={() => toggleExpandedStory(storyKey)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={classNames(
                  hasMoreStories ? "pb-5" : "",
                  "grid gap-5 lg:grid-cols-2 xl:grid-cols-3"
                )}
              >
                {visibleStories.map((story, index) => {
                  const storyKey = getStoryKey(story, index);

                  return (
                    <SuccessStoryCard
                      key={storyKey}
                      story={story}
                      isExpanded={expandedStoryKeys.has(storyKey)}
                      isMasonry={false}
                      onToggleExpanded={() => toggleExpandedStory(storyKey)}
                    />
                  );
                })}
              </div>
            )
          )}

          {hasMoreStories && (
            <>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white-100 via-white-100/80 to-white-100/0" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((current) => current + STORIES_PER_PAGE)
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-[#808080] bg-white-100 px-5 py-3 text-sm font-medium text-[#262626] shadow-md hover:border-[#D30000] hover:text-[#D30000]"
                >
                  See More
                  <span className="h-5 border-l border-[#0000004D]" />
                  <KeyboardArrowDownIcon sx={{ fontSize: 28 }} />
                </button>
              </div>
            </>
          )}

          {!hasMoreStories && hasExpandedStories && (
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <button
                type="button"
                onClick={() => {
                  setVisibleCount(STORIES_PER_PAGE);
                  setExpandedStoryKeys(new Set());
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#808080] bg-white-100 px-5 py-3 text-sm font-medium text-[#262626] shadow-md hover:border-[#D30000] hover:text-[#D30000]"
              >
                Collapse All
                <span className="h-5 border-l border-[#0000004D]" />
                <KeyboardArrowDownIcon
                  sx={{ fontSize: 28, transform: "rotate(180deg)" }}
                />
              </button>
            </div>
          )}
        </div>
    </>
  );
}

export default SuccessStories;
