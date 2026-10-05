import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ModalDialog({
  title,
  bodyText,
  btnLeft,
  btnRight,
  onClose,
  preformatted,
}: {
  title: string;
  bodyText: string;
  btnLeft?: {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };
  btnRight?: {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };
  onClose: (value: boolean) => void;
  preformatted?: boolean;
}) {
  const completeButtonRef = useRef(null);
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={onClose}
          initialFocus={completeButtonRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white-50 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white-50 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex space-x-8">
                    <div className="min-w-12">
                      <img src="/img/alert.png" alt="Alert" />
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-4 ">
                        {preformatted ? (
                          <pre className="text-sm text-gray-800">
                            {bodyText}
                          </pre>
                        ) : (
                          <p className="text-sm text-gray-800">{bodyText}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex space-x-6 mt-5 justify-end"
                  >
                    {btnLeft && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={btnLeft.onClick}
                      >
                        {btnLeft.title}
                      </button>
                    )}
                    <button
                      ref={completeButtonRef}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white-50 hover:bg-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={btnRight?.onClick}
                    >
                      {btnRight?.title}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
