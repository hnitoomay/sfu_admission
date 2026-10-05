import { InferType, object, string } from "yup";
import { dateErrMsg, requiredErrMsg } from "../validation-message";
import { DATE_FORMAT_REGEX } from "../validation-format";

export const profileWorkSchema = object({
  company: string().required(requiredErrMsg("Company")),
  industry: string().required(requiredErrMsg("Industry")),
  designation: string().required(requiredErrMsg("Designation")),
  workStartDate: string()
    .required(requiredErrMsg("Start Date"))
    .matches(DATE_FORMAT_REGEX, dateErrMsg("Start Date")),
  workEndDate: string()
    .required(requiredErrMsg("End Date"))
    .matches(DATE_FORMAT_REGEX, dateErrMsg("End Date"))
    .test(
      "dateTest",
      "End Date must be greater than Start Date",
      function (value) {
        const ed = new Date(value).getTime();
        const sd = new Date(this.parent.workStartDate).getTime();
        if (ed > sd) {
          return true;
        } else {
          return false;
        }
      }
    ),
});

export type ProfileWorkVType = InferType<typeof profileWorkSchema>;