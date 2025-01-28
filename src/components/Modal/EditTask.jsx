import React, { useEffect, useState } from "react";
import { CancelIcon } from "../../assets/export";
import { GoPlus } from "react-icons/go";
import TextFields from "../onboarding/TextFields";
import CustomBtn from "../onboarding/CustomBtn";
import { ErrorToast, SuccessToast } from "../Toaster/Toaster";
import axios from "../../axios";

const EditTask = ({ isOpen, onClose, taskEdit, getTasks }) => {
  if (!isOpen) return null;

  const [taskName, setTaskName] = useState([]);
  const [taskType, setTaskType] = useState("");
  const [taskTypeError, setTaskTypeError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState("");

  useEffect(() => {
    if (taskEdit) {
      setTaskName(taskEdit?.task || []);
      setTaskType(taskEdit?.taskType || "");
    }
  }, [taskEdit]);

  const handleTaskTypeChange = (value) => {
    setTaskType(value);
  };

  const handleTaskChange = (value, index) => {
    const updatedTasks = [...taskName];
    updatedTasks[index] = value;
    setTaskName(updatedTasks);
  };

  const handleAddTask = () => {
    setTaskName([...taskName, ""]);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = taskName.filter((_, i) => i !== index);
    setTaskName(updatedTasks);
  };

  const handleSave = async () => {
    if (!taskType) {
      setTaskTypeError("Enter task type");
      return;
    }
    try {
      setSubmitLoading(true);
      let obj = {
        taskType: taskType,
        task: taskName,
      };
      const response = await axios.put(
        `/admin/management/task/${taskEdit?._id}`,
        obj
      );
      if (response.status === 200) {
        SuccessToast("Updated Successfully");
        getTasks();
        setSubmitLoading(false);
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

  return (
    <div className="fixed top-0 right-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-[#001229] rounded-lg w-[587px] max-h-[500px] p-6 shadow-lg">
        <div className="flex justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-white text-start">
              Edit Task
            </h2>
            <p className="text-[13px] mt-2 text-[#D9D9D9] font-[400]">
              Make changes to your tasks below. Update the fields as needed and
              save your changes.
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
          <div className="text-[13px] mt-2 mb-3">Task Type</div>
          <TextFields
            className="w-full"
            placeholder="Routine Inspection"
            state={taskType}
            setState={setTaskType}
          />
          {taskTypeError && (
            <p className="text-xs text-red-600">{taskTypeError}</p>
          )}

          <div className="text-[13px] mt-4">Tasks</div>
          <div className="mt-2 mb-3 overflow-y-auto max-h-[200px]">
            {taskName.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <TextFields
                  className="w-full"
                  placeholder="Enter task details"
                  state={item}
                  setState={(e) => handleTaskChange(e, index)}
                />

                <button onClick={() => handleRemoveTask(index)}>
                  <img src={CancelIcon} className="w-[20px]" alt="" />
                </button>
              </div>
            ))}
          </div>

          <div
            onClick={handleAddTask}
            className="flex items-center justify-end gap-1 cursor-pointer text-[#199BD1] text-[13px] font-medium"
          >
            <GoPlus size={16} />
            <span>Add more task</span>
          </div>

          <div className="mt-5">
            <CustomBtn
              text="Save"
              handleClick={handleSave}
              loading={submitLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
