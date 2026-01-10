import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck, faWallet } from "@fortawesome/free-solid-svg-icons";
import Address from "../Address/Address";

const PayList = [
  { id: 1, text: "Thanh toán tại văn phòng Lửa Việt", icon: faMoneyCheck },
  { id: 2, text: "Chuyển khoản online", icon: faWallet },
];

const Payment = ({ selectedPayment, setSelectedPayment }) => {

  const handleChange = (option) => {
    setSelectedPayment(option);
  };

  return (
    <div>
      <h2 className="text-2xl my-5 font-bold">Phương Thức Thanh Toán</h2>
      <div>
        {PayList.map((option) => (
          <div
            key={option.id}
            className="
              flex flex-col justify-start items-start 
              w-full space-y-3 mb-3
            "
          >
            <label
              className="
                flex items-start sm:items-center 
                space-x-4 
                cursor-pointer select-none w-full
              "
            >
              <div>
                {/* Input Radio - Dùng hidden */}
                <input
                  type="radio"
                  name="radio"
                  value={option.id}
                  checked={selectedPayment?.id === option.id}
                  onChange={() => handleChange(option)}
                  className="hidden"
                />
                {/* Vòng tròn ngoài */}
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border
              ${
                selectedPayment?.id === option.id
                  ? "border-[#013879] text-white"
                  : "border-gray-800 text-transparent"
              }
            `}
                >
                  {/* Vòng tròn trong */}
                  <div
                    className={`flex h-3 w-3 items-center justify-center rounded-full
              ${selectedPayment?.id === option.id ? "bg-[#013879]" : ""}
            `}
                  ></div>
                </div>
              </div>
              {/* Icon + Text Label */}
              <FontAwesomeIcon
                icon={option.icon}
                className={
                  selectedPayment?.id === option.id
                    ? "text-[#013879] text-xl"
                    : "text-xl"
                }
              />
              <span
                className={
                  selectedPayment?.id === option.id
                    ? "text-[#013879] text-sm sm:text-md font-semibold"
                    : "text-sm sm:text-md"
                }
              >
                {option.text}
              </span>
            </label>
            {/* CHỈ HIỆN NỘI DUNG CỦA OPTION ĐANG CHỌN */}
            <div className="ml-0 sm:ml-9 mb-10">
              {selectedPayment?.id === option.id && option.id === 1 && <Address />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
