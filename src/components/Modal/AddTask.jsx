import React, { useState } from "react";
import { CancelIcon, Dustbinicon } from "../../assets/export";
import TextFields from "../onboarding/TextFields";
import CustomBtn from "../onboarding/CustomBtn";
import { GoPlus } from "react-icons/go";

const AddTask = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState([{ id: 1, text: "" }]);

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      text: "",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleRemoveTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleTaskChange = (id, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: value } : task
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#001229] rounded-lg w-[587px] p-6 shadow-lg">
        <div className="flex justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-white text-start">
              Add Task
            </h2>
            <p className="text-[13px] mt-2 text-[#D9D9D9] font-[400]">
              Add any additional task here to include them in the To-Do-List for
              your employees.
            </p>
          </div>
          <div>
            <img
              src={CancelIcon}
              className="w-[30px] h-[30px] cursor-pointer"
              alt="Close"
              onClick={onClose}
            />
          </div>
        </div>
        <div className="mt-4">
          <TextFields
            text={`Task Type`}
            className="w-full"
            placeholder="Enter task details"
          />
          <div className="mt-4">
            {tasks?.map((task, index) => (
              <div key={task?.id} className="flex flex-col gap-2 mb-3">
                <TextFields
                  text={`Task`}
                  className="w-full"
                  placeholder="Enter task"
                  value={task.text}
                  onChange={(e) => handleTaskChange(task?.id, e.target.value)}
                />
                <div className="flex items-center justify-end gap-4">
                  {tasks?.length > 1 && (
                    <div
                      className="text-[#F44237] flex items-center gap-2 cursor-pointer"
                      onClick={() => handleRemoveTask(task?.id)}
                    >
                      <img
                        src={Dustbinicon}
                        className="w-[9px] h-[10px]"
                        alt=""
                      />
                      Delete
                    </div>
                  )}

                  {index === tasks?.length - 1 && (
                    <div
                      className="text-[#199BD1] flex items-center gap-1 cursor-pointer"
                      onClick={handleAddTask}
                    >
                    <GoPlus />  Add more task
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <CustomBtn text="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
