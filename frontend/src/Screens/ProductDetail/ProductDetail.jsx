import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faLocationDot,
  faJetFighter,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchProductId,
  fetchRelatedProducts,
} from "../../redux/slices/productSlice";
import { Tabs, Tab, TabList, TabPanel } from "../../components/Tabs/Tabs";
import LoadingSpinner from "../../components/Loading/Loading";
import TourRelevant from "../../components/TourRelevant/TourRelevant";
import { addCart } from "../../redux/slices/cartSlice";
import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";

const ProductDetail = () => {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.products.loading);
  const product = useSelector((state) => state.products.currentProduct);
  const relatedProduct = useSelector((state) => state.products.relatedProducts);
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const orderByUser = useSelector((state) => state.cart.orderByUser);
  const [tourPrice, setTourPrice] = useState(null);
  const [dateTour, setDateTour] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    //Chuyển slug thành chữ thường
    const normalizedSlug = slug.toLowerCase();
    dispatch(fetchProductId(normalizedSlug));
    dispatch(fetchRelatedProducts(normalizedSlug));
    setTourPrice(null);
  }, [slug, dispatch]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  //Hàm chuyển ngày, tháng, năm chỉ còn ngày với tháng
  const formatDate = (dateStr) =>
    new Date(dateStr)
      .toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      })
      .replace("/", "-");

  const handleOrder = async () => {
  // Chưa đăng nhập
  if (!accessToken) {
    alert("Vui lòng đăng nhập để đặt tour");
    navigate("/dang-nhap");
    return;
  }

  // Chưa chọn ngày / giá
  if (!tourPrice || !dateTour) {
    alert("Vui lòng chọn ngày khởi hành");
    return;
  }

  const userInfo = user ? JSON.parse(user) : {};

  const orderData = {
    productId: product.id,
    productName: product.name,
    price: tourPrice,
    departureDate: dateTour,
    returnDate: endDate,
    userName: userInfo.name || "",
    userEmail: userInfo.email || "",
    userPhone: userInfo.phone || "",
  };

  try {
    const result = await dispatch(addCart(orderData));
    if (result.payload) {
      navigate("/booking");
    } else {
      alert("Có lỗi khi đặt tour, vui lòng thử lại");
    }
  } catch (error) {
    alert("Có lỗi khi đặt tour: " + error.message);
  }
};


  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="mx-5 md:mx-20 my-10 font-bai-jamjuree">
        <p className="text-sm">
          <FontAwesomeIcon icon={faTicket} className="text-sm" /> Mã tour:{" "}
          <span className="font-semibold">BUITRANTIEN</span>
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-3xl font-semibold leading-tight my-6">
              {product?.name}
            </p>
            <p className="hidden md:block md:text-sm mt-2">
              Thời lượng: {product?.duration}
            </p>
            <div className="hidden md:flex md:items-center space-x-8">
              <p className="text-sm">
                <FontAwesomeIcon icon={faJetFighter} className="text-sm" /> Hãng
                bay: <span className="font-semibold">Vietjet Air</span>
              </p>
              <p className="text-sm">
                <FontAwesomeIcon icon={faLocationDot} className="text-sm" /> Nơi
                khởi hành:{" "}
                <span className="font-semibold">{product?.departure}</span>
              </p>
              <div className="text-sm select-none">
                <div className="inline-block space-x-1">
                  <span>Ngày đi:</span>
                  {product?.departures?.map((date) => (
                    <div
                      key={date.departureId}
                      className={`inline-flex items-center justify-center rounded-full px-2 m-1 font-medium hover:bg-[#EBF4F8] ${
                        date.price === tourPrice
                          ? "bg-[#EBF4F8] opacity-70"
                          : "bg-[#d4f1ff] opacity-100"
                      }`}
                      onClick={() => {
                        setTourPrice(date.price);
                        setDateTour(date.startDate);
                        setEndDate(date.endDate);
                      }}
                    >
                      <p>{formatDate(date.startDate)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block space-y-4 text-center">
            <p className="text-red-500 text-3xl font-semibold text-center">
              {tourPrice
                ? tourPrice.toLocaleString("vi-VN")
                : product?.price.toLocaleString("vi-VN")}
              <span className="text-base">VNĐ</span>
            </p>
            <button
              className="button"
              onClick={() => {
                handleOrder(product, tourPrice, dateTour);
              }}
            >
              Đặt Ngay
            </button>
          </div>
        </div>
        <RevealOnScroll delay={200}>
          <div className="md:mt-8 flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0 h-[462px]">
            <div className="w-full h-2/3 md:w-1/2 md:h-full relative overflow-hidden">
              <img
                src={product?.images[0]}
                alt=""
                className="w-full h-full object-cover"
                onClick={() => {
                  setCurrentIndex(0);
                  setIsOpen(true);
                }}
              />
            </div>
            <div className="flex flex-row items-start justify-start space-x-1 w-full h-1/3 md:flex-col md:space-x-0 md:w-1/2 md:h-full md:space-y-1">
              <div className="flex w-full h-1/2 space-x-1 overflow-hidden">
                <img
                  src={product?.images[1]}
                  alt=""
                  className="w-1/2 object-cover"
                  onClick={() => {
                    setCurrentIndex(1);
                    setIsOpen(true);
                  }}
                />
                <img
                  src={product?.images[1]}
                  alt=""
                  className="w-1/2 object-cover"
                  onClick={() => {
                    setCurrentIndex(1);
                    setIsOpen(true);
                  }}
                />
              </div>
              <div className="flex w-full h-1/2 space-x-1 overflow-hidden">
                <img
                  src={product?.images[1]}
                  alt=""
                  className="w-1/2 object-cover"
                  onClick={() => {
                    setCurrentIndex(1);
                    setIsOpen(true);
                  }}
                />
                <img
                  src={product?.images[1]}
                  alt=""
                  className="w-1/2 object-cover"
                  onClick={() => {
                    setCurrentIndex(1);
                    setIsOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>
        <div className="w-full md:hidden relative z-10 -mt-12 bg-white">
          <div className="h-auto">
            <p className="font-semibold text-xl">Thông Tin Cơ Bản</p>
            <ul className="list-disc">
              <div className="text-sm select-none">
                <div className="inline-block space-x-1">
                  <span>Ngày đi:</span>
                  {product?.departures?.map((date) => (
                    <div
                      key={date.departureId}
                      className={`inline-flex items-center justify-center rounded-full px-2 m-1 font-medium hover:bg-[#EBF4F8] ${
                        date.price === tourPrice
                          ? "bg-[#EBF4F8] opacity-70"
                          : "bg-[#d4f1ff] opacity-100"
                      }`}
                      onClick={() => {
                        setTourPrice(date.price);
                        setDateTour(date.startDate);
                        setEndDate(date.endDate);
                      }}
                    >
                      <p>{formatDate(date.startDate)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ul>
            <div className="space-y-4">
              <p className="text-red-500 text-3xl font-semibold text-left mt-4 mb-4">
                19.999.999
                <span className="text-base">VNĐ</span>
              </p>
              <div className="text-center">
                <button
                  className="button w-full"
                  onClick={() => handleOrder(product, tourPrice, dateTour)}
                >
                  Đặt Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 md:mt-10 block md:flex md:items-start md:justify-between md:space-x-10">
          <div className="w-full md:w-2/3">
            <Tabs>
              <TabList>
                <Tab index={0}>Thông Tin</Tab>
                <Tab index={1}>Lịch Trình</Tab>
                <Tab index={2}>Quy Định & Phụ Thu</Tab>
              </TabList>

              {/* ===== TAB 1: THÔNG TIN ===== */}
              <TabPanel index={0}>
                <h2 className="text-lg md:text-2xl font-bold text-[#013879] mb-4">
                  <FontAwesomeIcon icon={faBarcode} className="text-2xl mr-2" />
                  Tổng Quan
                </h2>

                <p className="mb-4">{product?.description}</p>

                <h3 className="text-base md:text-lg font-bold text-[#013879] mb-4">
                  ĐIỂM NỔI BẬT
                </h3>

                <ul className="list-disc ml-8">
                  {product?.highlights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </TabPanel>

              {/* ===== TAB 2: LỊCH TRÌNH ===== */}
              <TabPanel index={1}>
                <h2 className="text-lg md:text-2xl font-bold text-[#013879] mb-4">
                  Lịch Trình Chi Tiết
                </h2>

                <ul className="space-y-3">
                  {Object.entries(product?.schedule || {}).map(
                    ([day, content]) => (
                      <li key={day}>
                        <strong className="capitalize">
                          {day.replace("day", "Ngày ")}:
                        </strong>{" "}
                        {content}
                      </li>
                    )
                  )}
                </ul>
              </TabPanel>

              {/* ===== TAB 3: QUY ĐỊNH & PHỤ THU ===== */}
              <TabPanel index={2}>
                <h2 className="text-lg md:text-2xl font-bold text-[#013879] mb-4">
                  Giá Tour Bao Gồm
                </h2>

                <ul className="list-disc ml-8 mb-6">
                  {product?.priceDetails.included.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h2 className="text-lg md:text-2xl font-bold text-[#013879] mb-4">
                  Không Bao Gồm
                </h2>

                <ul className="list-disc ml-8 mb-6">
                  {product?.priceDetails.excluded.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h2 className="text-lg md:text-2xl font-bold text-[#013879] mb-4">
                  Chính Sách
                </h2>

                <ul className="space-y-2">
                  <li>
                    <strong>Đặt tour:</strong> {product?.policy.booking}
                  </li>
                  <li>
                    <strong>Hủy tour:</strong> {product?.policy.cancellation}
                  </li>
                  <li>
                    <strong>Lưu ý:</strong> {product?.policy.notes}
                  </li>
                </ul>
              </TabPanel>
            </Tabs>
          </div>
          <div className="hidden md:block w-1/3 bg-gray-100 px-8 py-9">
            <div className="h-auto">
              <p className="font-semibold text-xl">Thông Tin Cơ Bản</p>
              <ul className="list-disc ml-5">
                <li>Khởi hành: 30-11-2025</li>
                <li>Tập trung: 20:10</li>
                <li>Thời gian: 11 ngày 10 đêm</li>
              </ul>
              <div className="space-y-4">
                <p className="text-red-500 text-3xl font-semibold text-center mt-4 mb-4">
                  19.999.999
                  <span className="text-base">VNĐ</span>
                </p>
                <div className="text-center">
                  <button
                    className="button w-2/3"
                    onClick={() => handleOrder(product, tourPrice, dateTour)}
                  >
                    Đặt Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <RevealOnScroll delay={300}>
        <TourRelevant
          title={"Sản Phẩm Liên Quan"}
          data={relatedProduct.slice(0, 4)}
        />
      </RevealOnScroll>
      {/* Click vào ảnh để xem hình */}
      <div
        className={`
    fixed inset-0 z-50 flex items-center justify-center
    bg-black bg-opacity-80
    transition-all duration-300 ease-out
    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-5 text-white text-3xl"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {/* Prev */}
        <button
          className="absolute left-5 text-white text-4xl"
          onClick={() =>
            setCurrentIndex(
              (currentIndex - 1 + product.images.length) % product.images.length
            )
          }
        >
          ‹
        </button>

        {/* Image */}
        <img
          src={product?.images[currentIndex]}
          className={`
      w-[800px] h-[500px]
      max-w-[90%] max-h-[90%]
      object-contain
      transition-all duration-300 ease-out
      ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
    `}
          alt=""
        />

        {/* Next */}
        <button
          className="absolute right-5 text-white text-4xl"
          onClick={() =>
            setCurrentIndex((currentIndex + 1) % product.images.length)
          }
        >
          ›
        </button>
      </div>
    </>
  );
};

export default ProductDetail;
