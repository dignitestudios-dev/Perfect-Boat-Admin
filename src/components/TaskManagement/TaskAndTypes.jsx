import React, { useState } from "react";
import { Arrowdown, Dustbinicon, EditIcon, Uparrow } from "../../assets/export";
import EditTask from "../Modal/EditTask";
import DeleteBoat from "../Modal/DeleteBoat";
import DeleteTask from "../Modal/DeleteTask";

const TaskAndTypes = ({
  taskData,
  openAccordion,
  toggleAccordion,
  getTasks,
}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const handleEditTask = (taskedit) => {
    setSelectedTask(taskedit);
    setModalOpen(true);
  };

  return (
    <div>
      {taskData?.map((item, index) => (
        <div key={index} className=" border-slate-200">
          <button
            onClick={() => toggleAccordion(item?._id)}
            className="w-full  flex bg-[#1A293D] rounded-[10px] p-4 mb-3 mt-3 justify-between items-center py-5 text-white"
          >
            <span className="text-[14px] font-[500]">
              {index + 1} . {item?.taskType}
            </span>

            {openAccordion === item?._id ? (
              <div className="flex gap-3 items-center">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setDeleteOpen(true);
                    setDeleteId(item?._id);
                  }}
                >
                  <img src={Dustbinicon} className="w-[22px] h-[22px]" alt="" />
                </div>
                <div onClick={() => handleEditTask(item)}>
                  <img src={EditIcon} className="w-[24px] h-[24px]" alt="" />
                </div>
                <img src={Arrowdown} className="w-[18.5px] h-[18.5px]" alt="" />
              </div>
            ) : (
              <>
                <img src={Uparrow} className="w-[18.5px] h-[18.5px]" alt="" />
              </>
            )}
          </button>
          <div
            className={`transition-all  duration-300 ease-in-out overflow-y-auto mx-8 ${
              openAccordion === item?._id ? "max-h-[200px]" : "max-h-0"
            }`}
            style={{
              maxHeight: openAccordion === item?._id ? "200px" : "0",
            }}
          >
            {item?.task?.map((line, index) => (
              <li key={index} className="mb-2 text-[13px] font-[400]">
                {line}
              </li>
            ))}
          </div>
        </div>
      ))}
      <DeleteTask
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        getTasks={getTasks}
        id={deleteId}
      />
      <EditTask
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        taskEdit={selectedTask}
        getTasks={getTasks}
      />
    </div>
  );
};

export default TaskAndTypes;
