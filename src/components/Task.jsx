import { DropDown } from "./Dropdown";

export const Task = ({ task, i }) => {
  const taskState = localStorage.getItem(`taskState${task}`);
  if (taskState === "Done") {
    return (
      <>
        <div className=" justify-content-center align-items-center">
          <div className="p-5 align-items-center justify-content-between text-center w-full border-2 bg-green my-3">
            <p className="text-2xl m-3" key={i}>
              {task}
            </p>
            <DropDown task={task} />
          </div>
        </div>
      </>
    );
  } else if (taskState === "Not Started") {
    return (
        <>
        <div className=" justify-content-center align-items-center">
          <div className="p-5 align-items-center justify-content-between text-center w-full border-2 bg-red my-3">
            <p className="text-2xl m-3" key={i}>
              {task}
            </p>
            <DropDown task={task} />
          </div>
        </div>
      </>
    );
  } else if (taskState === "In Progress") {
    return (
      <>
        <div className="p-5 align-items-center justify-content-between text-center w-full border-2 bg-yellow my-3">
          <p className="text-2xl m-3" key={i}>
            {task}
          </p>
          <DropDown task={task} />
        </div>
      </>
    );
  }
};
