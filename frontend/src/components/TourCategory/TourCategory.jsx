import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faLocationDot,
  faJetFighter,
} from "@fortawesome/free-solid-svg-icons";
import Sortof from "../Sortof/Sortof";

const TourCategory = ({ title, data, handleSort }) => {
  const navigate = useNavigate();
  //Hàm chuyển ngày, tháng, năm chỉ còn ngày với tháng
  const formatDate = (dateStr) =>
    new Date(dateStr)
      .toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      })
      .replace("/", "-");

  return (
    <div>
      <div
        className="
          flex 
          items-center 
          justify-between 
          gap-4 md:gap-0
        "
      >
        <h2
          className="
            my-6 md:my-10 
            text-2xl md:text-4xl 
            font-bold 
            text-[#013879] 
            text-left md:text-center
          "
        >
          {title}
        </h2>
        <Sortof handleSort={handleSort} />
      </div>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          justify-items-stretch 
          items-start 
          gap-x-4 
          gap-y-12
        "
      >
        {data && data.length > 0
          ? data.map((tour) => (
              <div
                key={tour.id}
                className="leading-6 cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/tour-du-lich/${tour.slug}`);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/tour-du-lich/${tour.slug}`);
                  }
                }}
              >
                <div className="h-[219.23px] overflow-hidden">
                  <img
                    src={tour.images[0]}
                    alt="hinh-tour "
                    className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <p className="text-sm mt-2">Thời lượng: {tour.duration}</p>
                <p className="text-lg font-semibold leading-5 my-2">
                  {tour.name}
                </p>
                <p className="text-sm">
                  <FontAwesomeIcon icon={faTicket} className="text-sm" /> Mã
                  tour: <span className="font-semibold">BUITRANTIEN</span>
                </p>
                <p className="text-sm">
                  <FontAwesomeIcon icon={faLocationDot} className="text-sm" />{" "}
                  Nơi khởi hành:{" "}
                  <span className="font-semibold">{tour.departure}</span>
                </p>
                <p className="text-sm">
                  <FontAwesomeIcon icon={faJetFighter} className="text-sm" />{" "}
                  Hãng bay: <span className="font-semibold">Vietjet Air</span>
                </p>
                <div className="text-sm select-none">
                  <div className="inline-block space-x-1">
                    <span>Ngày đi:</span>
                    {tour.departures.map((date) => (
                      <div
                        key={date.departureId}
                        className="inline-flex items-center justify-center rounded-full bg-[#d4f1ff] px-2 m-1 font-medium"
                      >
                        <p>{formatDate(date.startDate)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-red-500 text-xl font-semibold">
                  {tour.price.toLocaleString("vi-VN")}
                  <span className="text-sm">VNĐ</span>
                </p>
              </div>
            ))
          : "Không Có Tour Nào Hiện Nay"}
      </div>
    </div>
  );
};

export default TourCategory;
