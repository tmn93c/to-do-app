import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import useTrelloStore, { TaskItem } from "./../store";

export const getErrorMessage = (
  field: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
) => {
  let errorMessage;
  if (field?.type === "required") {
    errorMessage = "This is required";
  }
  if (field?.type === "pattern") {
    errorMessage = "Please check format of field !";
  }
  if (field?.type === "maxLength") {
    errorMessage = "Please check length value !. It's too max";
  }
  if (field?.type === "minLength") {
    errorMessage = "Please check length value !. It's too min";
  }
  return <div className="text-red-700 flex">{errorMessage}</div>;
};

const forms = {
  id: {
    valid: { required: true, minLength: 1 },
  },
  title: {
    valid: { required: true, maxLength: 80, minLength: 3 },
  },
  description: {
    valid: { required: true, maxLength: 1000, minLength: 3 },
  },
  dueDate: {
    valid: { required: true, maxLength: 10, minLength: 10 },
  },
};
export default function EditTaskForm() {
  const open = useTrelloStore((state) => state.openModal);
  const changeOpenModal = useTrelloStore((state) => state.changeOpenModal);
  const openTask = useTrelloStore((state) => state.openTask) as TaskItem;
  const editTask = useTrelloStore((state) => state.editTask);

  const cancelButtonRef = useRef(null);

  const {
    register,
    watch,
    formState: { defaultValues, errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: any) => {
    editTask(data as TaskItem);
  };

  useEffect(() => {
    setValue("id", openTask.id);
    setValue("title", openTask.title);
    setValue("description", openTask.description);
    setValue("dueDate", openTask.dueDate);
  }, [openTask, setValue]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 w-250"
        initialFocus={cancelButtonRef}
        onClose={changeOpenModal}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-[400px]">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <MdClose
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Edit Task
                      </Dialog.Title>
                      <div className="mt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <input
                            id="id"
                            className="hidden"
                            type="text"
                            {...register("id")}
                          />
                          <div>
                            <div className="flex">
                              <label
                                htmlFor="title"
                                className="block text-gray-700 text-sm font-bold mb-2"
                              >
                                Title
                              </label>
                            </div>
                            <input
                              id="title"
                              className="w-full border-[1.5px] border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-one active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-one"
                              type="text"
                              {...register("title", forms.title.valid)}
                            />
                            {getErrorMessage(errors.title)}
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between">
                              <label
                                htmlFor="description"
                                className="block text-gray-700 text-sm font-bold mb-2"
                              >
                                Description
                              </label>
                            </div>
                            <input
                              id="title"
                              className="w-full border-[1.5px] border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-one active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-one"
                              type="text"
                              {...register(
                                "description",
                                forms.description.valid
                              )}
                            />
                            {getErrorMessage(errors.description)}
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between">
                              <label
                                htmlFor="dueDate"
                                className="block text-gray-700 text-sm font-bold mb-2"
                              >
                                DueDate
                              </label>
                            </div>
                            <input
                              id="dueDate"
                              className="w-full border-[1.5px] border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-one active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-one"
                              type="date"
                              {...register("dueDate", forms.dueDate.valid)}
                            />
                            {getErrorMessage(errors.dueDate)}
                          </div>
                          <div className="flex align-middle">
                            <div className="py-3 sm:flex sm:flex-row-reverse sm:px-6 w-full">
                              <input
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                onClick={() => changeOpenModal(false)}
                                placeholder="Add"
                              />
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => changeOpenModal(false)}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
