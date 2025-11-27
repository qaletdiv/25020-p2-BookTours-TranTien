import React, { useState } from 'react';

const SelectRadio = ({tourOptions, handleFilterRadio}) => {
    // 1. Sử dụng state để quản lý lựa chọn hiện tại
    const [selectedTour, setSelectedTour] = useState(String(tourOptions[0].id)); // Mặc định chọn 'id đầu tiên'

    // 2. Hàm xử lý sự kiện khi radio button thay đổi
    const handleChange = (event) => {
        const id = event.target.value;
        setSelectedTour(id);
        handleFilterRadio(Number(id))
    };

    return (
        <div className="space-y-4 text-gray-800">
            {tourOptions.map((option) => (
                <label 
                    key={option.id}
                    className="flex items-center cursor-pointer select-none" // select-none để tránh highlight text khi click
                >
                    {/* 3. Input Radio - Dùng peer và hidden */}
                    <input
                        type="radio"
                        name="radio"
                        id={option.id}
                        value={option.id}
                        checked={selectedTour === String(option.id)} // Trạng thái được kiểm soát bởi state. Dùng string vì lát nữa khi hàm handleChange được gọi thì event.target.value trong đó luôn là string
                        onChange={handleChange}              // Xử lý sự kiện thay đổi
                        className="peer hidden" //Hidden để Ẩn nút tròn mặc định của input radio
                    />
                    {/* 4. Custom Radio Circle (Mô phỏng nút) */}
                    {/* Vòng tròn */}
                    <div className={`
                        w-5 h-5 rounded-full border-2 mr-3 transition duration-150 ease-in-out 
                        border-gray-400 
                        peer-checked:border-[#013879]
                        peer-checked:border-4
                    `}>
                    </div>
                    {/* 5. Text Label */}
                    <span className={`
                        text-md font-medium 
                    `}>
                        {option.name}
                    </span>
                </label>
            ))}           
        </div>
    );
};

export default SelectRadio;