import React from "react";

const items = ["Apple", "Orange", "Banana"];

const SelectMenu = () => {
  return (
    <div className="border bg-neutral-700 rounded-lg select-none">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className="px-2 py-1 hover:bg-neutral-800 transition-colors duration-150 ease-in-out"
          >
            {item}
          </div>
        );
      })}
      <div className="w-full p-2 bg-neutral-800 rounded-b-lg">
        Select a favorite fruit...
      </div>
    </div>
  );
};

export default SelectMenu;
