import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJetFighter } from "@fortawesome/free-solid-svg-icons";

const Destination = () => {
  const commonHoverClasses = `
    absolute bottom-4 left-4 text-white transition-all duration-500
    group-hover:bottom-1/2 group-hover:left-1/2 
    group-hover:-translate-x-1/2 group-hover:translate-y-1/2 
    flex items-center space-x-2 flex
    text-3xl
  `;
  const imageHoverClasses = `
    object-cover w-full h-full transition-transform duration-500
    group-hover:scale-105 
  `;
  const overlayClasses = `
    absolute inset-0 bg-black/50 transition-opacity duration-500
    opacity-0 group-hover:opacity-100 
  `;

  return (
    <div className="mx-20 mb-20">
      <h2 className="my-20 text-4xl font-bold text-[#013879] text-center">
        Điểm Đến Yêu Thích
      </h2>
      {/* Container chính: 2 cột (Flex) */}
      {/* Đặt h-[600px] để cố định tổng chiều cao */}
      <div className="flex gap-4 h-[600px]">
        
        {/* Cột 1: Châu Âu - Chiếm nửa chiều rộng, cao đầy đủ */}
        <div 
          className="w-1/2 h-full relative overflow-hidden group" // THÊM group
        >
          <img
            src="https://withlocals-com-res.cloudinary.com/image/upload/c_fill,f_auto,fl_progressive,g_auto,q_auto,w_500/v1/destinations/the-netherlands/Amsterdam/Keukenhof/AdobeStock_126326810"
            alt="Châu Âu - Cối xay gió và hoa Tulip"
            className={imageHoverClasses} // ÁP DỤNG image hover
          />
          {/* OVERLAY MÀU ĐEN MỜ */}
          <div className={overlayClasses}></div> {/* ÁP DỤNG overlay */}

          {/* NỘI DUNG (Icon và Chữ) */}
          <div className={commonHoverClasses}> {/* ÁP DỤNG content hover */}
            <FontAwesomeIcon icon={faJetFighter} className="text-3xl" /> Châu Âu
          </div>
        </div>

        {/* Cột 2: Chiếm nửa chiều rộng, cao đầy đủ. Và chia thành 2 hàng bằng nhau */}
        <div className="flex flex-col w-1/2 h-full gap-4">
          
          {/* Hàng 1 (Trên): Chia thành 2 cột nhỏ bằng nhau */}
          <div className="flex w-full h-1/2 gap-4">
            
            {/* Ô 1.1: Châu Úc (Đã có sẵn) */}
            <div
              className="
                w-1/2 h-full relative overflow-hidden 
                group 
              "
            >
              <img
                src="https://onetour.vn/Media/Images/OneTour/tin-tuc/2019/thang%207/sydney.jpg"
                alt="Châu Úc - Nhà hát Sydney"
                className={imageHoverClasses}
              />
              <div className={overlayClasses}></div>
              <div className={commonHoverClasses}>
                <FontAwesomeIcon icon={faJetFighter} className="text-3xl" />
                <span>Châu Úc</span>
              </div>
            </div>

            {/* Ô 1.2: Hàn Quốc */}
            <div 
              className="w-1/2 h-full relative overflow-hidden group" // THÊM group
            >
              <img
                src="https://vionatravel.com/upload/files/b42411724fdde017fd838ef4e26feb8c_seoul_tower_hero_image.jpg"
                alt="Hàn Quốc - Tháp Seoul"
                className={`${imageHoverClasses} object-bottom`} // ÁP DỤNG image hover + object-bottom
              />
              {/* OVERLAY MÀU ĐEN MỜ */}
              <div className={overlayClasses}></div> {/* ÁP DỤNG overlay */}
              
              {/* NỘI DUNG (Icon và Chữ) */}
              <div className={commonHoverClasses}> {/* ÁP DỤNG content hover */}
                <FontAwesomeIcon icon={faJetFighter} className="text-3xl" /> Hàn
                Quốc
              </div>
            </div>
          </div>

          {/* Hàng 2 (Dưới): Nhật Bản (Chiều rộng đầy đủ, nửa chiều cao) */}
          <div 
            className="w-full h-1/2 relative overflow-hidden group" // THÊM group
          >
            <img
              src="https://ik.imagekit.io/tvlk/blog/2022/11/lau-dai-osaka-3.jpg?tr=q-70,c-at_max,w-1000,h-600"
              alt="Nhật Bản - Lâu đài"
              className={imageHoverClasses} // ÁP DỤNG image hover
            />
            {/* OVERLAY MÀU ĐEN MỜ */}
            <div className={overlayClasses}></div> {/* ÁP DỤNG overlay */}

            {/* NỘI DUNG (Icon và Chữ) */}
            <div className={commonHoverClasses}> {/* ÁP DỤNG content hover */}
              <FontAwesomeIcon icon={faJetFighter} className="text-3xl" /> Nhật
              Bản
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;