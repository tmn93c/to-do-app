import { useEffect } from "react";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import useTrelloStore from "../store";

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

interface IFormInput {
  title: string;
  description: string;
  dueDate: string;
}
const forms = {
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
const AddTaskForm = ({ darkTheme }: any) => {
  const addTask = useTrelloStore((state) => state.addTask);

  const {
    register,
    watch,
    formState: { defaultValues, errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: any) => {
    addTask(data.title, data.description, data.dueDate);
  };

  return (
    <div
      className={` ${
        darkTheme ? "bg-gray-800" : "bg-white"
      } w-full items-center  rounded-lg p-4`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("description", forms.description.valid)}
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
          <input
            type="submit"
            className="px-4 py-2 mt-4 border"
            placeholder="Add"
          />
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
