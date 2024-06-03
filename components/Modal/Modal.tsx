'use client';
import { Fragment } from 'react';
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useModal from './hooks';
import { ModalProps } from './types';

export default function Modal({
  open = false,
  setOpen,
  date = '',
  id = '',
  addEvent,
  editEvent,
}: ModalProps) {
  const {
    eventEmail,
    eventTitle,
    eventTime,
    setEventColor,
    setEventEmail,
    setEventTitle,
    setEventTime,
  } = useModal({ id, date });

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={open}
        onClose={() => {
          setEventTitle('');
          setEventColor('');
          setEventEmail('');
          setEventTime('');
          setOpen(false);
        }}
      >
        <div className="flex items-center justify-center min-h-[100px] min-w-full">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[40vw] sm:w-full sm:p-6">
              <div className="mx-auto">
                <div>
                  <DialogTitle
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {id === '' ? 'Add Event' : 'Edit Event'}
                  </DialogTitle>
                  <form action="submit" className="flex flex-col gap-y-1 pt-4">
                    <div className="flex items-center">
                      <label htmlFor="eventName" className="mr-2 w-1/3">
                        Event Name:
                      </label>
                      <input
                        type="text"
                        id="eventName"
                        className="w-full border-[1px] rounded-md px-2 py-1"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center w-full">
                      <label htmlFor="eventTime" className="mr-2 w-1/3">
                        Time:
                      </label>
                      <input
                        type="time"
                        id="eventTime"
                        className="w-full border-[1px] rounded-md px-2 py-1"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="eventEmail" className="mr-2 w-1/3">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="eventEmail"
                        className="w-full border-[1px] rounded-md px-2 py-1"
                        value={eventEmail}
                        onChange={(e) => setEventEmail(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border  shadow-sm px-4 py-2 bg-secondary text-base font-medium hover:ring-accent hover:outline-none hover:ring-1 focus:outline-none sm:text-sm"
                  onClick={() =>
                    id === ''
                      ? addEvent(eventTitle, eventTime, eventEmail, date)
                      : editEvent(eventTitle, eventTime, eventEmail, date, id)
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
