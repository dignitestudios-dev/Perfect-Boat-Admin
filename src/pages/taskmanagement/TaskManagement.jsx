import React, { useEffect, useState } from "react";
import { Arrowdown, Dustbinicon, EditIcon, Uparrow } from "../../assets/export";
import EditTask from "../../components/Modal/EditTask";
import { GoPlus } from "react-icons/go";
import accordionData from "../../dummydata/todolistdata";
import DeleteBoat from "../../components/Modal/DeleteBoat";
import AddBoat from "../../components/Modal/AddBoat";
import EditBoat from "../../components/Modal/EditBoat";
import AddTask from "../../components/Modal/AddTask";
import axios from "../../axios";
import TaskAndTypes from "../../components/TaskManagement/TaskAndTypes";
import BoatsAndTypes from "../../components/TaskManagement/BoatsAndTypes";
import TaskLoader from "../../components/global/TaskLoader";

const TaskManagement = ({ isOpen }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [AddBoatOpen, setAddBoatOpen] = useState(false);
  const [addTask, setAddTaskOpen] = useState(false);

  const [tab, setTabs] = useState("tasks");
  const toggleAccordion = (index) => {
    setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  const [taskData, setTaskData] = useState([]);
  const [boatData, setBoatData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    try {
      setLoading(true);
      if (tab == "tasks") {
        console.log("if call");
        const { data } = await axios.get("/admin/management/task");
        if (data.success === true) {
          setTaskData(data?.data);
        }
      } else {
        console.log("else call");
        const { data } = await axios.get(`/admin/management/boat`);
        if (data.success === true) {
          setBoatData(data?.data);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, [tab]);

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
        {tab === "tasks" ? (
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
          onClick={() => setTabs("tasks")}
          className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
            tab === "tasks"
              ? "bg-[#199BD1] text-white"
              : "bg-[#042742] text-[#199BD1]"
          }`}
        >
          Tasks
        </button>
        <button
          onClick={() => setTabs("boats")}
          className={`w-[76px] h-[35px] rounded-full text-[11px] font-semibold ${
            tab === "boats"
              ? "bg-[#199BD1] text-white"
              : "bg-[#042742] text-[#199BD1]"
          }`}
        >
          Boats
        </button>
      </div>
      {tab === "tasks" && (
        <>
          {loading ? (
            <>
              <TaskLoader />
            </>
          ) : (
            <TaskAndTypes
              taskData={taskData}
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
              toggleAccordion={toggleAccordion}
              getTasks={getTasks}
            />
          )}
        </>
      )}
      {tab === "boats" && (
        <>
          {loading ? (
            <>
              <TaskLoader />
            </>
          ) : (
            <BoatsAndTypes boatData={boatData} getTasks={getTasks} />
          )}
        </>
      )}
      <AddBoat
        isOpen={AddBoatOpen}
        onClose={() => setAddBoatOpen(false)}
        getTasks={getTasks}
      />
      <AddTask
        isOpen={addTask}
        onClose={() => setAddTaskOpen(false)}
        getTasks={getTasks}
      />
    </div>
  );
};

export default TaskManagement;
