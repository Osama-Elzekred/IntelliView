"use client";
import React from "react";

function CheckComp({ isSelected, onSelect }) {
  return (
    <div
      className={`w-[20px] h-[20px] rounded-[6px] border flex items-center justify-center cursor-pointer ${
        isSelected
          ? "border-[#fff] bg-[#17a9c3]"
          : "border-[#d0d5dd] bg-transparent"
      }`}
      onClick={onSelect}
      style={{ borderWidth: "1px" }}
    >
      {isSelected && <span className="text-[#fff] fa fa-check"></span>}
    </div>
  );
}

function StoryComponent() {
  const [isSelectedState, setIsSelectedState] = React.useState(false);
  const toggleSelect = () => setIsSelectedState(!isSelectedState);

  return (
    <div className="space-x-4 flex">
      <CheckComp onSelect={toggleSelect} isSelected={isSelectedState} />
      <CheckComp onSelect={toggleSelect} isSelected={!isSelectedState} />
    </div>
  );
}

export default CheckComp;