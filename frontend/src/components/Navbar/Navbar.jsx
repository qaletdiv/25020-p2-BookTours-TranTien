import React from "react";
import { IoMdSearch } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

const MenuLinks = [
  {
    id: 1,
    name: "Trang Chủ",
    link: "/",
  },
  {
    id: 2,
    name: "Giới Thiệu",
    link: "/#gioi-thieu",
  },
  {
    id: 3,
    name: "Tour Du Lịch",
    link: "/tour-du-lich",
  },
  {
    id: 4,
    name: "Tin Tức",
    link: "/#tin-tuc",
  },
];

const Navbar = () => {
  return (
    <div className="w-full px-20 py-5 bg-white shadow-md sticky top-0 z-40 tracking-wider">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="w-[155px] h-[43px]">
          <img
            src="https://www.luavietours.com/assets/img/common/logo.jpg"
            alt="logo"
            className="w-full h-full"
          />
        </div>
        {/* menu */}
        <nav className="flex space-x-5">
          {MenuLinks.map((menu) => (
            <a
              href={menu.link}
              key={menu.id}
              className="text-base font-bai-jamjuree text-[#013879] font-medium"
            >
              {menu.name}
            </a>
          ))}
        </nav>
        <div>
          <FontAwesomeIcon icon={faSearch} className="text-xl text-[#013879]" />
          <FontAwesomeIcon icon={faUser} className="text-xl text-[#013879]" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
