import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faLocationDot,
  faJetFighter,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";

const ProductDetail = () => {
  return (
    <div className="mx-20 my-10 font-bai-jamjuree">
      <p className="text-sm">
        <FontAwesomeIcon icon={faTicket} className="text-sm" /> Mã tour:{" "}
        <span className="font-semibold">BUITRANTIEN</span>
      </p>
      <div className="flex items-end justify-between">
        <div className="space-y-4">
          <p className="text-3xl font-semibold leading-5 my-6">
            CHÂU ÂU 11N10Đ | ĐỨC - ÁO - Ý - THỤY SĨ - PHÁP
          </p>
          <p className="text-sm mt-2">Thời lượng: 2 ngày 1 đêm</p>
          <div className="flex space-x-8">
            <p className="text-sm">
              <FontAwesomeIcon icon={faJetFighter} className="text-sm" /> Hãng
              bay: <span className="font-semibold">Vietjet Air</span>
            </p>
            <p className="text-sm">
              <FontAwesomeIcon icon={faLocationDot} className="text-sm" /> Nơi
              khởi hành: <span className="font-semibold">TP. Hồ Chí Minh</span>
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-red-500 text-3xl font-semibold text-center">
            19.999.999
            <span className="text-base">VNĐ</span>
          </p>
          <button className="button">Đặt Ngay</button>
        </div>
      </div>
      <div className="mt-8 flex space-x-1 h-[462px]">
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src="https://www.luavietours.com/wp/wp-content/uploads/2024/10/1-lang-co-hallstatt-voi-ve-dep-day-me-hoac.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col w-1/2 h-full space-y-1">
          <div className="flex w-full h-1/2 space-x-1 overflow-hidden">
            <img
              src="https://www.luavietours.com/wp/wp-content/uploads/2024/10/1-lang-co-hallstatt-voi-ve-dep-day-me-hoac.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <img
              src="https://www.luavietours.com/wp/wp-content/uploads/2024/10/1-lang-co-hallstatt-voi-ve-dep-day-me-hoac.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex w-full h-1/2 space-x-1 overflow-hidden">
            <img
              src="https://www.luavietours.com/wp/wp-content/uploads/2024/10/1-lang-co-hallstatt-voi-ve-dep-day-me-hoac.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <img
              src="https://www.luavietours.com/wp/wp-content/uploads/2024/10/1-lang-co-hallstatt-voi-ve-dep-day-me-hoac.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-start justify-between space-x-10">
        <div className="w-2/3">
          <h2 className="text-2xl font-bold text-[#013879] mb-4">
            <FontAwesomeIcon icon={faBarcode} className="text-2xl" /> Tổng Quan
          </h2>
          <h3 className="text-lg font-bold text-[#013879] mb-4">ƯU ĐÃI</h3>
          <ul className="list-disc ml-8">
            <li>
              <strong>Không rủi ro Visa:</strong> Hoàn 100% giá tour (Bao gồm
              Phí Visa).
            </li>
            <li>
              <strong>Tiện lợi ngay khi bắt đầu:</strong> Đưa đón tận nhà Miễn
              phí 2 chiều (nội thành Hà Nội).
            </li>
            <li>
              <strong>Duy trì kết nối:</strong> Tặng sim 3G/4G.
            </li>
          </ul>
          <p className="italic mb-4">
            Số lượng quà tặng có giới hạn và các khuyến mãi có điều kiện áp
            dụng.
          </p>
          <h3 className="text-lg font-bold text-[#013879] mb-4">
            ĐIỂM NHẤN CHƯƠNG TRÌNH
          </h3>
          <ul className="list-disc ml-8">
            <li>
              <strong>Tham quan:</strong> Quảng trường Stachusplatz, Quảng
              trường San Marco, Cầu Than Thở, Nhà thờ Santa Maria, Khu phố cổ
              Lucerne, Phố cổ Bern, Khải Hoàn Môn, Điện Invalides,….
            </li>
            <li>
              <strong>Lưu trú: </strong> Khách sạn 3 - 4 sao.
            </li>
            <li>
              <strong>Ăn uống: </strong> Thực đơn kết hợp Menu Châu Âu, Châu Á,
              bữa tối sang trọng mang phong cách Châu Âu trên du thuyền sông
              Seine.
            </li>
            <li>
              <strong>Hoạt động khác: </strong> Du thuyền sông Seine, tham quan
              Gondola.
            </li>
          </ul>
        </div>
        <div className="w-1/3 bg-gray-100 px-8 py-9">
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
              <button className="button w-2/3">Đặt Ngay</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
