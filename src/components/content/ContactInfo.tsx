import Header from "../Header";
import { useSlugStore } from "../../store/useSlugStore";
// import ProgramCard from "../ProgramCard";

function ContactInfo() {
  const { isMSC } = useSlugStore();
  const admissionEmail = isMSC
    ? "msc.admissions@strategyfirst.edu.mm"
    : "mba.admissions@strategyfirst.edu.mm";

  return (
    <>
      <div className="bg-blue-150 p-10">
        <Header title="Contact Information" />

        <p className="text-gray-600 font-normal md:text-[14px] lg:text-base mt-[24px]">
          If you're interested in learning more about our programme, have
          specific admission queries, or simply want to get in touch, feel free
          to reach out to us.
        </p>

        <div className="pt-[34px]">
          <div className="flex space-x-4 mb-[32px]">
            <img src="img/phone.png" alt="Phone" className="w-auto h-5" />
            <div>
              <p className="text-gray-800 sm:text-xs md:text-sm lg:text-base font-medium mb-[10px]">
                Phone Numbers
              </p>
              <ul>
                <li>
                  <a
                    href="tel:+959250717166"
                    className="text-blue-100 sm:text-xs md:text-sm lg:text-base font-normal underline underline-offset-1 mr-2"
                  >
                    +959 250717166
                  </a>
                </li>

                <li>
                  <a
                    href="tel:+959250717167"
                    className="text-blue-100 sm:text-xs md:text-sm lg:text-base font-normal underline underline-offset-1 mr-2"
                  >
                    +959 250717167
                  </a>
                </li>

                <li>
                  <a
                    href="tel:+959250717168"
                    className="text-blue-100 sm:text-xs md:text-sm lg:text-base font-normal underline underline-offset-1 mr-2"
                  >
                    +959 250717168
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-4">
            <img src="img/email.png" alt="Email" className="w-auto h-5" />
            <div>
              <p className="text-gray-800 sm:text-xs md:text-sm lg:text-base font-medium mb-[10px]">
                Email
              </p>
              <a
                href={`mailto:${admissionEmail}`}
                className="text-blue-100 sm:text-xs md:text-sm lg:text-base font-normal underline underline-offset-1 mr-2"
              >
                {admissionEmail}
              </a>
              {/* <p className="text-blue-100 sm:text-xs md:text-sm lg:text-base font-normal underline underline-offset-1 mr-2">
              mba.admissions@strategyfirst.edu.mm,
            </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[50px]">
        <ProgramCard />
        <ProgramCard />
        <ProgramCard />
      </div> */}
    </>
  );
}

export default ContactInfo;
