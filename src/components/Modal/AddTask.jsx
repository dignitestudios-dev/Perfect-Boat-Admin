import React, { useEffect, useState } from "react";
import { CancelIcon, Dustbinicon } from "../../assets/export";
import TextFields from "../onboarding/TextFields";
import CustomBtn from "../onboarding/CustomBtn";
import { GoPlus } from "react-icons/go";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../Toaster/Toaster";

const AddTask = ({ isOpen, onClose, getTasks }) => {
  const [taskType, setTaskType] = useState("");
  const [taskTypeError, setTaskTypeError] = useState(null);

  const [tasks, setTasks] = useState([{ id: 1, text: "" }]);
  console.log("🚀 ~ AddTask ~ tasks:", tasks);
  // console.log("🚀 ~ AddTask ~ tasks:", tasks);
  const [submitLoading, setSubmitLoading] = useState("");

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      text: "",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleRemoveTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task, index) => index !== id));
  };

  const handleTaskChange = (value, id) => {
    const updatedTasks = [...tasks];
    updatedTasks[id] = value;
    setTasks(updatedTasks);
  };

  const handleSave = async () => {
    try {
      if (!taskType) {
        setTaskTypeError("Enter task type");
        return;
      }
      setSubmitLoading(true);
      let obj = {
        taskType: taskType,
        task: tasks,
      };
      const response = await axios.post(`/admin/management/task`, obj);
      if (response.status === 200) {
        SuccessToast("Updated Successfully");
        getTasks();
        setSubmitLoading(false);
        setTaskType("");
        setTasks([{ id: 1, text: "" }]);
        onClose();
      }
    } catch (err) {
      console.log("🚀 ~ handleSave ~ err:", err);
      ErrorToast(err.response.data.message);
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    setTaskTypeError(null);
  }, [taskType]);

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
            text={`Task Type `}
            className="w-full"
            placeholder="Enter task details"
            state={taskType}
            setState={setTaskType}
          />
          {taskTypeError && (
            <p className="text-xs text-red-600 pt-1 pl-1">{taskTypeError}</p>
          )}
          <div className="mt-4 overflow-y-auto max-h-[260px]">
            {tasks?.map((task, index) => (
              <div key={index} className="flex flex-col gap-2 mb-3">
                <TextFields
                  text={`Task ${index + 1}`}
                  className="w-full"
                  placeholder="Enter task"
                  state={task.text}
                  setState={(e) => handleTaskChange(e, index)}
                />
                <div className="flex items-center justify-end gap-4">
                  {tasks?.length > 1 && (
                    <div
                      className="text-[#F44237] flex items-center gap-2 cursor-pointer"
                      onClick={() => handleRemoveTask(index)}
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
                      <GoPlus /> Add more task
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <CustomBtn
              text="Add"
              handleClick={handleSave}
              loading={submitLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
