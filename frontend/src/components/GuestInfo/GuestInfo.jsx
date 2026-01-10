import React, { useState } from "react";
import GuestDetail from "./GuestDetail/GuestDetail";

const GuestInfo = ({ adultCount, childCount, guests, setGuests }) => {

  //Tạo một cái hàm để cập nhật thêm thông tin hành khách mới vào danh sách trên
  const handleGuestChange = (index, data) => {
    const newGuests = [...guests];
    //Nếu newGuests có index trùng thông tin index của guest cũ thì nó cập nhật lại hoặc nếu không thì nó thêm mới
    newGuests[index] = data;
    setGuests(newGuests);
  };

  return (
    <div>
      <h2 className="text-2xl my-5 font-bold">Thông Tin Hành Khách</h2>
      {[...Array(adultCount)].map((_, index) => (
        <GuestDetail
          key={`adult-${index}`}
          type={`Người lớn ${index + 1}`}
          //Khi Components GuestDetail thay đổi thông tin thì nó sẽ gửi data mới lên
          onChange={(data) => handleGuestChange(index, data)}
        />
      ))}

      {[...Array(childCount)].map((_, index) => (
        <GuestDetail
          key={`child-${index}`}
          type={`Trẻ em ${index + 1}`}
          onChange={(data) => handleGuestChange(adultCount + index, data)}
        />
      ))}
      {/* TEST */}
      {/* <button
        className="mt-5 px-4 py-2 bg-blue-600 text-white"
        onClick={() => console.log("ALL GUESTS:", guests)}
      >
        Console log guests
      </button> */}
    </div>
  );
};

export default GuestInfo;
