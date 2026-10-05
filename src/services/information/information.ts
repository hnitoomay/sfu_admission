import useSWR from "swr";
import api from "../our_axios";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useGetProgramOverview(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug !== undefined ? `/program-overviews/${slug}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

export function useGetModule(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug !== undefined ? `/core-modules/${slug}` : null,
    fetcher
  );

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
}

export function useGetSpecialisation(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug !== undefined ? `/specialisations/${slug}` : null,
    fetcher
  );

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
}

export function useGetAssessment(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug !== undefined ? `/assessments/${slug}` : null,
    fetcher
  );

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
}

export function useGetAdmissionReq(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug !== undefined ? `/admission-requirements/${slug}` : null,
    fetcher
  );

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
}

export function useGetLectureProfile() {
  const { data, error, isLoading, mutate } = useSWR(
    "/lecture-profiles",
    fetcher
  );

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
}

export function useGetFAQ(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug !== undefined ? `/faqs/${slug}` : null,
    fetcher
  );

  return {
    data: data?.data,
    error,
    isLoading,
    mutate,
  };
}

export function useGetProgramDetail(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug !== undefined ? `/program/detail/${slug}` : null,
    fetcher
  );
  return {
    data: data,
    error,
    isLoading,
    mutate,
  };
}
