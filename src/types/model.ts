/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactSelectOption } from "../components/form/ReactSelect";

export interface OtpData {
  phone: string;
}
export interface RegisterUserData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface CreatePersonalInfoData {
  name: string;
  gender: string | ReactSelectOption;
  dob: string;
  nrc: string;
  address1: string;
  address2: string;
  email: string;
  phone: string;
  region: string;
  township: string;
  is_sfu: number | boolean;
  student_id: string;

  // nrc
  nrcNumber?: string;
  nrcNumberMobile?: string;
  nrcType?: ReactSelectOption;
  nrcPlace?: ReactSelectOption;
  nrcNation?: ReactSelectOption;
}

export interface CreateApplyDocumentData {
  university: string;
  degree: string;
  field_of_study: string;
  field_of_study_start_date: string;
  field_of_study_end_date: string;
  certificate_doc: File;
  company: string;
  industry: string;
  designation: string;
  work_start_date: string;
  work_end_date: string;
  english_results: File;
  rec_letters: File;
}
export interface CreateApplyProgramData {
  program: string;
}

export interface UpdateEducationData {
  id?: string | number;
  university: string;
  degree: string;
  field_of_study: string;
  field_of_study_start_date: string;
  field_of_study_end_date: string;
  certificate_doc?: any;
}

export interface UpdateWorkData {
  id?: string;
  company: string;
  industry: string;
  designation: string;
  work_start_date: string;
  work_end_date: string;
}

export interface UpdateProfileData {
  name: string;
  gender: string | ReactSelectOption;
  dob: string;
  nrc: string;
  address1: string;
  address2: string;
  region: string;
  township: string;
  is_sfu: number | boolean;
  student_id: string;
}
