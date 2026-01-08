import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Loading/Loading";
import Contacts from "../../components/contacts/Contacts";
import PassengerCount from "../../components/PassengerCount/PassengerCount";
import GuestInfo from "../../components/GuestInfo/GuestInfo";
import TakeNote from "../../components/TakeNote/TakeNote";
import Agree from "../../components/Agree/Agree";
import Payment from "../../components/Payment/Payment";
import PayBox from "../../components/PayBox/PayBox";
import { addOrder } from "../../redux/slices/orderSlice";

const Booking = () => {
  const orders = useSelector((state) => state.orders.cart);
  const navigate = useNavigate();
  const orderByUser = useSelector((state) => state.cart.orderByUser) || {};
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);

  // Kiểm tra dữ liệu order có tồn tại
  if (
    !orderByUser ||
    !orderByUser.price ||
    Object.keys(orderByUser).length === 0
  ) {
    console.warn("orderByUser từ state.cart:", orderByUser);
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">
            Vui lòng chọn tour trước khi đặt hàng
          </p>
          <button
            onClick={() => navigate("/tour-du-lich")}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Quay lại trang tour
          </button>
        </div>
      </div>
    );
  }

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const adultTotal = adultCount * (orderByUser.price || 0);
  const childTotal = childCount * (orderByUser.price || 0) * 0.8;
  const Total = adultTotal + childTotal;

  //Gộp tất cả các thông tin của khách hàng lại
  const [userInfo, setUserInfo] = useState({
    name: orderByUser.userName || "",
    email: orderByUser.userEmail || "",
    phone: orderByUser.userPhone || "",
    address: "",
  });

  //Tạo một cái danh sách rỗng để lưu toàn bộ hành khách đi cùng
  const [guests, setGuests] = useState([]);

  //Gộp tất cả các note của khách hàng lại
  const [userNote, setUserNote] = useState({
    have: [],
    takeNote: "",
  });

  //Khách hàng đã đồng ý tích đọc kĩ điều khoản
  const [agree, setAgree] = useState(false);

  //Khách hàng chọn phương thức thanh toán
  const [selectedPayment, setSelectedPayment] = useState(null);

  //Kiểm tra lỗi thiếu thông tin khách hàng
  const handleCart = () => {
    const validations = [
      {
        condition:
          !userInfo.name ||
          !userInfo.email ||
          !userInfo.phone ||
          !userInfo.address,
        message: "Thiếu thông tin liên lạc",
      },
      { condition: adultCount <= 0, message: "Phải có ít nhất 1 người lớn" },
      {
        condition:
          guests.length !== adultCount + childCount ||
          guests.some((g) => !g.fullName || !g.sex || !g.birthday),
        message: "Thiếu thông tin hành khách",
      },
      {
        condition: !selectedPayment,
        message: "Chưa chọn phương thức thanh toán",
      },
      { condition: !agree, message: "Chưa đồng ý điều khoản" },
      { condition: Total <= 0, message: "Tổng tiền không hợp lệ" },
    ];

    const error = validations.find((v) => v.condition);
    if (error) {
      console.error("Validation Error:", error);
      console.log(
        "adultCount:",
        adultCount,
        "childCount:",
        childCount,
        "guests.length:",
        guests.length
      );
      console.log("guests:", guests);
      alert(error.message);
      return;
    }

    const cart = {
      userInfo,
      orderByUser,
      adultCount,
      childCount,
      guests,
      Total,
      userNote,
      agree,
      selectedPayment,
    };

    dispatch(addOrder(cart));
    navigate("/confirm");
  };

  return (
    <div className="mx-4 md:mx-20 my-10">
      {loading && <LoadingSpinner />}

      <h2 className="text-3xl md:text-4xl font-bold text-[#013879]">
        Tổng Quan Về Chuyến Đi
      </h2>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 mt-10">
          <Contacts orderByUser={orderByUser} setUserInfo={setUserInfo} />

          <div className="mt-10" />

          <PassengerCount
            adultCount={adultCount}
            childCount={childCount}
            setAdultCount={setAdultCount}
            setChildCount={setChildCount}
          />

          <div className="mt-10" />

          <GuestInfo
            adultCount={adultCount}
            childCount={childCount}
            guests={guests}
            setGuests={setGuests}
          />

          <div className="mt-10" />

          <TakeNote setUserNote={setUserNote} />

          <div className="mt-5" />

          <Agree agree={agree} setAgree={setAgree} />

          <div className="mt-10" />

          <Payment
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/3 h-auto mt-0 lg:mt-10 bg-white shadow-lg p-6 md:p-9">
          <PayBox
            orderByUser={orderByUser}
            adultCount={adultCount}
            childCount={childCount}
            Total={Total}
            handleCart={handleCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
