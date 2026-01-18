import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function Confirm() {
  const navigation = useNavigate();
  const newOrder = useSelector((state) => state.orders.currentNewOrderInCart);

  //Nếu không có đơn hàng thì nó sẽ hiển thị không tìm thấy
  if (!newOrder || !newOrder.orderByUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-500">Không tìm thấy đơn hàng</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div
        className="
          bg-white
          shadow-md
          p-6 sm:p-8
          max-w-md
          w-full
          text-center
          space-y-4
        "
      >
        {/* Icon success */}
        <div className="text-5xl animate-bounce">
          <FontAwesomeIcon icon={faCircleCheck} color="#22c55e" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Đặt tour thành công
        </h1>

        <p className="text-gray-600 text-sm sm:text-base">
          Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Nhân viên sẽ
          liên hệ xác nhận trong thời gian sớm nhất.
        </p>

        {/* Thông tin đơn hàng */}
        <div className="bg-gray-100 p-3 sm:p-4 text-sm text-left space-y-1 rounded">
          <p>
            <strong>Tên tour:</strong> {newOrder.orderByUser.productName}
          </p>
          <p>
            <strong>Ngày khởi hành:</strong>{" "}
            {newOrder.orderByUser.departureDate?.split("-").reverse().join("/")}
          </p>
          <p>
            <strong>Số khách:</strong> {newOrder.guests.length}
          </p>
          <p className="text-red-500 font-semibold">
            Tổng Cộng: {newOrder.Total.toLocaleString("vi-VN")} VNĐ
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigation("/")}
            className="
              flex-1
              bg-blue-600
              text-white
              py-2
              hover:bg-blue-700
              transition
            "
          >
            Về trang chủ
          </button>
          <button
            onClick={() => navigation("/tour-du-lich")}
            className="
              flex-1
              border
              border-gray-300
              py-2
              hover:bg-gray-100
              transition
            "
          >
            Tiếp tục xem Tour
          </button>
        </div>
      </div>
    </div>
  );
}
