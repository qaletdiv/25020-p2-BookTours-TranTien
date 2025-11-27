import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faLocationDot,
  faJetFighter,
} from "@fortawesome/free-solid-svg-icons";
import Sortof from "../Sortof/Sortof";

const TourCategory = ({ title, data }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
      <h2 className="my-10 text-4xl font-bold text-[#013879] text-center">
        {title}
      </h2>
      <Sortof />
      </div>
      <div className="grid grid-cols-none sm:grid-cols-3 justify-items-stretch items-start gap-x-4 gap-y-12">
        {data && data.length > 0
          ? data.map((tour) => (
              <div key={tour.id} className="leading-6">
                <div className="h-[219.23px] overflow-hidden">
                  <img
                    src={tour.images[0]}
                    alt="hinh-tour "
                    className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <p className="text-sm mt-2">Thời lượng: {tour.duration}</p>
                <p className="text-lg font-semibold leading-5 my-2">
                  {tour.name}
                </p>
                <p className="text-sm">
                  <FontAwesomeIcon icon={faTicket} className="text-sm" /> Mã
                  tour: <span className="font-semibold">BUITRANTIEN</span>
                </p>
                <p className="text-sm">
                  <FontAwesomeIcon icon={faLocationDot} className="text-sm" />{" "}
                  Nơi khởi hành:{" "}
                  <span className="font-semibold">{tour.departure}</span>
                </p>
                <p className="text-sm">
                  <FontAwesomeIcon icon={faJetFighter} className="text-sm" />{" "}
                  Hãng bay: <span className="font-semibold">Vietjet Air</span>
                </p>
                <p className="text-red-500 text-xl font-semibold">
                  {tour.price.toLocaleString("vi-VN")}
                  <span className="text-sm">VNĐ</span>
                </p>
              </div>
            ))
          : "Không Có Tour Nào Hiện Nay"}
      </div>
    </div>
  );
};

export default TourCategory;
