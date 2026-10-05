import { useParams } from "react-router-dom";
import useCustomPath from "../../hooks/customHook/useCustomPath";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import {
  useGetAdmissionReq,
  useGetAssessment,
  useGetFAQ,
  useGetModule,
  useGetProgramDetail,
  useGetProgramOverview,
} from "../../services/information/information";
import LoadingSpinner from "../../components/Loading";
import NotFoundPage from "../../components/NotFoundPage";
import ProgramOverView from "../../components/content/ProgramOverview";
import CoreModules from "../../components/content/CoreModules";
import Specialisation from "../../components/content/Specialisation​";
import AcademicCalendar from "../../components/content/AcademicCalendar";
import Assessment from "../../components/content/Assessment​";
import Adminssion from "../../components/content/Adminssion";
import PaymentInfo from "../../components/content/PaymentInfo";
import ContactInfo from "../../components/content/ContactInfo";
import LectureProfile from "../../components/content/LectureProfile";
import FAQ from "../../components/content/FAQ";
import { useEffect, useMemo, useState } from "react";
import { useSlugStore } from "../../store/useSlugStore";
import HowToApply from "../../components/content/HowToApply";
import AlumniHighlights from "../../components/content/AlumniHighlights";
import SuccessStories from "../../components/content/SuccessStories";
import ScholarshipStudents from "../../components/content/ScholarshipStudents";
import ActivitiesEvents, {
  activities,
  ActivityEvent,
} from "../../components/content/ActivitiesEvents";
import EventDetail from "../../components/content/EventDetail";

function Home() {
  const { slug } = useParams();
  const [type, setType] = useState<number>(1);  
  const [selectedActivity, setSelectedActivity] = useState<ActivityEvent>(
    activities[0]
  );

  const checkType = (id: number) => {
    setType(id);
  };

  const viewActivityDetail = (activity: ActivityEvent) => {
    setSelectedActivity(activity);
    setType(16);
    document
      .getElementById("home-card")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const programOverviewData = useGetProgramOverview(slug as string);
  const moduleData = useGetModule(slug as string);
  const assessmentData = useGetAssessment(slug as string);
  const admissionData = useGetAdmissionReq(slug as string);
  const faqData = useGetFAQ(slug as string);
  const alumniHighlightsData = useGetProgramDetail(slug as string);
  const successStoriesData = useGetProgramDetail(slug as string);
  const scholarshipStudentsData = useGetProgramDetail(slug as string);
  const activitiesEventsData = useGetProgramDetail(slug as string);

  const isMBA = useCustomPath(slug as string, "mba-sfu-wolverhampton");
  const isMSC = useCustomPath(slug as string, "msc-sfu-wolverhampton");

  const {
    setSlugInfo,
    isMBA: storeIsMBA,
    isMSC: storeIsMSC,
    homeCardData,
  } = useSlugStore();

  // Set Zustand state based on data
  useEffect(() => {
    setSlugInfo(
      slug as string,
      isMBA,
      isMSC,
      programOverviewData.data,
      homeCardData
    );
  }, [slug, isMBA, isMSC, programOverviewData.data, homeCardData, setSlugInfo]);

  const renderComponent = useMemo(() => {
    const getId: { [key: number]: JSX.Element } = {
      1: <ProgramOverView />,
      2: <CoreModules />,
      3: <Specialisation />,
      4: <AcademicCalendar />,
      5: <Assessment />,
      6: <Adminssion />,
      7: <PaymentInfo />,
      8: <LectureProfile />,
      9: <ContactInfo />,
      10: <HowToApply />,
      11: <AlumniHighlights onViewAllStories={() => checkType(13)} />,
      12: <FAQ />,
      13: <SuccessStories onViewHighlights={() => checkType(11)} />,
      14: <ScholarshipStudents />,
      15: <ActivitiesEvents onViewActivity={viewActivityDetail} />,
      16: <EventDetail activity={selectedActivity} onBack={() => checkType(15)} />,
    };

    return getId[type];
  }, [type, selectedActivity]);

  const { data, error, isLoading } = useMemo(() => {
    switch (type) {
      case 1:
        return programOverviewData;
      case 2:
        return moduleData;
      case 5:
        return assessmentData;
      case 6:
        return admissionData;
      case 11:
        return alumniHighlightsData;
      case 12:
        return faqData;
      case 13:
        return successStoriesData;
      case 14:
        return scholarshipStudentsData;
      case 15:
      case 16:
        return activitiesEventsData;
      default:
        return programOverviewData;
    }
  }, [
    type,
    programOverviewData,
    moduleData,
    assessmentData,
    admissionData,
    faqData,
    alumniHighlightsData,
    successStoriesData,
    scholarshipStudentsData,
    activitiesEventsData,
  ]);

  const {
    data: homeCardDataAPI,
    error: homeCardError,
    isLoading: homeCardLoading,
  } = useGetProgramDetail(slug as string);

  useEffect(() => {
    setSlugInfo(
      slug as string,
      isMBA,
      isMSC,
      programOverviewData.data,
      homeCardDataAPI
    );
  }, [
    slug,
    isMBA,
    isMSC,
    programOverviewData.data,
    homeCardDataAPI,
    setSlugInfo,
  ]);

  if (error || isLoading || homeCardLoading || homeCardError) {
    return <LoadingSpinner />;
  }

  if (
    data?.message === "fail" &&
    !storeIsMBA &&
    !storeIsMSC &&
    homeCardData?.message === "fail"
  ) {
    return <NotFoundPage />;
  }

  return (
    <>
      <FirstSection />
      <SecondSection
        onSectionChange={(id: number) => checkType(id)}
        children={renderComponent}
      />
    </>
  );
}

export default Home;
