import React from "react";
import { useDispatch } from "react-redux";
import SelectRadio from "../SelectRadio/SelectRadio";
import SelectBox from "../SelectBox/SelectBox";
import { tourOptions, DestinationOptions, PlaceOptions } from "../../data/options";

const Filter = ({handleFilterRadio}) => {

  const handleRadio = (id) => {
    handleFilterRadio(id)
  }

  return (
    <div className="bg-gray-100 w-[90%] h-auto px-6 py-8 flex flex-col space-y-4">
      <SelectRadio tourOptions={tourOptions} handleFilterRadio={handleRadio}/>
      <SelectBox title={"Điểm đi"} title2={"Điểm điểm đi"} options={DestinationOptions}/>
      <SelectBox title={"Điểm đến"} title2={"Điểm điểm đến"} options={PlaceOptions}/>
      <button className="button text-white">Lọc</button>
    </div>
  );
};

export default Filter;
