import React from "react";
import { useDispatch } from "react-redux";
import SelectRadio from "../SelectRadio/SelectRadio";
import SelectBox from "../SelectBox/SelectBox";
import { tourOptions, DestinationOptions } from "../../data/options";

const Filter = ({ handleFilterRadio, departure, destination, options }) => {
  const handleRadio = (id) => {
    handleFilterRadio(id);
  };

  return (
    <div
      className="
        bg-gray-100 
        w-full md:w-[90%] 
        h-auto 
        px-4 md:px-6 
        py-6 md:py-8 
        flex flex-col 
        space-y-4
      "
    >
      <SelectRadio tourOptions={tourOptions} handleFilterRadio={handleRadio} />
      <SelectBox
        title={"Điểm đi"}
        title2={"Điểm điểm đi"}
        options={DestinationOptions}
        departure={departure}
      />
      <SelectBox
        title={"Điểm đến"}
        title2={"Điểm điểm đến"}
        options={options}
        destination={destination}
      />
    </div>
  );
};

export default Filter;
