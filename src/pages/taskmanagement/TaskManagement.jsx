import React, { useState } from "react";
import { Arrowdown, Dustbinicon, EditIcon, Uparrow } from "../../assets/export";
import EditTask from "../../components/Modal/EditTask";
import { GoPlus } from "react-icons/go";
import accordionData from "../../dummydata/todolistdata";
import DeleteBoat from "../../components/Modal/DeleteBoat";
import AddBoat from "../../components/Modal/AddBoat";
import EditBoat from "../../components/Modal/EditBoat";
import AddTask from "../../components/Modal/AddTask";
const TaskManagement = ({ isOpen }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [AddBoatOpen, setAddBoatOpen] = useState(false);
  const [EditOpen, setEditBoatOpen] = useState(false);
  const [addTask, setAddTaskOpen] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
console.log(selectedTask,"selectedTaskselectedTask")

  const [tab, setTabs] = useState("1");
  const toggleAccordion = (index) => {
    setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  const BoatData = [
    "Cabin Cruiser",
    "Yacht",
    "Yacht",
    "Center Console",
    "Cabin Cruiser",
    "Yacht",
    "Cabin Cruiser",
    "Yacht",
    "Sailboat",
  ];
  const handleEditClick = (boat) => {
    setSelectedBoat(boat);
    setEditBoatOpen(true);
  };
  const handleEditTask = (taskedit) => {
    setSelectedTask(taskedit);
    setModalOpen(true);
  };

  return (
    <div className="bg-[#0E1B31] rounded-[10px] p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[20px] font-[700]">To-Do-List</div>
          <p className="text-[13px] text-[#818181] mt-3 mb-3">
            Here’s a comprehensive list of tasks to keep you on track. Review
            and manage your daily responsibilities effortlessly.
          </p>
        </div>
        {tab === "1" ? (
          <button
            className="flex gap-2 w-[108px] h-[39px] text-center rounded-[8px] justify-center font-[700]  items-center bg-[#199BD1]"
            onClick={() => setAddTaskOpen(true)}
          >
            <GoPlus size={16} /> Add Task
          </button>
        ) : (
          <button
            className="flex gap-2 w-[108px] h-[39px] text-center rounded-[8px] justify-center font-[700]  items-center bg-[#199BD1]"
            onClick={() => setAddBoatOpen(true)}
          >
            <GoPlus size={16} /> Add Boat
          </button>
        )}
      </div>

      <div className="flex gap-x-2 mt-3">
        <button
          onClick={() => setTabs("1")}
          className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
            tab === "1"
              ? "bg-[#199BD1] text-white"
              : "bg-[#042742] text-[#199BD1]"
          }`}
        >
          Tasks
        </button>
        <button
          onClick={() => setTabs("2")}
          className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
            tab === "2"
              ? "bg-[#199BD1] text-white"
              : "bg-[#042742] text-[#199BD1]"
          }`}
        >
          Boats
        </button>
      </div>
      {tab === "1" &&
        accordionData?.map((item, index) => (
          <div key={item.id} className=" border-slate-200">
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full  flex bg-[#1A293D] rounded-[10px] p-4 mb-3 mt-3 justify-between items-center py-5 text-white"
            >
              <span className="text-[14px] font-[500]">
                {index + 1} . {item?.title}
              </span>

              {openAccordion === item?.id ? (
                <div className="flex gap-3 items-center">
                  <div onClick={()=>handleEditTask(item)}>
                    <img src={EditIcon} className="w-[24px] h-[24px]" alt="" />
                  </div>
                  <img
                    src={Arrowdown}
                    className="w-[18.5px] h-[18.5px]"
                    alt=""
                  />
                </div>
              ) : (
                <>
                  <img src={Uparrow} className="w-[18.5px] h-[18.5px]" alt="" />
                </>
              )}
            </button>
            <div
              className={`transition-all  duration-300 ease-in-out overflow-hidden mx-8 ${
                openAccordion === item?.id ? "max-h-[200px]" : "max-h-0"
              }`}
              style={{
                maxHeight: openAccordion === item?.id ? "200px" : "0",
              }}
            >
              {item?.content?.map((line, index) => (
                <li key={index} className="mb-2 text-[13px] font-[400]">
                  {line}
                </li>
              ))}
            </div>
          </div>
        ))}
      {tab === "2" && (
        <div>
          {BoatData?.map((item, index) => (
            <div className="flex justify-between p-3 bg-[#1A293D]  mt-3 h-[60px] rounded-[4px] items-center">
              <div className="text-[14px] font-[500]">
                {index + 1} . {item}
              </div>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setDeleteOpen(true)}
                  className="cursor-pointer"
                >
                  <img src={Dustbinicon} className="w-[22px] h-[22px]" alt="" />
                </div>
                <div
                  onClick={() => handleEditClick(item)}
                  className="cursor-pointer"
                >
                  <img
                    src={EditIcon}
                    className="w-[18.33px] h-[18.33px]"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <EditTask isOpen={isModalOpen} onClose={() => setModalOpen(false)}    taskedit={selectedTask} />
      <DeleteBoat isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)} />
      <AddBoat isOpen={AddBoatOpen} onClose={() => setAddBoatOpen(false)} />
      <EditBoat
        isOpen={EditOpen}
        onClose={() => setEditBoatOpen(false)}
        boat={selectedBoat}
      />
      <AddTask
        isOpen={addTask}
        onClose={() => setAddTaskOpen(false)}
     
      />
    </div>
  );
};

export default TaskManagement;
