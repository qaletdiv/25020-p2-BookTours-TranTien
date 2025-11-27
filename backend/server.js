const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "PROJECT_MANAGER_SECRET";
const port = 5000;

// 👉 Nếu port frontend của học viên khác 5173 hãy đổi lại thành port phù hợp
app.use(cors());
app.use(express.json());

// Dữ liệu mẫu
let users = [];

let categories = [
  {
    id: 1,
    name: "Tour trong nước",
    description: "Các tour du lịch khám phá khắp Việt Nam.",
  },
  {
    id: 2,
    name: "Tour quốc tế",
    description: "Các tour tham quan, nghỉ dưỡng tại nước ngoài.",
  },
  {
    id: 3,
    name: "Tour trọn gói",
    description: "Bao gồm vé máy bay, khách sạn, hướng dẫn viên.",
  },
];
let products = [
  {
    id: 1,
    name: "Tour Nha Trang 4 ngày 3 đêm",
    destination: "Nha Trang, Khánh Hòa",
    destinationSuggestions: ["Nha Trang", "Đà Nẵng", "Phú Quốc", "Hạ Long"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2025-09-15",
    endDate: "2025-09-18",
    duration: "4 ngày 3 đêm",
    durationRange: "4-7 ngày",
    price: 4990000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2025/04/thap-ba-ponagar.jpg",
      "https://www.luavietours.com/wp/wp-content/uploads/2025/04/chua-long-son-nha-trang.jpg",
    ],
    description:
      "Trải nghiệm kỳ nghỉ tuyệt vời tại Nha Trang với bãi biển xanh, cát trắng và nhiều hoạt động giải trí hấp dẫn.",
    highlights: [
      "Tắm biển và lặn ngắm san hô tại Hòn Mun",
      "Tham quan VinWonders Nha Trang",
      "Thưởng thức hải sản tươi ngon",
    ],
    categoryid: 1,
    isfeatured: true,
    schedule: {
      day1: "TP.HCM - Nha Trang: Khởi hành, nhận phòng khách sạn, tự do tắm biển Nha Trang.",
      day2: "Khám phá 4 đảo: Lặn ngắm san hô tại Hòn Mun, bãi Tranh, tiệc nổi trên biển.",
      day3: "VinWonders Nha Trang: Trọn ngày vui chơi tại khu giải trí VinWonders (đã bao gồm vé).",
      day4: "Nha Trang - TP.HCM: Tham quan Tháp Bà Ponagar, chợ Đầm, sau đó ra sân bay về TP.HCM.",
    },
    priceDetails: {
      included: [
        "Xe vận chuyển đời mới, máy lạnh.",
        "Khách sạn tiêu chuẩn 3 sao (3 đêm).",
        "Các bữa ăn theo chương trình (3 bữa sáng, 3 bữa trưa, 3 bữa tối).",
        "Vé tham quan các điểm theo chương trình (trừ VinWonders).",
        "Bảo hiểm du lịch.",
      ],
      excluded: [
        "Vé máy bay/tàu hỏa khứ hồi TP.HCM - Nha Trang.",
        "Vé VinWonders Nha Trang (khoảng 950.000 VNĐ).",
        "Chi phí cá nhân, đồ uống, tips.",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 50% ngay khi đăng ký, thanh toán phần còn lại 7 ngày trước ngày khởi hành.",
      cancellation:
        "Hủy tour trước 15 ngày: hoàn 80% tiền tour; Hủy tour trước 7 ngày: hoàn 50% tiền tour; Hủy tour sau 7 ngày hoặc vắng mặt: không hoàn tiền.",
      notes:
        "Giá tour không áp dụng vào các dịp Lễ, Tết. Vui lòng mang theo CMND/CCCD/Hộ chiếu.",
    },
  },
  {
    id: 2,
    name: "Tour Đà Nẵng - Hội An 5 ngày 4 đêm",
    destination: "Đà Nẵng, Hội An",
    destinationSuggestions: ["Đà Nẵng", "Hội An", "Huế", "Phú Quốc"],
    departure: "Hà Nội",
    startDate: "2025-09-20",
    endDate: "2025-09-24",
    duration: "5 ngày 4 đêm",
    durationRange: "4-7 ngày",
    price: 5790000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2023/06/cau-vang-da-nang.png",
      "https://www.luavietours.com/wp/wp-content/uploads/2023/06/hoi-an-viet-nam.png",
    ],
    description: "Khám phá phố cổ Hội An, bãi biển Mỹ Khê và Bà Nà Hills.",
    highlights: [
      "Đi cáp treo Bà Nà Hills",
      "Check-in Cầu Vàng nổi tiếng",
      "Tham quan phố cổ Hội An về đêm",
    ],
    categoryid: 1,
    isfeatured: false,
    schedule: {
      day1: "Hà Nội - Đà Nẵng: Đến Đà Nẵng, nhận phòng, tắm biển Mỹ Khê.",
      day2: "Bà Nà Hills: Khám phá 'Đường lên tiên cảnh' Bà Nà, check-in Cầu Vàng, Làng Pháp (Bao gồm vé cáp treo).",
      day3: "Đà Nẵng - Hội An: Tham quan Ngũ Hành Sơn, di chuyển đến Hội An, khám phá Phố cổ (Chùa Cầu, nhà cổ Phùng Hưng) về đêm.",
      day4: "Hội An - Huế: Di chuyển qua đèo Hải Vân, tham quan Đại Nội Huế, Chùa Thiên Mụ.",
      day5: "Huế - Hà Nội: Mua sắm đặc sản, tiễn khách ra sân bay Đà Nẵng về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Xe vận chuyển đời mới, máy lạnh.",
        "Khách sạn tiêu chuẩn 3 sao (4 đêm).",
        "Các bữa ăn theo chương trình (4 bữa sáng, 5 bữa chính).",
        "Vé tham quan các điểm theo chương trình (Ngũ Hành Sơn, Hội An).",
        "Vé cáp treo Bà Nà Hills.",
        "Bảo hiểm du lịch.",
      ],
      excluded: [
        "Vé máy bay khứ hồi Hà Nội - Đà Nẵng.",
        "Chi phí cá nhân, đồ uống, mini bar.",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 40% ngay khi đăng ký. Thanh toán hết 10 ngày trước ngày khởi hành.",
      cancellation:
        "Hủy tour trước 15 ngày: phí 10% giá tour. Hủy tour từ 7-14 ngày: phí 30% giá tour. Hủy tour trong vòng 7 ngày: phí 100% giá tour.",
      notes:
        "Chương trình có thể thay đổi thứ tự tham quan nhưng vẫn đảm bảo đủ các điểm.",
    },
  },
  {
    id: 3,
    name: "Tour Hà Nội - Hạ Long 3 ngày 2 đêm",
    destination: "Vịnh Hạ Long, Quảng Ninh",
    destinationSuggestions: ["Hạ Long", "Sapa", "Ninh Bình", "Hà Giang"],
    departure: "Hà Nội",
    startDate: "2025-08-20",
    endDate: "2025-08-22",
    duration: "3 ngày 2 đêm",
    durationRange: "1-3 ngày",
    price: 3290000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2023/06/lang-chu-tich-ho-chi-minh.png",
      "https://www.luavietours.com/wp/wp-content/uploads/2023/07/ban-cat-cat-sapa.png",
    ],
    description:
      "Trải nghiệm du thuyền 5 sao trên vịnh Hạ Long, chiêm ngưỡng những hang động kỳ vĩ và làng chài yên bình.",
    highlights: [
      "Du thuyền 5 sao với buffet hải sản",
      "Tham quan hang Sửng Sốt",
      "Chèo kayak khám phá vịnh",
    ],
    categoryid: 1,
    isfeatured: true,
    schedule: {
      day1: "Hà Nội - Vịnh Hạ Long: Di chuyển đến Hạ Long, lên du thuyền 5 sao, nhận phòng, ăn trưa, ngắm cảnh vịnh.",
      day2: "Khám phá Vịnh: Tham quan Hang Sửng Sốt, chèo kayak tại khu vực hang Luồn, tắm biển Titop. Tham gia lớp học nấu ăn trên du thuyền.",
      day3: "Vịnh Hạ Long - Hà Nội: Tập Taichi buổi sáng, tham quan Làng Chài. Ăn trưa, làm thủ tục trả phòng, về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Xe đưa đón khứ hồi Hà Nội - Hạ Long (Limousine/xe du lịch cao cấp).",
        "2 đêm ngủ trên Du thuyền 5 sao (phòng đôi/twin).",
        "Các bữa ăn theo chương trình (2 bữa sáng, 3 bữa trưa, 2 bữa tối - có 1 bữa buffet hải sản).",
        "Vé tham quan, chèo kayak, tập Taichi.",
        "Hướng dẫn viên chuyên nghiệp.",
      ],
      excluded: ["Đồ uống trên du thuyền, dịch vụ spa, giặt là.", "Thuế VAT."],
    },
    policy: {
      booking: "Đặt cọc 60% khi xác nhận, thanh toán trước 15 ngày khởi hành.",
      cancellation:
        "Hủy tour trước 20 ngày: Phí 10%. Hủy tour 10-19 ngày: Phí 30%. Hủy tour 5-9 ngày: Phí 70%. Hủy tour dưới 5 ngày: Phí 100%.",
      notes:
        "Lịch trình có thể thay đổi do điều kiện thời tiết hoặc quyết định của Ban quản lý Vịnh.",
    },
  },
  {
    id: 4,
    name: "Tour Sapa 4 ngày 3 đêm",
    destination: "Sapa, Lào Cai",
    destinationSuggestions: ["Sapa", "Hà Giang", "Ninh Bình", "Đà Lạt"],
    departure: "Hà Nội",
    startDate: "2025-09-10",
    endDate: "2025-09-13",
    duration: "4 ngày 3 đêm",
    durationRange: "4-7 ngày",
    price: 4590000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2023/07/dinh-fansipan-sapa.png",
      "https://www.luavietours.com/wp/wp-content/uploads/2023/07/hang-mua-ninh-binh.png",
    ],
    description: "Khám phá ruộng bậc thang, Fansipan và văn hóa người H'Mông.",
    highlights: [
      "Đi cáp treo Fansipan",
      "Tham quan bản Cát Cát",
      "Chợ phiên Bắc Hà",
    ],
    categoryid: 1,
    isfeatured: false,
    schedule: {
      day1: "Hà Nội - Sapa: Khởi hành đi Sapa bằng xe giường nằm cao cấp. Nhận phòng khách sạn.",
      day2: "Fansipan: Chinh phục đỉnh Fansipan (vé cáp treo tự túc). Chiều tham quan Bản Cát Cát của người H'Mông.",
      day3: "Chợ phiên Bắc Hà: (Nếu vào Chủ nhật) Tham quan chợ phiên Bắc Hà. Chiều tham quan Thung lũng Mường Hoa và bãi đá cổ Sapa.",
      day4: "Sapa - Hà Nội: Tham quan Nhà thờ Đá Sapa, mua sắm. Trở về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Xe giường nằm khứ hồi Hà Nội - Sapa.",
        "Khách sạn tiêu chuẩn 3 sao (3 đêm).",
        "Các bữa ăn theo chương trình (3 bữa sáng, 4 bữa chính).",
        "Vé tham quan các điểm theo chương trình (Bản Cát Cát, Mường Hoa).",
        "Bảo hiểm du lịch.",
      ],
      excluded: [
        "Vé cáp treo Fansipan (khoảng 800.000 VNĐ).",
        "Chi phí cá nhân, đồ uống, mua sắm tại chợ phiên.",
      ],
    },
    policy: {
      booking:
        "Đăng ký và đặt cọc 30% giá tour. Hoàn tất thanh toán trước 7 ngày khởi hành.",
      cancellation:
        "Hủy tour trước 10 ngày: Phí 20%. Hủy tour 5-9 ngày: Phí 50%. Hủy tour dưới 5 ngày: Phí 100%.",
      notes:
        "Chương trình tham quan Chợ phiên Bắc Hà chỉ áp dụng vào Chủ nhật hàng tuần. Vui lòng chuẩn bị áo ấm.",
    },
  },
  {
    id: 5,
    name: "Tour Singapore - Malaysia 6 ngày 5 đêm",
    destination: "Singapore, Malaysia",
    destinationSuggestions: ["Singapore", "Malaysia", "Thái Lan", "Hàn Quốc"],
    departure: "Hà Nội",
    startDate: "2025-10-10",
    endDate: "2025-10-15",
    duration: "6 ngày 5 đêm",
    durationRange: "4-7 ngày",
    price: 15990000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2025/01/1-singapore-gay-an-tuong-voi-moi-truong-xanh-sach-dep.jpg",
      "https://www.luavietours.com/wp/wp-content/uploads/2025/01/2-su-tich-ten-goi-day-ki-bi-tai-singapore.jpg",
    ],
    description:
      "Khám phá văn hóa đa dạng, các công trình kiến trúc hiện đại và mua sắm tại thiên đường shopping Đông Nam Á.",
    highlights: [
      "Tham quan Marina Bay Sands và Gardens by the Bay",
      "Trải nghiệm Sentosa Island",
      "Thưởng thức ẩm thực đường phố Penang",
    ],
    categoryid: 2,
    isfeatured: true,
    schedule: {
      day1: "Hà Nội - Singapore: Khởi hành, tham quan Công viên Merlion, Nhà hát Esplanade.",
      day2: "Singapore: Gardens by the Bay, mua sắm tại khu phố Tàu (Chinatown), Sentosa Island.",
      day3: "Singapore - Malacca (Malaysia): Di chuyển bằng xe qua cửa khẩu, tham quan thành phố cổ Malacca (Quảng trường Hà Lan, Pháo đài cổ).",
      day4: "Malacca - Kuala Lumpur: Tham quan động Batu Caves, Tháp đôi Petronas (chụp ảnh bên ngoài), mua sắm.",
      day5: "Kuala Lumpur: Tham quan Cung điện Hoàng gia, Đài tưởng niệm Quốc gia. Tự do mua sắm.",
      day6: "Kuala Lumpur - Hà Nội: Mua sắm tại Putrajaya (thành phố thông minh). Ra sân bay về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi (Hà Nội - Singapore/Kuala Lumpur - Hà Nội).",
        "Khách sạn tiêu chuẩn 3-4 sao (5 đêm).",
        "Các bữa ăn theo chương trình (5 bữa sáng, 6 bữa chính).",
        "Xe vận chuyển tại nước ngoài.",
        "Vé tham quan các điểm theo chương trình.",
        "Bảo hiểm du lịch quốc tế.",
      ],
      excluded: [
        "Hộ chiếu, visa (nếu có).",
        "Tiền tips cho HDV và tài xế (khoảng 5 USD/khách/ngày).",
        "Chi phí cá nhân.",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 5.000.000 VNĐ/khách. Hoàn tất thanh toán 21 ngày trước khởi hành.",
      cancellation:
        "Hủy tour sau khi đặt cọc: Phí 100% tiền cọc. Hủy tour 14-20 ngày: Phí 50% giá tour. Hủy tour dưới 14 ngày: Phí 100% giá tour.",
      notes:
        "Yêu cầu hộ chiếu còn hạn ít nhất 6 tháng. Khách nên đổi tiền ngoại tệ trước chuyến đi.",
    },
  },
  {
    id: 6,
    name: "Tour Thái Lan 5 ngày 4 đêm",
    destination: "Bangkok, Pattaya",
    destinationSuggestions: ["Thái Lan", "Singapore", "Malaysia", "Hàn Quốc"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2025-11-01",
    endDate: "2025-11-05",
    duration: "5 ngày 4 đêm",
    durationRange: "4-7 ngày",
    price: 10990000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2024/08/2-chua-wat-phra-yai-noi-tieng-voi-tuong-phat-vang-cao-den-18m.jpg",
      "https://www.luavietours.com/wp/wp-content/uploads/2024/08/3-ve-dep-doc-dao-cua-he-thong-kenh-rach-tai-thai-lan.jpg",
    ],
    description: "Tham quan chùa Vàng, đảo san hô và trải nghiệm ẩm thực Thái.",
    highlights: [
      "Dạo thuyền trên sông Chao Phraya",
      "Tham quan cung điện Hoàng Gia",
      "Show Alcazar Cabaret",
    ],
    categoryid: 2,
    isfeatured: false,
    schedule: {
      day1: "TP.HCM - Bangkok - Pattaya: Đến Bangkok, di chuyển đi Pattaya, thưởng thức show Alcazar Cabaret.",
      day2: "Pattaya: Tham quan Đảo San Hô (Coral Island) bằng tàu cao tốc, tự do tắm biển và tham gia các trò chơi thể thao nước.",
      day3: "Pattaya - Bangkok: Tham quan Trân Bảo Phật Sơn, vườn nho Silver Lake. Chiều về Bangkok, dạo thuyền trên sông Chao Phraya.",
      day4: "Bangkok: Tham quan Cung điện Hoàng gia, Chùa Vàng (Wat Traimit), shopping tại trung tâm thương mại Big C/Siam Paragon.",
      day5: "Bangkok - TP.HCM: Tự do mua sắm đến giờ ra sân bay về TP.HCM.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi (TP.HCM - Bangkok).",
        "Khách sạn tiêu chuẩn 4 sao (4 đêm).",
        "Các bữa ăn theo chương trình (4 bữa sáng, 5 bữa chính).",
        "Vé tham quan các điểm theo chương trình, vé show Alcazar.",
        "Hướng dẫn viên suốt tuyến.",
        "Bảo hiểm du lịch quốc tế.",
      ],
      excluded: [
        "Hộ chiếu, chi phí cá nhân.",
        "Tiền tips cho HDV và tài xế (khoảng 3 USD/khách/ngày).",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 4.000.000 VNĐ/khách. Thanh toán phần còn lại 14 ngày trước ngày đi.",
      cancellation:
        "Hủy tour ngay sau khi đặt cọc hoặc hủy tour 10-14 ngày trước khởi hành: Phí 50% giá tour. Hủy tour dưới 10 ngày: Phí 100% giá tour.",
      notes:
        "Giá tour có thể thay đổi tùy thuộc vào thời điểm xuất vé máy bay.",
    },
  },
  {
    id: 7,
    name: "Tour Nhật Bản 7 ngày 6 đêm",
    destination: "Tokyo, Kyoto, Osaka",
    destinationSuggestions: ["Nhật Bản", "Hàn Quốc", "Trung Quốc", "Đài Loan"],
    departure: "Hà Nội",
    startDate: "2025-12-01",
    endDate: "2025-12-07",
    duration: "7 ngày 6 đêm",
    durationRange: "8-14 ngày",
    price: 35990000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2024/06/1-nhung-dieu-thu-vi-ve-nhat-ban-chinh-la-quoc-gia-nay-khong-co-thu-do.jpg",
      "https://www.luavietours.com/wp/wp-content/uploads/2024/06/3-tap-tuc-coi-giay-truoc-khi-vao-nha-rat-pho-bien-tai-nhat-ban.jpg",
    ],
    description:
      "Khám phá mùa lá đỏ Nhật Bản với những ngôi chùa cổ kính và cảnh quan tuyệt đẹp.",
    highlights: ["Núi Phú Sĩ", "Chùa Kiyomizu-dera", "Phố cổ Gion"],
    categoryid: 2,
    isfeatured: true,
    schedule: {
      day1: "Hà Nội - Tokyo: Khởi hành, nghỉ đêm trên máy bay.",
      day2: "Tokyo: Tham quan Đền thờ Asakusa Kannon, chụp ảnh Tháp Tokyo Skytree, mua sắm tại Ginza.",
      day3: "Núi Phú Sĩ - Kawaguchiko: Khám phá Núi Phú Sĩ (Tầng 5 - tùy điều kiện thời tiết), Làng cổ Oshino Hakkai.",
      day4: "Tokyo - Kyoto (Tàu Shinkansen): Trải nghiệm tàu cao tốc Shinkansen, đến Kyoto, tham quan Chùa Vàng Kinkaku-ji.",
      day5: "Kyoto - Osaka: Tham quan Chùa Kiyomizu-dera, Rừng tre Arashiyama. Chiều di chuyển đến Osaka.",
      day6: "Osaka: Tham quan Lâu đài Osaka (bên ngoài), khu Dotonbori. Tự do mua sắm.",
      day7: "Osaka - Hà Nội: Ra sân bay quốc tế Kansai về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi (Hà Nội - Tokyo/Osaka - Hà Nội).",
        "Khách sạn tiêu chuẩn 4 sao (5 đêm).",
        "Vé tàu Shinkansen 1 chặng.",
        "Các bữa ăn theo chương trình (6 bữa sáng, 7 bữa chính).",
        "Visa nhập cảnh Nhật Bản.",
        "Bảo hiểm du lịch quốc tế (mức 1 tỷ VNĐ).",
        "Tiền tips cho HDV và tài xế.",
      ],
      excluded: ["Chi phí cá nhân, đồ uống, mua sắm."],
    },
    policy: {
      booking:
        "Đặt cọc 10.000.000 VNĐ/khách và nộp hồ sơ xin Visa. Hoàn tất thanh toán 30 ngày trước khởi hành.",
      cancellation:
        "Trượt Visa: Phí 3.000.000 VNĐ/khách. Hủy tour sau khi có Visa: Phí 100% tiền cọc và phí Visa. Hủy tour dưới 21 ngày: Phí 100% giá tour.",
      notes:
        "Hồ sơ Visa phải được nộp sớm. Mùa lá đỏ đẹp nhất thường vào cuối tháng 11 - đầu tháng 12.",
    },
  },
  {
    id: 8,
    name: "Tour Hàn Quốc 5 ngày 4 đêm",
    destination: "Seoul, Nami, Busan",
    destinationSuggestions: ["Hàn Quốc", "Nhật Bản", "Đài Loan", "Thái Lan"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2025-10-20",
    endDate: "2025-10-24",
    duration: "5 ngày 4 đêm",
    durationRange: "4-7 ngày",
    price: 18990000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2025/01/1-mot-so-bi-quyet-mua-sam-tiet-kiem-tai-han-quoc-du-khach-khong-the-bo-lo.jpg",
      "https://www.luavietours.com/wp/wp-content/uploads/2025/01/3-cac-thuong-hieu-my-pham-han-quoc-kha-duoc-ua-chuong-hien-nay.jpg",
    ],
    description:
      "Tham quan đảo Nami, cung điện Gyeongbokgung và chợ đêm Myeongdong.",
    highlights: [
      "Mặc hanbok truyền thống",
      "Đi bộ trên cầu kính Sky Walk",
      "Trải nghiệm làm kimchi",
    ],
    categoryid: 2,
    isfeatured: false,
    schedule: {
      day1: "TP.HCM - Seoul: Khởi hành, đến sân bay Incheon, về Seoul, nhận phòng khách sạn.",
      day2: "Seoul - Nami: Tham quan Đảo Nami (bối cảnh phim 'Bản tình ca mùa đông'), trải nghiệm làm Kim Chi và mặc Hanbok truyền thống.",
      day3: "Seoul: Tham quan Cung điện Gyeongbokgung, Làng cổ Bukchon Hanok, Nhà Xanh (dinh Tổng thống), tháp Namsan (chưa bao gồm vé lên tháp).",
      day4: "Seoul - Busan: Di chuyển bằng tàu KTX đến Busan. Tham quan Làng văn hóa Gamcheon, công viên Taejongdae.",
      day5: "Busan - TP.HCM: Tự do mua sắm tại chợ Jagalchi, ra sân bay về TP.HCM.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi (TP.HCM - Seoul/Busan - TP.HCM).",
        "Khách sạn tiêu chuẩn 3-4 sao (4 đêm).",
        "Vé tàu KTX 1 chặng.",
        "Các bữa ăn theo chương trình (4 bữa sáng, 5 bữa chính).",
        "Vé tham quan các điểm theo chương trình.",
        "Bảo hiểm du lịch quốc tế.",
      ],
      excluded: [
        "Hộ chiếu, chi phí cá nhân.",
        "Tiền tips cho HDV và tài xế (khoảng 6 USD/khách/ngày).",
        "Vé lên tháp Namsan.",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 6.000.000 VNĐ/khách. Hoàn tất thanh toán 20 ngày trước khởi hành.",
      cancellation:
        "Hủy tour sau khi đặt cọc: Phí 100% tiền cọc. Hủy tour 10-19 ngày: Phí 70% giá tour. Hủy tour dưới 10 ngày: Phí 100% giá tour.",
      notes:
        "Chương trình tour được sắp xếp để ngắm lá vàng/lá đỏ vào tháng 10. Vui lòng chuẩn bị giấy tờ cần thiết.",
    },
  },
  {
    id: 9,
    name: "Tour Phú Quốc 4 ngày 3 đêm (trọn gói)",
    destination: "Phú Quốc, Kiên Giang",
    destinationSuggestions: ["Phú Quốc", "Nha Trang", "Đà Nẵng", "Hạ Long"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2025-08-25",
    endDate: "2025-08-28",
    duration: "4 ngày 3 đêm",
    durationRange: "4-7 ngày",
    price: 6990000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2024/11/grand-world-phu-quoc.jpg",
      "https://www.luavietours.com/wp/wp-content/uploads/2023/05/phu-quoc.jpeg",
    ],
    description:
      "Tour trọn gói nghỉ dưỡng tại resort 5 sao, bao gồm vé máy bay khứ hồi.",
    highlights: [
      "Tắm biển Bãi Sao",
      "Tham quan VinWonders & Safari",
      "Câu cá, lặn ngắm san hô",
    ],
    categoryid: 3,
    isfeatured: true,
    schedule: {
      day1: "TP.HCM - Phú Quốc: Đến Phú Quốc, xe đưa đón về resort 5 sao. Tự do tắm biển/hồ bơi.",
      day2: "Nam Đảo: Tham quan Hòn Thơm (cáp treo), Nhà tù Phú Quốc, Tắm biển Bãi Sao, Câu cá, lặn ngắm san hô.",
      day3: "Bắc Đảo: Khám phá VinWonders & Vinpearl Safari (chi phí tự túc), dạo phố không ngủ Grand World.",
      day4: "Phú Quốc - TP.HCM: Tham quan Cơ sở sản xuất Nước Mắm, Vườn Tiêu. Trả phòng, ra sân bay về TP.HCM.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi TP.HCM - Phú Quốc (bao gồm 7kg hành lý xách tay).",
        "Nghỉ dưỡng tại Resort/Khách sạn 5 sao (3 đêm).",
        "Các bữa ăn theo chương trình (3 bữa sáng buffet, 3 bữa trưa, 3 bữa tối).",
        "Xe vận chuyển tham quan và đón tiễn sân bay.",
        "Vé cáp treo Hòn Thơm khứ hồi.",
        "Bảo hiểm du lịch.",
      ],
      excluded: [
        "Vé VinWonders & Vinpearl Safari.",
        "Chi phí cá nhân, các trò chơi trên biển.",
      ],
    },
    policy: {
      booking:
        "Thanh toán 100% giá tour ngay khi đăng ký để giữ vé máy bay và phòng resort.",
      cancellation:
        "Do tính chất tour trọn gói, hủy tour sau khi đăng ký: Phí 80% giá tour. Hủy tour trước 7 ngày: Phí 100% giá tour.",
      notes: "Vui lòng cung cấp danh sách khách chính xác để xuất vé máy bay.",
    },
  },
  {
    id: 10,
    name: "Tour Đà Lạt 3 ngày 2 đêm (trọn gói)",
    destination: "Đà Lạt, Lâm Đồng",
    destinationSuggestions: ["Đà Lạt", "Sapa", "Ninh Bình", "Huế"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2025-09-05",
    endDate: "2025-09-07",
    duration: "3 ngày 2 đêm",
    durationRange: "1-3 ngày",
    price: 3790000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2018/09/da-lat.jpg",
      "https://www.luavietours.com/wp/wp-content/uploads/contents_luavietours/upload/Image/lua-viet-tour-da-lat-tet-binh-than-1phan-tram20phan-tram282phan-tram29.jpg",
    ],
    description:
      "Tour trọn gói nghỉ dưỡng, tham quan các điểm nổi tiếng ở Đà Lạt.",
    highlights: ["Vườn hoa thành phố", "Thác Datanla", "Quảng trường Lâm Viên"],
    categoryid: 3,
    isfeatured: false,
    schedule: {
      day1: "TP.HCM - Đà Lạt: Đến Đà Lạt, tham quan Thiền Viện Trúc Lâm, Hồ Tuyền Lâm, Thác Datanla (tự túc máng trượt). Tối tự do khám phá chợ đêm.",
      day2: "Khám phá Đà Lạt: Tham quan Nhà thờ Domaine De Marie, Vườn hoa Thành phố, Quảng trường Lâm Viên (Hồ Xuân Hương). Tối thưởng thức ẩm thực Đà Lạt.",
      day3: "Đà Lạt - TP.HCM: Tham quan Ga Đà Lạt cổ, Chùa Linh Phước (chùa Ve Chai). Ra sân bay Liên Khương về TP.HCM.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi TP.HCM - Đà Lạt (bao gồm 7kg hành lý xách tay).",
        "Khách sạn tiêu chuẩn 3 sao (2 đêm).",
        "Các bữa ăn theo chương trình (2 bữa sáng, 3 bữa chính).",
        "Xe vận chuyển tham quan và đón tiễn sân bay.",
        "Vé tham quan các điểm theo chương trình.",
        "Bảo hiểm du lịch.",
      ],
      excluded: [
        "Vé máng trượt Thác Datanla, vé cáp treo.",
        "Hành lý ký gửi máy bay.",
      ],
    },
    policy: {
      booking: "Đặt cọc 100% giá tour. Tour trọn gói, không giữ chỗ.",
      cancellation: "Không hoàn lại tiền tour nếu hủy với bất kỳ lý do nào.",
      notes:
        "Đà Lạt thời tiết se lạnh, vui lòng chuẩn bị áo ấm. Giá tour có thể thay đổi tùy thuộc vào giá vé máy bay.",
    },
  },
  {
    id: 11,
    name: "Tour Huế - Đà Nẵng - Hội An 5 ngày 4 đêm (trọn gói)",
    destination: "Huế, Đà Nẵng, Hội An",
    destinationSuggestions: ["Huế", "Đà Nẵng", "Hội An", "Quảng Bình"],
    departure: "Hà Nội",
    startDate: "2025-09-12",
    endDate: "2025-09-16",
    duration: "5 ngày 4 đêm",
    durationRange: "4-7 ngày",
    price: 6390000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/2025/06/6-khong-gian-day-thanh-binh-va-trong-lanh-tai-lang-huong.jpg",
      "https://www.luavietours.com/wp/wp-content/uploads/2025/06/3-thang-3-den-thang-8-la-thoi-gian-thich-hop-de-kham-pha-lang-huong.jpg",
    ],
    description: "Tour trọn gói khám phá di sản miền Trung.",
    highlights: ["Đại Nội Huế", "Cầu Vàng Bà Nà Hills", "Phố cổ Hội An"],
    categoryid: 3,
    isfeatured: true,
    schedule: {
      day1: "Hà Nội - Huế: Đến Huế, nhận phòng, tham quan Đại Nội, Chùa Thiên Mụ. Thưởng thức Nhã nhạc Cung đình trên sông Hương (chi phí tự túc).",
      day2: "Huế - Đà Nẵng: Tham quan Lăng Minh Mạng, Lăng Khải Định. Chiều di chuyển qua Đèo Hải Vân đến Đà Nẵng.",
      day3: "Bà Nà Hills: Trọn ngày vui chơi tại Bà Nà Hills (bao gồm vé cáp treo và buffet trưa).",
      day4: "Đà Nẵng - Hội An: Tham quan Bán đảo Sơn Trà (Chùa Linh Ứng). Chiều tham quan Phố cổ Hội An, tự do mua sắm đèn lồng.",
      day5: "Đà Nẵng - Hà Nội: Mua sắm tại chợ Hàn, tiễn khách ra sân bay Đà Nẵng về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi Hà Nội - Huế/Đà Nẵng - Hà Nội (bao gồm 7kg hành lý xách tay).",
        "Khách sạn tiêu chuẩn 4 sao (4 đêm).",
        "Các bữa ăn theo chương trình (4 bữa sáng, 5 bữa trưa, 4 bữa tối).",
        "Vé cáp treo Bà Nà Hills và buffet trưa trên Bà Nà.",
        "Vé tham quan các điểm theo chương trình.",
        "Bảo hiểm du lịch.",
      ],
      excluded: [
        "Hành lý ký gửi máy bay.",
        "Chi phí cá nhân, Nhã nhạc Cung đình.",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 50% giá tour. Thanh toán phần còn lại 10 ngày trước khởi hành.",
      cancellation:
        "Hủy tour sau khi xuất vé máy bay: Phí 100% vé máy bay. Hủy tour 5-9 ngày trước khởi hành: Phí 70% giá tour (bao gồm vé máy bay). Hủy tour dưới 5 ngày: Phí 100% giá tour.",
      notes: "Chất lượng dịch vụ được đảm bảo theo tiêu chuẩn 4 sao.",
    },
  },
  {
    id: 12,
    name: "Tour Bangkok - Chiang Mai 7 ngày 6 đêm (trọn gói)",
    destination: "Bangkok, Chiang Mai",
    destinationSuggestions: ["Bangkok", "Chiang Mai", "Pattaya", "Phuket"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2025-11-15",
    endDate: "2025-11-21",
    duration: "7 ngày 6 đêm",
    durationRange: "8-14 ngày",
    price: 18990000,
    images: [
      "https://www.luavietours.com/wp/wp-content/uploads/contents_luavietours/upload/Image/du-lich-bangkok-1.jpg",
      "https://www.luavietours.com/wp/wp-content/uploads/contents_luavietours/upload/Image/du-lich-bangkok-2.jpg",
    ],
    description:
      "Tour trọn gói khám phá Bangkok sôi động và Chiang Mai yên bình.",
    highlights: [
      "Chùa Trắng Wat Rong Khun",
      "Chợ đêm Chiang Mai",
      "Hoàng cung Bangkok",
    ],
    categoryid: 3,
    isfeatured: false,
    schedule: {
      day1: "TP.HCM - Bangkok: Đến Bangkok, tham quan tượng Phật Bốn Mặt. Tối tự do khám phá ẩm thực đường phố.",
      day2: "Bangkok: Tham quan Hoàng Cung, Chùa Phật Ngọc, du thuyền trên sông Chao Phraya. Chiều bay đi Chiang Mai.",
      day3: "Chiang Mai: Tham quan Chùa Phrathat Doi Suthep, Làng Dân Tộc Cổ Dài (Long Neck Karen), mua sắm tại chợ đêm Chiang Mai.",
      day4: "Chiang Mai - Chiang Rai: Thăm Chùa Trắng (Wat Rong Khun), Tam Giác Vàng. Nghỉ đêm tại Chiang Rai.",
      day5: "Chiang Rai - Bangkok: Thăm Chùa Xanh (Wat Rong Suea Ten), di chuyển ra sân bay về lại Bangkok.",
      day6: "Bangkok: Tham quan Bảo tàng Quốc gia Bangkok, tự do mua sắm tại các trung tâm thương mại lớn.",
      day7: "Bangkok - TP.HCM: Tự do đến giờ ra sân bay về TP.HCM.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi (TP.HCM - Bangkok - TP.HCM).",
        "Vé máy bay nội địa 2 chặng (Bangkok - Chiang Mai/Chiang Rai - Bangkok).",
        "Khách sạn tiêu chuẩn 4 sao (6 đêm).",
        "Các bữa ăn theo chương trình (6 bữa sáng, 7 bữa chính).",
        "Vé tham quan các điểm theo chương trình.",
        "Tiền tips cho HDV và tài xế.",
        "Bảo hiểm du lịch quốc tế.",
      ],
      excluded: ["Hộ chiếu, chi phí cá nhân, đồ uống."],
    },
    policy: {
      booking:
        "Đặt cọc 8.000.000 VNĐ/khách. Hoàn tất thanh toán 20 ngày trước ngày đi.",
      cancellation:
        "Hủy tour sau khi xuất vé máy bay nội địa/quốc tế: Phí 100% tiền vé. Hủy tour dưới 15 ngày: Phí 100% giá tour.",
      notes:
        "Chương trình tham quan tại Chiang Mai và Chiang Rai chủ yếu đi bộ, cần chuẩn bị giày thể thao thoải mái.",
    },
  },
];

// Middleware xác thực JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Không có token" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ" });
    req.user = user;
    next();
  });
};

//API Producst. Tạm bỏ đi cho thằng query ở dưới
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

//API Products theo filter
app.get("/api/products", (req, res) => {
  const { id, departure } = req.query;
  const page = parseInt(req.query.page); // Trang hiện tại
  const limit = parseInt(req.query.limit); // Số item mỗi trang

  let filterProducts = products; // bắt đầu với tất cả sản phẩm

  // Nếu có id → lọc theo categoryid trước
  if (id) {
    const productId = Number(id);
    filterProducts = filterProducts.filter((p) => p.categoryid === productId);
  }

  // Lọc theo nơi khởi hành (departure). Hoặc Sau khi lọc id xong → nếu có departure → lọc tiếp trong list đã được lọc
  if (departure) {
    filterProducts = filterProducts.filter(
      (p) => p.departure.toLowerCase() === departure.toLowerCase()
    );
  }

  // Không tìm thấy
  if (filterProducts.length === 0) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }

  //Phân trang
  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const data = filterProducts.slice(startIndex, endIndex);

    res.json({
      page,
      limit,
      total: filterProducts.length,
      totalPages: Math.ceil(filterProducts.length / limit),
      data,
    });
  }

  //Còn không có 3 thằng trên thì nó sẽ hiện ra sản phẩm như thường
  res.json(filterProducts);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => String(p.id) === req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Không tìm sản phẩm" });
});

// API Xác thực
app.post("/api/signup", (req, res) => {
  const { email, password, name, phone } = req.body;
  if (!email || !password || !name || !phone) {
    return res.status(400).json({ message: "Vui Lòng Điền Đủ Thông Tin" });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "Email đã tồn tại" });
  }
  const newUser = {
    email,
    password,
    name,
    phone,
    id: Date.now().toString(),
  };
  users.push(newUser);
  res.status(201).json({ message: "Đăng ký thành công" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email và password là bắt buộc" });
  }
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user)
    return res.status(401).json({ message: "Thông tin đăng nhập sai" });
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "30m",
  });
  res.json({ accessToken: token });
});

// API Lấy danh sách users
app.get("/api/users", authenticateJWT, (req, res) => {
  const userList = users.map(({ id, email }) => ({ id, email }));
  res.json(userList);
});

app.listen(port, () => console.log(`Server chạy tại http://localhost:${port}`));
