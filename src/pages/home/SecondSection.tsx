import { useEffect, useState } from "react";
import { classNames } from "../../lib/helper";
import { useTranslation } from "../../i18n/useTranslation";

interface SecondSectionParams {
  onSectionChange: (id: number) => void;
  children: JSX.Element;
  initialId?: number;
}

function SecondSection({
  onSectionChange,
  children,
  initialId = 1,
}: SecondSectionParams) {
  const [id, setId] = useState(initialId);
  const { t } = useTranslation();

  const sidebarSections = [
    {
      title: t("program.programme"),
      items: [
        { id: 1, title: t("program.overview") },
        { id: 2, title: t("program.modules") },
        { id: 4, title: t("program.academicCalendar") },
        { id: 5, title: t("program.assessment") },
        { id: 8, title: t("program.lecturerProfiles") },
      ],
    },
    {
      title: t("program.admissions"),
      items: [
        { id: 6, title: t("program.admissionProcess") },
        { id: 7, title: t("program.feesFinance") },
        { id: 10, title: t("program.howToApply") },
        { id: 9, title: t("program.contactUs") },
      ],
    },
    {
      title: t("program.studentLife"),
      items: [
        { id: 11, title: t("program.alumniHighlights") },
        { id: 14, title: t("program.scholarshipStudents") },
        { id: 15, title: t("program.activitiesEvents") },
      ],
    },
  ];

  const mobileSidebarItems = sidebarSections.flatMap((section) => section.items);

  useEffect(() => {
    setId(initialId);
  }, [initialId]);

  const handleSectionClick = (itemId: number) => {
    setId(itemId);
    onSectionChange(itemId);
  };

  return (
    <div className="flex bg-white-100 sm:flex-col md:flex-row md:space-x-8 sm:space-y-8 md:space-y-0 md:px-[20px] lg:px-[100px] sm:py-[20px] md:py-[100px]">
      <div className="sm:w-full md:w-1/3 lg:w-1/5 sm:px-[20px]">
        <nav
          className="flex md:hidden space-x-2 overflow-x-auto"
          aria-label={t("program.navLabel")}
        >
          {mobileSidebarItems.map((item) => {
            const isActive = item.id === id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionClick(item.id)}
                className={classNames(
                  isActive
                    ? "border-b-2 border-red-100 text-red-100"
                    : "border-b-2 border-transparent text-gray-800",
                  "shrink-0 border-0 rounded-none bg-transparent px-2 py-2 text-base font-normal"
                )}
              >
                {item.title}
              </button>
            );
          })}
        </nav>

        <nav
          className="hidden w-full max-w-[230px] space-y-5 ml-5 md:block"
          aria-label={t("program.navLabel")}
        >
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 text-[16px] font-semibold text-[#404040]">
                {section.title}
              </p>
              <div>
                {section.items.map((item) => {
                  const isActive = item.id === id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSectionClick(item.id)}
                      className={classNames(
                        isActive
                          ? "border-red-100 text-red-100 font-medium"
                          : "border-[#E6E6E6] text-[#404040] font-normal hover:border-red-100 hover:text-red-100",
                        "block border-0 border-l-2 bg-transparent w-full rounded-none px-4 py-3 text-left text-[15px] leading-5 transition-colors"
                      )}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="min-w-0 max-w-full sm:w-full md:w-2/3 lg:w-4/5 sm:px-4 text-left">
        {children}
      </div>
    </div>
  );
}

export default SecondSection;
