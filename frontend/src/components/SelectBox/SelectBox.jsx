import React, { useState, useRef, useEffect } from 'react';

const SelectBox = ({title, title2, options}) => {
  // 1. Quản lý trạng thái: mở/đóng menu. True thì drop select hiện ra. false nó nó đóng.
  const [isOpen, setIsOpen] = useState(false); 
  // 2. Quản lý trạng thái: giá trị được chọn
  const [selectedValue, setSelectedValue] = useState(title2);

  const dropdownRef = useRef(null); //để follow thẻ DOM để lát nữa xem thẻ DOM có chứa cái phẩn tử event.target không.

  // Xử lý khi click ra ngoài để đóng menu
  useEffect(() => {
    //Hàm đây sẽ luôn luôn được chạy khi mình click, nó sẽ đưa tất cả phần tử để so sánh đến khi thỏa điều kiện nó sẽ giúp tắt cái Drop.
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        //event.target là phần tử DOM thực sự mà người dùng đã click. Nó không phải là một dòng code cố định trong component của bạn. Nó chính là bất kỳ phần tử HTML nào trên trang mà bạn click vào tại thời điểm đó.
        //dropdownRef.current.contains(event.target) trả về true nếu event.target là chính phần tử được dropdownRef tham chiếu hoặc là con (descendant) của nó.
        //!dropdownRef.current.contains(event.target) → nghĩa là người dùng click bên ngoài vùng dropdown. Khi đó mình gọi setIsOpen(false) để đóng menu.
      }
    }
    // Gắn event listener khi component mount
    document.addEventListener("mousedown", handleClickOutside);
    //Mỗi khi bạn click chuột xuống bất kỳ chỗ nào trong trang web, React không liên quan gì ở đây, trình duyệt sẽ tự chạy hàm handleClickOutside(event)
    
    // Dọn dẹp event listener khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      //Cleanup chạy khi Component UNMOUNT (bị xóa khỏi UI). Vd: Bạn chuyển sang trang khác bằng router → component biến mất. Lúc đó React chạy cleanup để gỡ listener.
      //
    };
  }, []); // Chỉ chạy 1 lần khi mount

  // Xử lý khi chọn một tùy chọn
  const handleSelect = (value) => {
    setSelectedValue(value); // Cập nhật giá trị
    setIsOpen(false); // Đóng menu
  };

  // Xử lý khi click vào khung chọn để chuyển đổi trạng thái mở/đóng
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    //Gắn để biết dropdownRef chỗ mà nó cần follow là ở đâu
    <div className="w-full relative" ref={dropdownRef}> 
      {/* TIÊU ĐỀ */}
      <h3 className="text-lg font-bold text-[#013879] mb-2">{title}</h3>
      
      {/* KHUNG CHỌN (SELECT BOX) */}
      <div 
        id="select-box"
        onClick={toggleDropdown} //Click khung vừa vùng thì isOpen thay đổi từ false thành true để Vùng chọn hiện ra. Hoặc ngược lại.
        className={`
          p-3
          bg-gray-50 
          border border-gray-200 
          cursor-pointer 
          flex justify-between items-center
          font-medium
          transition duration-150
          ${isOpen ? 'border-[#013879] text-[#013879] shadow-md' : 'text-[#013879] hover:border-blue-400'}
        `}
        //Nếu có vùng chọn 
      >
        <span>{selectedValue}</span>
        {/* Icon mũi tên xoay khi mở/đóng */}
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {/* DANH SÁCH TÙY CHỌN (DROPDOWN MENU) */}
      <div 
        id="dropdown-menu"
        className={`
          absolute w-full mt-1 h-auto max-h-[400px]
          bg-white 
          border border-gray-200 
          shadow-lg 
          z-10
          overflow-auto
          ${isOpen ? 'block' : 'hidden'}
        `}
      >
        {/* Tùy chọn mặc định/đã chọn */}
        <div 
          className={`
            p-3 
            cursor-default 
            ${selectedValue === title2 ? 'bg-[#013879] text-white' : 'text-[#013879]'}
          `}
        >
          {title2}
        </div>
        
        {/* Các tùy chọn khác */}
        {options.map((option) => (
          <div
            key={option}
            onClick={() => handleSelect(option)}
            className={`
              p-3 
              cursor-pointer 
              transition duration-100
              ${selectedValue === option ? 'bg-[#013879] text-white' : 'text-[#013879] hover:bg-gray-100'}
            `}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectBox;