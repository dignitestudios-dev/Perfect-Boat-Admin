import React, { useState } from "react";
import { Arrowdown, Dustbinicon, EditIcon, Uparrow } from "../../assets/export";
import EditBoat from "../Modal/EditBoat";
import DeleteBoat from "../Modal/DeleteBoat";

const BoatsAndTypes = ({ boatData, getTasks }) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [EditOpen, setEditBoatOpen] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [deleteId, setDeleteId] = useState("");

  const handleEditClick = (boat) => {
    setSelectedBoat(boat);
    setEditBoatOpen(true);
  };

  return (
    <div>
      {boatData?.map((item, index) => (
        <div className="flex justify-between p-3 bg-[#1A293D]  mt-3 h-[60px] rounded-[4px] items-center">
          <div className="text-[14px] font-[500]">
            {index + 1} . {item?.boatType}
          </div>
          <div className="flex items-center gap-4">
            <div
              onClick={() => {
                setDeleteOpen(true);
                setDeleteId(item?._id);
              }}
              className="cursor-pointer"
            >
              <img src={Dustbinicon} className="w-[22px] h-[22px]" alt="" />
            </div>
            <div
              onClick={() => handleEditClick(item)}
              className="cursor-pointer"
            >
              <img src={EditIcon} className="w-[18.33px] h-[18.33px]" alt="" />
            </div>
          </div>
        </div>
      ))}
      <EditBoat
        isOpen={EditOpen}
        onClose={() => setEditBoatOpen(false)}
        boat={selectedBoat}
        getTasks={getTasks}
      />
      <DeleteBoat
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        getTasks={getTasks}
        id={deleteId}
      />
    </div>
  );
};

export default BoatsAndTypes;
