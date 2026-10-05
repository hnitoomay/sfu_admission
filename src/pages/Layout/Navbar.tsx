import {
  Bars3Icon,
  CalendarDaysIcon,
  GlobeAltIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/form/Button";
import { useAuth } from "../../hooks/context/useAuth";
import { Dialog, Popover, Transition } from "@headlessui/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import LanguageToggle from "../../components/LanguageToggle";
import { languageLabels } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  const navigate = useNavigate();
  const { language, t, toggleLanguage } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const nextLanguage = language === "my" ? "en" : "my";

  // Auth Context
  const { user, logout } = useAuth();

  const location = useLocation();
  const previousRoute = location.pathname;

  const onClickBooking = () => {
    window.open(
      "https://outlook.office365.com/owa/calendar/StrategyFirstMBAMScProgamme@strategyfirst.edu.mm/bookings/",
      "_blank"
    );
    setIsMobileMenuOpen(false);
  };

  const onClickLogin = () => {
    setIsMobileMenuOpen(false);
    navigate("/login", {
      state: previousRoute,
    });
  };

  const onClickLogout = () => {
    setIsMobileMenuOpen(false);
    logout();
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white-100 sticky top-0 border-b border-gray-300 z-50">
      <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between md:h-16">
              <div className="flex flex-1 items-center justify-start md:items-stretch md:justify-start">
                <div
                  className="flex flex-shrink-0 items-center cursor-pointer"
                  onClick={() => navigate("/", { replace: true })}
                >
                  <img
                    src="/img/logo-update.png"
                    className="block sm:hidden md:block md:h-8 w-auto"
                    alt="Picture of the author"
                  />

                  <img
                    src="/img/logo-mobile.png"
                    className="block sm:block sm:h-8 md:hidden  w-auto"
                    alt="Picture of the author"
                  />
                </div>
              </div>

          <div className="ml-auto flex items-center min-[1025px]:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex items-center justify-center border-0 bg-transparent p-2 text-gray-900 hover:text-primary"
              aria-label={t("nav.openMainMenu")}
            >
              <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
            </button>
          </div>

              <div className="nav-actions hidden min-[1025px]:flex">
                <Button
                  primary
                  onClick={onClickBooking}
                  className="consultation-button py-2 md:w-auto"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-auto h-auto">
                      <img src="/img/booking.png" alt="Booking" />
                    </div>
                    <p className="text-white-100 font-medium">
                      {t("nav.bookConsultation")}
                    </p>
                  </div>
                </Button>

                {user == null ? (
                  <Button
                    primary
                    onClick={onClickLogin}
                    className="consultation-button py-2"
                  >
                    {t("nav.login")}
                  </Button>
                ) : (
                  <Popover className="relative">
                    {() => (
                      <>
                        <Popover.Button className="profile-trigger">
                          <AccountCircleIcon sx={{ width: 40, height: 40 }} />
                          <ChevronDownIcon
                            className="h-5 w-5 flex-none text-gray-400"
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute right-0 top-full z-10 mt-3 w-60 max-w-md overflow-hidden rounded-xl bg-border-50 shadow-lg ring-1 ring-gray-900/5">
                            <div>
                              <a
                                href="/profile"
                                className="group relative flex items-center gap-x-6 ml-4 rounded-lg p-4 text-sm text-gray-800 font-normal leading-6 hover:text-primary cursor-pointer"
                              >
                                <span>{t("nav.profile")}</span>
                              </a>
                              <hr />
                              {/* <a
                                href="/my-program"
                                className="group relative flex items-center gap-x-6 ml-4 rounded-lg p-4 text-sm text-gray-800 font-normal leading-6 hover:text-primary cursor-pointer"
                              >
                                <span>Vist Programme</span>
                              </a>
                              <hr /> */}
                              <div
                                onClick={logout}
                                className="group relative flex items-center gap-x-6 ml-4 rounded-lg p-4 text-sm text-gray-800 font-normal leading-6 hover:text-primary cursor-pointer"
                              >
                                <span>{t("nav.signOut")}</span>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                )}

                <LanguageToggle className="language-trigger" />
              </div>
            </div>
          </div>

      <Transition show={isMobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[60] min-[1025px]:hidden"
          onClose={setIsMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-[280ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-[250ms]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black-100/35" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-out duration-[280ms]"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in duration-[250ms]"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className="pointer-events-auto h-[100dvh] w-[88vw] max-w-[380px] bg-white-100 shadow-[-12px_0_36px_rgba(0,0,0,0.16)]"
                  >
                    <div className="flex h-full flex-col">
                      <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-5">
                        <img
                          src="/img/logo-update.png"
                          className="h-auto object-contain"
                          style={{ width: "min(190px, calc(100% - 64px))" }}
                          alt="Strategy First International College"
                        />
                        <button
                          type="button"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-gray-900 transition-colors hover:text-primary active:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                          aria-label="Close menu"
                        >
                          <XMarkIcon className="h-8 w-8 stroke-2" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="flex flex-col gap-5 px-5 py-7">
                        <button
                          type="button"
                          onClick={onClickBooking}
                          className="flex w-full items-center justify-center gap-3 rounded-xl border-0 bg-primary px-4 py-4 text-[clamp(14px,4vw,17px)] font-bold leading-none text-white-100 shadow-sm transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                        >
                          <CalendarDaysIcon className="h-6 w-6 shrink-0 stroke-2" aria-hidden="true" />
                          <span className="whitespace-nowrap">{t("nav.bookConsultation")}</span>
                        </button>

                        <div className="divide-y divide-gray-200 border-y border-gray-200">
                          <button
                            type="button"
                            onClick={() => {
                              toggleLanguage();
                              setIsMobileMenuOpen(false);
                            }}
                            className="group flex w-full items-center justify-between border-0 bg-transparent px-4 py-5 text-left text-lg font-bold text-gray-900 transition-colors hover:bg-primary/5 hover:text-primary active:bg-primary/10 active:text-primary focus:outline-none focus-visible:bg-primary/5 focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-primary/30"
                          >
                            <span className="flex min-w-0 items-center gap-4">
                              <GlobeAltIcon className="h-6 w-6 shrink-0 stroke-2 text-current" aria-hidden="true" />
                              <span className="whitespace-nowrap">{languageLabels[nextLanguage]}</span>
                            </span>
                            {/* <ChevronRightIcon className="h-6 w-6 shrink-0 stroke-2 text-current" aria-hidden="true" /> */}
                          </button>

                          <button
                            type="button"
                            onClick={user == null ? onClickLogin : onClickLogout}
                            className="group flex w-full items-center justify-between border-0 bg-transparent px-4 py-5 text-left text-lg font-bold text-gray-900 transition-colors hover:bg-primary/5 hover:text-primary active:bg-primary/10 active:text-primary focus:outline-none focus-visible:bg-primary/5 focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-primary/30"
                          >
                            <span className="flex min-w-0 items-center gap-4">
                              <UserIcon className="h-6 w-6 shrink-0 stroke-2 text-current" aria-hidden="true" />
                              <span className="whitespace-nowrap">
                                {user == null ? t("nav.login") : t("nav.signOut")}
                              </span>
                            </span>
                            {/* <ChevronRightIcon className="h-6 w-6 shrink-0 stroke-2 text-current" aria-hidden="true" /> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
}
