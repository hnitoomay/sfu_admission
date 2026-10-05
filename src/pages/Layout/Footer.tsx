import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useTranslation } from "../../i18n/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 py-8 px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Column 1 */}
        <div>
          {/* First Row */}
          <div className="mb-4">
            <p className="text-white-50 inline-block mt-4 mr-4">
              {t("footer.description")}
            </p>
          </div>
          <br />
          {/* Second Row */}
          <div>
            <p className="text-white-100 font-semibold">
              <span className="bg-red-700 p-1">{t("footer.quickLink")}</span>
            </p>
            <a className="block text-white-100 mt-5">{t("footer.terms")}</a>
            <a className="block text-white-100 mt-4">{t("footer.privacy")}</a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <p className="text-white-100">
            <span className="bg-red-700 p-1 font-semibold">
              {t("footer.exploreUs")}
            </span>
          </p>
          <ul className="text-white-100">
            <a href="https://strategyfirst.edu.mm/" target="_blank" className="block mt-5">Strategy First International College</a>
            <a
              href="https://sfux.strategyfirst.edu.mm/"
              className="block mt-3"
              target="_blank"
              rel="noopener"
            >
              Strategy First Extension (SFUx)
            </a>
            <a
              href="https://gpis.strategyfirst.edu.mm/en"
              className="block mt-3"
              target="_blank"
              rel="noopener"
            >
              Global Pathway International School
            </a>
            <a
              href="https://strategyfirst.edu.mm/A-Link-Education-Consultancy"
              className="block mt-3 mb-5"
              target="_blank"
              rel="noopener"
            >
              A-Link Education Consultancy
            </a>
          </ul>

          <p className="text-white-100 mt-5">
            <span className="bg-red-700 p-1 font-semibold">
              {t("footer.contactUs")}
            </span>
          </p>
          <br />
          <div className="flex items-center space-x-2">
            <img src="/img/ph-icon.png" alt="Phone Icon" className="w-6" />
            <span className="text-white-100">{t("footer.phoneno1")}</span>
          </div>
          <p className="mx-8 mt-2 text-white-100">{t("footer.phoneno2")}</p>
          <div className="flex items-center space-x-2 mt-4">
            <img
              src="/img/mail1.png"
              alt="Mail Icon"
              className="w-5 h-[15.5px]"
            />
            <a
              href="mailto:info@strategyfirst.edu.mm"
              className="text-white-100"
            >
              {t("footer.emailUs")}
            </a>
          </div>
          <div className="flex items-center mt-5">
            <a
              href="https://www.facebook.com/StrategyFirstUniversity"
              className="text-white-100 hover:text-blue-500 transition-colors mx-2"
              target="_blank"
              rel="noopener"
            >
              <FacebookRoundedIcon />
            </a>
            <a
              href="https://twitter.com/SFU_MM"
              className="text-white-100 hover:text-blue-400 transition-colors mx-2"
              target="_blank"
              rel="noopener"
            >
              <XIcon />
            </a>
            <a
              href="https://www.instagram.com/sfu_strategyfirstuniversity/?hl=en"
              className="text-white-100 hover:text-red-600 transition-colors mx-2"
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://t.me/strategyfirstuniversity"
              className="text-white-100 hover:text-blue-400 transition-colors mx-2"
              target="_blank"
              rel="noopener"
            >
              <TelegramIcon />
            </a>
            <a
              href="https://www.linkedin.com/school/strategyfirstuniversity/"
              className="text-white-100 hover:text-blue-700 transition-colors mx-2"
              target="_blank"
              rel="noopener"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://www.youtube.com/@strategyfirstuniversity7738"
              className="text-white-100 hover:text-red-700 transition-colors mx-2"
              target="_blank"
              rel="noopener"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <p className="text-white-100">
            <span className="bg-red-700 p-1 font-semibold">
              {t("footer.locateUs")}
            </span>
          </p>
          <ul className="text-white-50">
            <li className="mt-5 font-bold">
              {t("footer.yangonTeachingCenter1")}
            </li>
            <li className="mt-2">
              {t("footer.yangonAddress1")}
            </li>

            <li className="mt-5 font-bold">
              {t("footer.yangonTeachingCentre2")}
            </li>
            <li className=" mt-2">
              {t("footer.yangonAddress2")}
            </li>

            <li className="mt-5 font-bold">
              {t("footer.yangonTeachingCentre3")}
            </li>
            <li className="mt-2">
              {t("footer.yangonAddress3")}
            </li>

            <li className="mt-5 font-bold">
              {t("footer.sfuPanchanTower")}
            </li>
            <li className="mt-2">
              {t("footer.panchanAddress")}
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <p className="text-white-100">
            <span className="p-1"></span>
          </p>
          <ul className="text-white-50">
            <li className="mt-5 font-bold">
              {t("footer.mandalayTeachingCentre1")}
            </li>
            <li className="mt-2">
              {t("footer.mandalayAddress1Prefix")}
              {t("footer.mandalayAddressSuffix")}
            </li>

            <li className="mt-5 font-bold">
              {t("footer.mandalayTeachingCentre2")}
            </li>
            <li className="mt-2">
              {t("footer.mandalayAddress2Prefix")}
              {t("footer.mandalayAddressSuffix")}
            </li>

            <li className="mt-5 font-bold">
              {t("footer.mandalayTeachingCentre3")}
            </li>
            <li className="mt-2">
              {t("footer.mandalayAddress3Prefix")}
              {t("footer.mandalayAddressSuffix")}
            </li>

            <li className="mt-5 font-bold">
              {t("footer.studentExperienceCentre")}
            </li>
            <li className="mt-2">
              {t("footer.studentExperienceAddress")}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
