import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faEnvelope,
  faPhone,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/slices/authSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // parse user từ localStorage / redux để nó trở thành object
  const userInfo = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/dang-nhap");
  };

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div
        className="
          w-full
          max-w-md
          bg-white
          shadow-md
          p-6 sm:p-8
        "
      >
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-6xl text-[#013879]"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-[#013879] mb-6">
          Thông Tin Tài Khoản
        </h2>

        {/* Info */}
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faUserCircle} />
            <span className="font-semibold">Họ tên:</span>
            <span>{userInfo.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="font-semibold">Email:</span>
            <span className="break-all">{userInfo.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faPhone} />
            <span className="font-semibold">Số điện thoại:</span>
            <span>{userInfo.phone}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/")}
            className="
              flex-1
              py-2
              border border-[#013879]
              text-[#013879]
              font-semibold
              hover:bg-[#013879]
              hover:text-white
              transition
            "
          >
            Về trang chủ
          </button>

          <button
            onClick={handleLogout}
            className="
              flex-1
              py-2
              bg-red-500
              text-white
              font-semibold
              hover:bg-red-600
              transition
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
