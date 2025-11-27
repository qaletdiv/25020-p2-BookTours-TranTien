import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex items-start gap-x-10 px-20 py-10 bg-[#013879] text-white leading-8">
        <div className="basis-1/3">
          <p className="font-semibold text-xl mb-4">
            CÔNG TY CP ĐT TM DV DU LỊCH LỬA VIỆT TOUR
          </p>
          <p>198 Phan Văn Trị, Phường Gò Vấp, TP. HCM</p>
          <p>Tổng đài: (028) 73 081 888</p>
          <p>Email: sales@luaviettour.com.vn</p>
          <p>Facebook: www.facebook.com/luaviettour</p>
          <p>Giấy phép đăng kí kinh doanh (Mã số thuế): 0309139335.</p>
          <p>Giấy phép Lữ hành quốc tế: GP79- 402/2014/TCDL-GPLHQT.</p>
        </div>
        <div className="basis-1/3">
          <p className="font-semibold text-xl mb-4">CÁC CHI NHÁNH VĂN PHÒNG</p>
          <p>Chi nhánh TP.HCM</p>
          <p>401 Đại lộ Bình Dương, Phường Thủ Dầu Một</p>
          <p>ĐT: (0274) 73 01 888</p>

          <p>Chi nhánh Hà Nội</p>
          <p>Tầng 4, Tòa Gems Office, 74 Khúc Thừa Dụ, P. Cầu Giấy</p>
          <p>ĐT: (024) 73 081 888</p>

          <p>Chi nhánh Đồng Nai</p>
          <p>1153 Phạm Văn Thuận, Phường Trấn Biên</p>
          <p>ĐT: (0251) 73 01 888</p>

          <p>VPĐD Đà Nẵng</p>
          <p>102 Trần Lựu, Phường Cẩm Lệ</p>
          <p>ĐT: (0236) 73 01 888</p>
        </div>
        <div className="basis-1/3">
          <p className="font-semibold text-xl mb-4">Chứng Nhận</p>
          <div className="flex items-start space-x-5">
            <div className="w-[150px] h-[82.5px] basis-1/2">
              <img
                src="https://inkdtex.com/Image/Picture/New/logo-dang-ky-bo-cong-thuong.png"
                alt="bo-cong-thuong"
              />
              <img
                src="https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1397184588/d3b3c688f03dddbd1d0296db1f0199db.png?ik-sanitizeSvg=true"
                alt="dmca"
              />
            </div>
            <div className="flex flex-wrap basis-1/2">
              <p>
                Giấy chứng nhận đăng ký kinh doanh số 0301659981 do Sở Kế Hoạch
                và Đầu Tư TPHCM cấp ngày 14/01/1999.
              </p>
              <p>Đăng ký thay đổi lần thứ: 15, ngày 07 tháng 06 năm 2022.</p>
              <p>Số giấy phép kinh doanh lữ hành quốc tế:</p>
              <p>79 -228 /20 16TCDL - GP LHQT cấp ngày 28/07/2016.</p>
              <p>Số D-U-N-S doanh nghiệp: 555256961</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white text-xs text-center p-2">
        Copyright © 1999-2023 Công ty TNHH Du Lịch Lửa Việt
      </div>
    </>
  );
};

export default Footer;
