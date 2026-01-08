import React, { useState, useRef, useEffect } from "react";
import {
  PlaceOptions,
  DestinationOptions,
  DayOptions,
} from "../../data/options";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsFilter } from "../../redux/slices/productSlice";

const selectTour = [
  { id: 1, text: "Tour Trong Nước" },
  { id: 2, text: "Tour Ngoài Nước" },
];

function LocationIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
        stroke="#0A3F7E"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="3" stroke="#0A3F7E" strokeWidth="2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="#0A3F7E"
        strokeWidth="2"
      />
      <path d="M3 9h18" stroke="#0A3F7E" strokeWidth="2" />
      <path d="M8 3v4M16 3v4" stroke="#0A3F7E" strokeWidth="2" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 7h11l-3-3M17 17H6l3 3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const FilterHome = ({setHasFiltered}) => {
  const dispatch = useDispatch();
  const [filterHome, setFilterHome] = useState({
    idTour: selectTour[0].id,
    departure: "",
    destination: "",
    date: null,
    duration: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);
  const [isOpenFourth, setIsOpenFourth] = useState(false);

  const destinationRef = useRef(null);
  const departureRef = useRef(null);
  const dateRef = useRef(null);
  const durationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target) &&
        departureRef.current &&
        !departureRef.current.contains(event.target) &&
        dateRef.current &&
        !dateRef.current.contains(event.target) &&
        durationRef.current &&
        !durationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setIsOpenSecond(false);
        setIsOpenThird(false);
        setIsOpenFourth(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const secondToggleDropdown = () => setIsOpenSecond(!isOpenSecond);

  const handleFilter = () => {
    setHasFiltered(true)
    dispatch(fetchProductsFilter(filterHome));
  };

  return (
    <div className="mx-4 mt-[40px] md:mx-10 lg:mx-20 md:-mt-[40px] bg-[#0A3F7E] py-6 select-none relative z-60">
      <div className="px-4 md:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-6 md:gap-8 text-white mb-5">
          {selectTour.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setFilterHome({ ...filterHome, idTour: item.id })}
            >
              <span className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                <span
                  className={`${
                    filterHome.idTour === item.id
                      ? "w-2 h-2 bg-white rounded-full"
                      : ""
                  }`}
                />
              </span>
              <span className="text-base font-medium">{item.text}</span>
            </label>
          ))}
        </div>

        {/* Search Box */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          {/* Điểm đi */}
          <div
            ref={departureRef}
            className="relative flex items-center gap-3 bg-white px-4 py-3 w-full md:w-[350px]"
            onClick={toggleDropdown}
          >
            <LocationIcon />
            <div>
              <p className="text-xs text-[#0A3F7E] font-semibold">Điểm đi</p>
              <p className="text-sm text-gray-400">
                {filterHome.departure || "Chọn điểm đi"}
              </p>
            </div>

            <div
              className={`absolute top-14 left-0 w-full bg-white border shadow-lg z-10 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <div className="p-3 font-medium cursor-default">Chọn điểm đi</div>
              {DestinationOptions?.map((option) => (
                <div
                  key={option}
                  className={`p-3 cursor-pointer ${
                    filterHome.departure === option
                      ? "bg-[#013879] text-white"
                      : "text-[#013879] hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setFilterHome({ ...filterHome, departure: option })
                  }
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          {/* Swap */}
          <div className="hidden lg:flex items-center justify-center text-white">
            <SwapIcon />
          </div>

          {/* Điểm đến */}
          <div
            ref={destinationRef}
            className="relative flex items-center gap-3 bg-white px-4 py-3 w-full md:w-[350px]"
            onClick={secondToggleDropdown}
          >
            <LocationIcon />
            <div>
              <p className="text-xs text-[#0A3F7E] font-semibold">Điểm đến</p>
              <p className="text-sm text-gray-400">
                {filterHome.destination || "Chọn điểm đến"}
              </p>
            </div>

            <div
              className={`absolute top-14 left-0 w-full bg-white border shadow-lg z-10 max-h-[300px] overflow-y-auto ${
                isOpenSecond ? "block" : "hidden"
              }`}
            >
              <div className="p-3 font-medium cursor-default">
                Chọn điểm đến
              </div>
              {PlaceOptions?.map((option) => (
                <div
                  key={option}
                  className={`p-3 cursor-pointer ${
                    filterHome.destination === option
                      ? "bg-[#013879] text-white"
                      : "text-[#013879] hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setFilterHome({ ...filterHome, destination: option })
                  }
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          {/* Ngày đi */}
          <div
            ref={dateRef}
            className="relative bg-white px-4 py-3 w-full md:w-[280px]"
          >
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsOpenThird(true)}
            >
              <CalendarIcon />
              <div>
                <p className="text-xs text-[#0A3F7E] font-semibold">Ngày đi</p>
                <p className="text-sm text-gray-400">
                  {filterHome.date
                    ? filterHome.date.toLocaleDateString("vi-VN")
                    : "Chọn ngày đi"}
                </p>
              </div>
            </div>

            {isOpenThird && (
              <div
                className="absolute top-14 left-0 bg-white border shadow-lg z-10 h-[315px]"
                onClick={(e) => e.stopPropagation()}
              >
                <DatePicker
                  selected={filterHome.date}
                  onChange={(date) => {
                    setFilterHome((prev) => ({ ...prev, date }));
                    setIsOpenThird(false);
                  }}
                  inline
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  minDate={new Date()} // CHẶN NGÀY QUÁ KHỨ
                />
              </div>
            )}
          </div>

          {/* Số ngày */}
          <div
            ref={durationRef}
            className="relative flex items-center gap-3 bg-white px-4 py-3 w-full md:w-[220px]"
            onClick={() => setIsOpenFourth(!isOpenFourth)}
          >
            <CalendarIcon />
            <div>
              <p className="text-xs text-[#0A3F7E] font-semibold">Số ngày</p>
              <p className="text-sm text-gray-400">
                {filterHome.duration || "Tất cả"}
              </p>
            </div>

            <div
              className={`absolute top-14 left-0 w-full bg-white border shadow-lg z-10 ${
                isOpenFourth ? "block" : "hidden"
              }`}
            >
              <div className="p-3 font-medium cursor-default">Chọn số ngày</div>
              {DayOptions?.map((option) => (
                <div
                  key={option.id}
                  className={`p-3 cursor-pointer ${
                    filterHome.duration === option.text
                      ? "bg-[#013879] text-white"
                      : "text-[#013879] hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setFilterHome({
                      ...filterHome,
                      duration: option.text,
                    })
                  }
                >
                  {option.text}
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <button
            className="bg-[#E11D2E] w-full lg:w-14 h-14 flex items-center justify-center hover:brightness-110 transition"
            onClick={handleFilter}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterHome;
