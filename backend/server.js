const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "PROJECT_MANAGER_SECRET";
const port = 5000;

app.use(cors());
app.use(express.json());

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
    slug: "tour-nha-trang-4-ngay-3-dem",
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
    slug: "tour-da-nang-hoi-an-5-ngay-4-dem",
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
    slug: "tour-ha-noi-ha-long-3-ngay-2-dem",
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
    slug: "tour-sapa-4-ngay-3-dem",
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
    slug: "tour-singapore-malaysia-6-ngay-5-dem",
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
    slug: "tour-thai-lan-5-ngay-4-dem",
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
    slug: "tour-nhat-ban-7-ngay-6-dem",
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
    slug: "tour-han-quoc-5-ngay-4-dem",
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
    slug: "tour-phu-quoc-4-ngay-3-dem",
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
    slug: "tour-da-lat-3-ngay-2-dem",
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
    slug: "tour-hue-da-nang-5-ngay-4-dem",
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
    slug: "tour-bangkok-chiangmai-4-ngay-3-dem",
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
  {
    id: 13,
    name: "Tour Tây Bắc 5 ngày 4 đêm: Hà Nội - Mai Châu - Mộc Châu",
    slug: "tour-tay-bac-5-ngay-4-dem",
    destination: "Mai Châu, Mộc Châu, Hòa Bình, Sơn La",
    destinationSuggestions: ["Mai Châu", "Mộc Châu", "Sapa", "Hà Giang"],
    departure: "Hà Nội",
    startDate: "2025-10-05",
    endDate: "2025-10-09",
    duration: "5 ngày 4 đêm",
    durationRange: "4-7 ngày",
    price: 4350000,
    images: [
      "https://maichauhideaway.com/Data/Sites/1/media/tin-tuc/%E1%BA%A3nh-b%C3%A0i-vi%E1%BA%BFt/t4-2025/du-l%E1%BB%8Bch-t%C3%A2y-b%E1%BA%AFc-th%C3%A1ng-7/du-l%E1%BB%8Bch-t%C3%A2y-b%E1%BA%AFc-th%C3%A1ng-7-(2).png",
      "https://product.hstatic.net/200000712583/product/ngam-deo-khau-pha_96df964d49ba4d27919226b02d178a27.jpg",
    ],
    description:
      "Khám phá vẻ đẹp yên bình của Mai Châu, các đồi chè xanh mướt và nông trường bò sữa ở Mộc Châu.",
    highlights: [
      "Ngủ homestay tại Bản Lác (Mai Châu)",
      "Tham quan đồi chè trái tim Mộc Châu",
      "Thác Dải Yếm",
    ],
    categoryid: 1,
    isfeatured: true,
    schedule: {
      day1: "Hà Nội - Mai Châu: Di chuyển đến Mai Châu, nhận homestay, đạp xe khám phá Bản Lác, Bản Pom Coọng.",
      day2: "Mai Châu - Mộc Châu: Tham quan Hang Chiều. Di chuyển đi Mộc Châu, khám phá Rừng thông Bản Áng.",
      day3: "Mộc Châu: Đồi chè trái tim, Nông trường bò sữa, Thác Dải Yếm. Tối tham gia lửa trại/ giao lưu văn nghệ dân tộc.",
      day4: "Mộc Châu - Hòa Bình: Thăm quan Cổng trời Y Tý (chiều), Tối nghỉ tại Hòa Bình.",
      day5: "Hòa Bình - Hà Nội: Tham quan nhà máy thủy điện Hòa Bình. Trở về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Xe du lịch đời mới đưa đón suốt tuyến.",
        "Khách sạn/homestay tiêu chuẩn (4 đêm).",
        "Các bữa ăn theo chương trình (4 bữa sáng, 5 bữa chính).",
        "Vé tham quan các điểm theo chương trình.",
        "Bảo hiểm du lịch.",
      ],
      excluded: ["Chi phí cá nhân, đồ uống, giao lưu văn nghệ."],
    },
    policy: {
      booking:
        "Đặt cọc 30% khi đăng ký. Thanh toán hết 7 ngày trước ngày khởi hành.",
      cancellation:
        "Hủy tour trước 10 ngày: Phí 10%. Hủy tour 5-9 ngày: Phí 50%. Hủy tour dưới 5 ngày: Phí 100%.",
      notes:
        "Nên mang theo giày thể thao, áo ấm mỏng và chuẩn bị pin sạc dự phòng.",
    },
  },
  {
    id: 14,
    name: "Tour khám phá Miền Tây 3 ngày 2 đêm: Cần Thơ - Châu Đốc - Hà Tiên",
    slug: "tour-mien-tay-3-ngay-2-dem",
    destination: "Cần Thơ, An Giang, Kiên Giang",
    destinationSuggestions: ["Cần Thơ", "An Giang", "Hà Tiên", "Phú Quốc"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2025-11-20",
    endDate: "2025-11-22",
    duration: "3 ngày 2 đêm",
    durationRange: "1-3 ngày",
    price: 3150000,
    images: [
      "https://hoangviettourist.com/wp-content/uploads/2023/11/100.jpg",
      "https://pvv-photo.phuotvivu.com/res/photo/0/d/d/9/s0x0/c-n-th-i-s-n-1624508729168.jpg",
    ],
    description:
      "Hành trình khám phá nét văn hóa sông nước độc đáo của Miền Tây Nam Bộ.",
    highlights: [
      "Chợ nổi Cái Răng (Cần Thơ)",
      "Miếu Bà Chúa Xứ Núi Sam (Châu Đốc)",
      "Khu du lịch Mũi Nai (Hà Tiên)",
    ],
    categoryid: 1,
    isfeatured: false,
    schedule: {
      day1: "TP.HCM - Cần Thơ: Khởi hành đi Cần Thơ, nhận phòng. Chiều tham quan Nhà cổ Bình Thủy, tối dạo Bến Ninh Kiều.",
      day2: "Cần Thơ - Châu Đốc: Thăm Chợ nổi Cái Răng vào buổi sáng. Di chuyển về Châu Đốc (An Giang), tham quan Rừng Tràm Trà Sư, Miếu Bà Chúa Xứ.",
      day3: "Châu Đốc - Hà Tiên - TP.HCM: Khám phá Thạch Động, Lăng Mạc Cửu (Hà Tiên). Sau đó về TP.HCM.",
    },
    priceDetails: {
      included: [
        "Xe vận chuyển đời mới, máy lạnh.",
        "Khách sạn tiêu chuẩn 3 sao (2 đêm).",
        "Các bữa ăn theo chương trình (2 bữa sáng, 3 bữa trưa, 2 bữa tối).",
        "Vé tham quan các điểm, tàu đi chợ nổi Cái Răng.",
        "Bảo hiểm du lịch.",
      ],
      excluded: [
        "Chi phí vào Rừng Tràm Trà Sư (tự túc vé thuyền).",
        "Chi phí cá nhân.",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 50% khi đăng ký. Thanh toán phần còn lại 5 ngày trước khởi hành.",
      cancellation:
        "Hủy tour trước 7 ngày: hoàn 70% tiền tour. Hủy tour trong vòng 3 ngày: không hoàn tiền.",
      notes:
        "Chương trình tour đi bằng xe khách, quý khách nên mang theo mũ nón, kem chống nắng.",
    },
  },
  {
    id: 15,
    name: "Tour Đài Loan 5 ngày 4 đêm: Đài Bắc - Đài Trung (Mùa hoa Anh Đào)",
    slug: "tour-dai-loan-5-ngay-4-dem",
    destination: "Đài Loan",
    destinationSuggestions: ["Đài Loan", "Hàn Quốc", "Nhật Bản", "Hồng Kông"],
    departure: "Hà Nội/TP. Hồ Chí Minh",
    startDate: "2026-03-25",
    endDate: "2026-03-29",
    duration: "5 ngày 4 đêm",
    durationRange: "4-7 ngày",
    price: 14590000,
    images: [
      "https://letravel.vn/uploaded/tour/tour-dai-loan/tourdulichdailoanmuahoaanhdao5n4dem.jpg",
      "https://booking.pystravel.vn/uploads/posts/albums/6963/f69bdff52a1da1672c7a4927546ca214.jpg",
    ],
    description:
      "Khám phá xứ sở trà sữa và những nét văn hóa độc đáo, ghé thăm Đài Bắc hiện đại và Đài Trung lãng mạn.",
    highlights: [
      "Tháp Taipei 101 (chụp ảnh bên ngoài)",
      "Hồ Nhật Nguyệt (Sun Moon Lake)",
      "Phố cổ Thập Phần (Shifen)",
      "Chợ đêm Sĩ Lâm (Shilin)",
    ],
    categoryid: 2,
    isfeatured: true,
    schedule: {
      day1: "Việt Nam - Đài Bắc: Khởi hành, tham quan Cố Cung Đài Bắc (chụp ảnh bên ngoài).",
      day2: "Đài Bắc: Tham quan Công viên Địa chất Dã Liễu (Yehliu), thả đèn trời tại Phố cổ Thập Phần (Shifen). Tối mua sắm tại chợ đêm Sĩ Lâm.",
      day3: "Đài Bắc - Đài Trung: Tham quan Hồ Nhật Nguyệt (Sun Moon Lake), Văn Võ Miếu. Chiều tham quan Nhà hát Lớn Đài Trung.",
      day4: "Đài Trung - Đài Bắc: Tham quan Làng Cầu Vồng. Quay về Đài Bắc. Tự do mua sắm tại Taipei 101.",
      day5: "Đài Bắc - Việt Nam: Tham quan Đài Tưởng niệm Tưởng Giới Thạch. Ra sân bay về Việt Nam.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi (Việt Nam - Đài Bắc).",
        "Khách sạn tiêu chuẩn 4 sao (4 đêm).",
        "Các bữa ăn theo chương trình (4 bữa sáng, 5 bữa chính).",
        "Visa Quan Hồng (nếu đủ điều kiện) hoặc phí hỗ trợ Visa.",
        "Vé tham quan các điểm theo chương trình.",
        "Bảo hiểm du lịch quốc tế, tiền tips cho HDV và tài xế.",
      ],
      excluded: [
        "Phí hành lý ký gửi (tùy hãng hàng không).",
        "Chi phí cá nhân, đồ uống.",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 5.000.000 VNĐ và nộp hồ sơ xin Visa (nếu cần). Hoàn tất thanh toán 21 ngày trước khởi hành.",
      cancellation:
        "Trượt Visa: Phí 3.000.000 VNĐ/khách + phí Visa. Hủy tour sau khi có Visa: Phí 100% tiền cọc và phí Visa. Hủy tour dưới 14 ngày: Phí 100% giá tour.",
      notes:
        "Mùa Hoa Anh Đào thường vào cuối tháng 3. Yêu cầu hộ chiếu còn hạn ít nhất 6 tháng.",
    },
  },
  {
    id: 16,
    name: "Tour Trọn Gói Hà Giang 4 ngày 3 đêm: Cột cờ Lũng Cú - Mã Pì Lèng",
    slug: "tour-ha-giang-4-ngay-3-dem",
    destination: "Hà Giang, Đông Bắc",
    destinationSuggestions: ["Hà Giang", "Đông Bắc", "Cao Bằng", "Lạng Sơn"],
    departure: "Hà Nội",
    startDate: "2026-03-05",
    endDate: "2026-03-08",
    duration: "4 ngày 3 đêm",
    durationRange: "4-7 ngày",
    price: 3890000,
    images: [
      "https://catbaexpress.com/upload/images/cot-co-lung-cu-ha-giang.jpg",
      "https://cattour.vn/images/products/2022/10/22/du-lich-ha-giang-cattour-22-428.jpg",
    ],
    description:
      "Hành trình chinh phục 'cực Bắc', khám phá cao nguyên đá Đồng Văn và đèo Mã Pì Lèng huyền thoại.",
    highlights: [
      "Chinh phục Cột cờ Lũng Cú",
      "Ngắm hẻm vực Tu Sản trên đèo Mã Pì Lèng",
      "Dinh thự họ Vương",
    ],
    categoryid: 1,
    isfeatured: true,
    schedule: {
      day1: "Hà Nội - Hà Giang: Di chuyển đến Hà Giang, nghỉ đêm.",
      day2: "Hà Giang - Đồng Văn: Cổng trời Quản Bạ, Phố Cáo, Dinh thự họ Vương, Phố cổ Đồng Văn.",
      day3: "Đồng Văn - Mèo Vạc - Hà Giang: Thăm Cột cờ Lũng Cú, đi qua đèo Mã Pì Lèng, ngắm sông Nho Quế, về Hà Giang.",
      day4: "Hà Giang - Hà Nội: Mua sắm đặc sản, trở về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Xe ô tô đời mới (xe giường nằm/ghế ngồi tùy chọn) khứ hồi.",
        "Khách sạn/Homestay tại các điểm (3 đêm).",
        "Các bữa ăn theo chương trình (3 bữa sáng, 4 bữa chính).",
        "Vé tham quan các điểm theo chương trình.",
        "Bảo hiểm du lịch.",
      ],
      excluded: ["Chi phí thuê xe máy (nếu có), chi phí cá nhân, đồ uống."],
    },
    policy: {
      booking: "Đặt cọc 40% giá tour. Thanh toán hết 7 ngày trước khởi hành.",
      cancellation:
        "Hủy tour trước 10 ngày: Phí 20%. Hủy tour dưới 5 ngày: Phí 100%.",
      notes: "Chương trình tour yêu cầu sức khỏe tốt, đường đèo nguy hiểm.",
    },
  },
  {
    id: 17,
    name: "Tour Côn Đảo 3 ngày 2 đêm: Về nguồn linh thiêng",
    slug: "tour-con-dao-3-ngay-2-dem",
    destination: "Côn Đảo, Bà Rịa - Vũng Tàu",
    destinationSuggestions: ["Côn Đảo", "Phú Quốc", "Đảo Lý Sơn"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2026-04-10",
    endDate: "2026-04-12",
    duration: "3 ngày 2 đêm",
    durationRange: "1-3 ngày",
    price: 7590000,
    images: [
      "https://tanbaysaccauvong.com/wp-content/uploads/2018/12/condao.jpg",
      "https://www.vietnambooking.com/wp-content/uploads/2020/07/Cd3.jpg",
    ],
    description:
      "Khám phá vẻ đẹp thiên nhiên hoang sơ và các di tích lịch sử linh thiêng tại Côn Đảo.",
    highlights: [
      "Viếng mộ Cô Sáu (nửa đêm)",
      "Tham quan Nhà tù Côn Đảo",
      "Tắm biển Đầm Trầu",
    ],
    categoryid: 1,
    isfeatured: false,
    schedule: {
      day1: "TP.HCM - Côn Đảo: Đến Côn Đảo, tham quan trại giam Phú Hải, Chuồng Cọp. Tối viếng Nghĩa trang Hàng Dương.",
      day2: "Khám phá Côn Đảo: Tham quan Miếu Bà Phi Yến, tắm biển bãi Đầm Trầu. Chiều tự do.",
      day3: "Côn Đảo - TP.HCM: Thăm chợ Côn Đảo, mua sắm đặc sản. Ra sân bay về TP.HCM.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi TP.HCM - Côn Đảo (bao gồm 7kg hành lý xách tay).",
        "Khách sạn tiêu chuẩn 3 sao (2 đêm).",
        "Các bữa ăn theo chương trình (2 bữa sáng, 2 bữa trưa).",
        "Xe vận chuyển tham quan.",
        "Vé tham quan các điểm theo chương trình.",
        "Bảo hiểm du lịch.",
      ],
      excluded: ["Bữa tối, chi phí cá nhân."],
    },
    policy: {
      booking:
        "Thanh toán 100% giá tour do vé máy bay Côn Đảo thường phải xuất sớm.",
      cancellation: "Hủy tour sau khi xuất vé: Phí 100% giá tour.",
      notes: "Nên mang trang phục kín đáo khi viếng các điểm tâm linh.",
    },
  },
  {
    id: 18,
    name: "Tour Tây Nguyên 4 ngày 3 đêm: Đà Lạt - Pleiku - Buôn Ma Thuột",
    slug: "tour-tay-nguyen-4-ngay-3-dem",
    destination: "Lâm Đồng, Gia Lai, Đắk Lắk",
    destinationSuggestions: ["Đà Lạt", "Pleiku", "Buôn Ma Thuột", "Kon Tum"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2026-02-15",
    endDate: "2026-02-18",
    duration: "4 ngày 3 đêm",
    durationRange: "4-7 ngày",
    price: 5190000,
    images: [
      "https://www.vietnambooking.com/wp-content/uploads/2017/09/tour-tay-nguyen-buon-me-thuot-pleiku-kon-tum-4n3d-3.jpg",
      "https://aulacviet.vn/wp-content/uploads/2021/05/BMT2.jpg",
    ],
    description:
      "Khám phá vùng đất đỏ Bazan hùng vĩ, thưởng thức cà phê và tìm hiểu văn hóa cồng chiêng Tây Nguyên.",
    highlights: [
      "Tham quan Biển Hồ T'Nưng (Pleiku)",
      "Buôn Đôn (Đắk Lắk)",
      "Thưởng thức cà phê Buôn Ma Thuột",
    ],
    categoryid: 1,
    isfeatured: false,
    schedule: {
      day1: "TP.HCM - Đà Lạt: Đến Đà Lạt, thăm Thiền viện Trúc Lâm, Hồ Tuyền Lâm. Nghỉ đêm Đà Lạt.",
      day2: "Đà Lạt - Pleiku: Di chuyển lên Pleiku. Tham quan Biển Hồ T'Nưng, Chùa Minh Thành.",
      day3: "Pleiku - Buôn Ma Thuột: Thăm thác Dray Sap, khám phá Buôn Đôn. Tối thưởng thức ẩm thực địa phương.",
      day4: "Buôn Ma Thuột - TP.HCM: Mua sắm cà phê, cao su. Ra sân bay Buôn Ma Thuột về TP.HCM.",
    },
    priceDetails: {
      included: [
        "Xe du lịch đời mới suốt tuyến.",
        "Khách sạn tiêu chuẩn 3 sao (3 đêm).",
        "Các bữa ăn theo chương trình (3 bữa sáng, 4 bữa chính).",
        "Vé tham quan các điểm.",
        "Bảo hiểm du lịch.",
      ],
      excluded: [
        "Vé máy bay/tàu xe khứ hồi TP.HCM - Đà Lạt/Buôn Ma Thuột - TP.HCM.",
        "Chi phí cưỡi voi (tại Buôn Đôn).",
      ],
    },
    policy: {
      booking: "Đặt cọc 30% giá tour. Thanh toán hết 7 ngày trước khởi hành.",
      cancellation:
        "Hủy tour trước 15 ngày: hoàn 80% tiền tour. Hủy tour dưới 7 ngày: không hoàn tiền.",
      notes:
        "Lịch trình có thể thay đổi tùy thuộc vào điều kiện thời tiết thực tế.",
    },
  },
  {
    id: 19,
    name: "Tour Úc 7 ngày 6 đêm: Sydney - Melbourne (Mùa thu vàng)",
    slug: "tour-uc-7-ngay-6-dem",
    destination: "Úc",
    destinationSuggestions: ["Úc", "New Zealand", "Canada"],
    departure: "Hà Nội/TP. Hồ Chí Minh",
    startDate: "2026-04-20",
    endDate: "2026-04-26",
    duration: "7 ngày 6 đêm",
    durationRange: "4-7 ngày",
    price: 42990000,
    images: [
      "https://datviettour.com.vn/uploads/images/chau-uc/uc/danh-thang/850px/melbourne-850x640.jpg",
      "https://bankervn.com/wp-content/uploads/2024/09/Kinh-nghiem-du-lich-Uc-tu-tuc.jpg",
    ],
    description:
      "Khám phá hai thành phố lớn nhất nước Úc: Sydney hiện đại và Melbourne cổ kính, ngắm Lá Vàng Rơi.",
    highlights: [
      "Nhà hát Opera Sydney",
      "Cầu cảng Sydney Harbour Bridge",
      "Con đường Đại Dương (Great Ocean Road)",
    ],
    categoryid: 2,
    isfeatured: true,
    schedule: {
      day1: "Việt Nam - Sydney: Khởi hành, nghỉ đêm trên máy bay.",
      day2: "Sydney: Tham quan Nhà hát Opera, The Rocks. Chiều đi Blue Mountains.",
      day3: "Sydney: Tham quan Bãi biển Bondi, Thủy cung Sydney. Tự do mua sắm.",
      day4: "Sydney - Melbourne: Bay đến Melbourne. Tham quan Quảng trường Federation Square, Nhà thờ St Patrick.",
      day5: "Melbourne: Khám phá Great Ocean Road và 12 Vị Tông Đồ (12 Apostles).",
      day6: "Melbourne: Tham quan chợ Queen Victoria Market, Khu phố Docklands. Tối ăn tối tiễn đoàn.",
      day7: "Melbourne - Việt Nam: Ra sân bay về Việt Nam.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi và nội địa (Việt Nam - Sydney/Melbourne - Việt Nam).",
        "Khách sạn tiêu chuẩn 4 sao (5 đêm).",
        "Các bữa ăn theo chương trình.",
        "Phí Visa Úc.",
        "Vé tham quan các điểm, bảo hiểm du lịch quốc tế.",
        "Tiền tips cho HDV và tài xế.",
      ],
      excluded: ["Chi phí cá nhân, đồ uống, mua sắm."],
    },
    policy: {
      booking:
        "Đặt cọc 20.000.000 VNĐ và nộp hồ sơ xin Visa. Hoàn tất thanh toán 30 ngày trước khởi hành.",
      cancellation:
        "Trượt Visa: Phí 3.000.000 VNĐ/khách + phí Visa. Hủy tour sau khi có Visa: Phí 100% tiền cọc + phí Visa.",
      notes:
        "Yêu cầu hộ chiếu còn hạn 6 tháng. Khách cần chuẩn bị hồ sơ Visa đầy đủ.",
    },
  },
  {
    id: 20,
    name: "Tour Châu Âu 10 ngày 9 đêm: Pháp - Bỉ - Hà Lan - Đức",
    slug: "tour-chau-au-10-ngay-9-dem",
    destination: "Pháp, Bỉ, Hà Lan, Đức",
    destinationSuggestions: ["Pháp", "Bỉ", "Hà Lan", "Đức", "Ý"],
    departure: "Hà Nội/TP. Hồ Chí Minh",
    startDate: "2026-06-10",
    endDate: "2026-06-19",
    duration: "10 ngày 9 đêm",
    durationRange: "8-14 ngày",
    price: 59990000,
    images: [
      "https://entervietnam.com.vn/wp-content/uploads/2018/04/York-Minster.jpg",
      "https://deviet.vn/wp-content/uploads/2019/09/phap-bi-ha-lan-duc.jpg",
    ],
    description:
      "Hành trình khám phá Tây Âu cổ kính: từ tháp Eiffel đến những cối xay gió Hà Lan.",
    highlights: [
      "Tháp Eiffel (Pháp)",
      "Quảng trường Grand Place (Bỉ)",
      "Khu cối xay gió Kinderdijk (Hà Lan)",
      "Nhà thờ Cologne (Đức)",
    ],
    categoryid: 2,
    isfeatured: false,
    schedule: {
      day1: "Việt Nam - Paris (Pháp): Khởi hành.",
      day2: "Paris: Tham quan Tháp Eiffel, Khải Hoàn Môn, Du thuyền trên sông Seine.",
      day3: "Paris: Thăm bảo tàng Louvre (chụp ảnh bên ngoài), Nhà thờ Đức Bà Paris (bên ngoài). Mua sắm tại Galeries Lafayette.",
      day4: "Paris - Brussels (Bỉ): Di chuyển đến Brussels. Tham quan Tượng Manneken Pis, Quảng trường Grand Place.",
      day5: "Brussels - Amsterdam (Hà Lan): Di chuyển đến Amsterdam. Tham quan Xưởng kim cương, Quảng trường Dam.",
      day6: "Amsterdam: Khám phá Làng cối xay gió Zaanse Schans, Khu cối xay gió Kinderdijk.",
      day7: "Amsterdam - Cologne (Đức): Di chuyển đến Cologne. Tham quan Nhà thờ Lớn Cologne.",
      day8: "Cologne - Frankfurt: Tham quan Phố cổ Frankfurt, Tòa thị chính Römer.",
      day9: "Frankfurt: Tự do mua sắm/tham quan. Tối ăn tối tiễn đoàn.",
      day10: "Frankfurt - Việt Nam: Ra sân bay về Việt Nam.",
    },
    priceDetails: {
      included: [
        "Vé máy bay quốc tế khứ hồi.",
        "Khách sạn tiêu chuẩn 4 sao (8 đêm).",
        "Các bữa ăn theo chương trình.",
        "Visa Schengen (châu Âu).",
        "Xe vận chuyển cao cấp, bảo hiểm du lịch quốc tế, tiền tips.",
      ],
      excluded: [
        "Chi phí cá nhân, đồ uống, vé tham quan các bảo tàng (nếu không có trong chương trình).",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 25.000.000 VNĐ và nộp hồ sơ Visa. Hoàn tất thanh toán 45 ngày trước khởi hành.",
      cancellation:
        "Trượt Visa: Phí 5.000.000 VNĐ/khách + phí Visa. Hủy tour sau khi có Visa: Phí 100% tiền cọc và phí Visa. Hủy tour dưới 45 ngày: Phí 100% giá tour.",
      notes: "Hạn chót nộp hồ sơ Visa là 60 ngày trước ngày khởi hành.",
    },
  },
  {
    id: 21,
    name: "Tour Dubai - Abu Dhabi 6 ngày 5 đêm: Sa mạc và Tinh hoa kiến trúc",
    slug: "tour-dabai-abu-dhabi-6-ngay-5-dem",
    destination: "Dubai, Abu Dhabi (UAE)",
    destinationSuggestions: ["Dubai", "Abu Dhabi", "Qatar", "Oman"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2026-05-01",
    endDate: "2026-05-06",
    duration: "6 ngày 5 đêm",
    durationRange: "4-7 ngày",
    price: 28990000,
    images: [
      "https://vietqueentravel.vn/upload/2022-04-24/tour-dubai-6-ngay-6.jpg",
      "https://www.vietnambooking.com/wp-content/uploads/2017/01/du-lich-dubai-14-10-2017-9.jpg",
    ],
    description:
      "Trải nghiệm Dubai xa hoa với kiến trúc đỉnh cao và cuộc sống du mục trên sa mạc.",
    highlights: [
      "Tháp Burj Khalifa (chụp ảnh)",
      "Đảo Cây Cọ Palm Jumeirah",
      "Tour khám phá sa mạc (Desert Safari)",
      "Thánh đường Hồi giáo Sheikh Zayed (Abu Dhabi)",
    ],
    categoryid: 2,
    isfeatured: true,
    schedule: {
      day1: "TP.HCM - Dubai: Khởi hành.",
      day2: "Dubai: Tham quan Phố cổ Bastakiya, Du thuyền Abra, Tháp Burj Khalifa (chụp ảnh). Chiều mua sắm tại Dubai Mall.",
      day3: "Dubai: Đảo Cây Cọ, Khách sạn cánh buồm Burj Al Arab (chụp ảnh). Chiều tham gia Desert Safari (Ăn tối BBQ trên sa mạc).",
      day4: "Dubai - Abu Dhabi: Di chuyển đến Abu Dhabi. Tham quan Thánh đường Hồi giáo Sheikh Zayed, Tòa nhà Capital Gate.",
      day5: "Abu Dhabi - Dubai: Tham quan Bảo tàng Louvre Abu Dhabi (chụp ảnh). Chiều quay về Dubai, tự do mua sắm/giải trí.",
      day6: "Dubai - TP.HCM: Ra sân bay về Việt Nam.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi.",
        "Khách sạn tiêu chuẩn 4 sao (4 đêm).",
        "Các bữa ăn theo chương trình.",
        "Visa nhập cảnh UAE.",
        "Vé tham quan các điểm, Desert Safari, bảo hiểm du lịch.",
        "Tiền tips cho HDV và tài xế.",
      ],
      excluded: ["Chi phí lên đỉnh Burj Khalifa, phí cá nhân."],
    },
    policy: {
      booking:
        "Đặt cọc 10.000.000 VNĐ/khách. Hoàn tất thanh toán 21 ngày trước khởi hành.",
      cancellation:
        "Hủy tour sau khi làm Visa: Phí 100% tiền cọc + phí Visa. Hủy tour dưới 14 ngày: Phí 100% giá tour.",
      notes:
        "Thời tiết Dubai tháng 5 khá nóng. Trang phục lịch sự khi vào thánh đường.",
    },
  },
  {
    id: 22,
    name: "Tour Nam Mỹ 12 ngày 11 đêm: Argentina - Brazil - Peru (Tùy chọn)",
    slug: "tour-nam-my-12-ngay-11-dem",
    destination: "Argentina, Brazil, Peru",
    destinationSuggestions: ["Argentina", "Brazil", "Peru", "Chile"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2026-07-01",
    endDate: "2026-07-12",
    duration: "12 ngày 11 đêm",
    durationRange: "8-14 ngày",
    price: 95000000,
    images: [
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/452/284/products/thac-iguazu-3-125cd8aa-19ee-4ffb-aec3-6602681d9465-2b225b27-3ca5-48d3-9b23-a1429c68da57.jpg?v=1702352619590",
      "https://tourvn.tabikobo.com/wordpress/wp-content/uploads/2019/05/Kh%C3%A1m-ph%C3%A1-V%C3%B9ng-%C4%91%E1%BA%A5t-c%E1%BB%A7a-nh%E1%BB%AFng-th%C3%A1c-n%C6%B0%E1%BB%9Bc.jpg",
    ],
    description:
      "Khám phá những kỳ quan vĩ đại của Nam Mỹ: Machu Picchu, Tượng Chúa Cứu Thế và vũ điệu Tango.",
    highlights: [
      "Thành cổ Machu Picchu (Peru)",
      "Tượng Chúa Cứu Thế Christ the Redeemer (Brazil)",
      "Thủ đô Tango Buenos Aires (Argentina)",
    ],
    categoryid: 2,
    isfeatured: false,
    schedule: {
      day1: "Việt Nam - Buenos Aires (Argentina): Khởi hành.",
      day2: "Buenos Aires: Đến nơi, tham quan Nhà hát Colon, Phố Caminito. Tối thưởng thức show Tango.",
      day3: "Buenos Aires - Rio de Janeiro (Brazil): Bay đến Rio. Tham quan Bãi biển Copacabana, Tượng Chúa Cứu Thế.",
      day4: "Rio de Janeiro: Thăm Đồi Sugarloaf. Tự do khám phá.",
      day5: "Rio de Janeiro - Lima (Peru): Bay đến Lima. Tham quan Phố cổ Lima.",
      day6: "Lima - Cusco - Thung lũng Linh thiêng: Bay đến Cusco. Khám phá Thung lũng Linh thiêng (Sacred Valley).",
      day7: "Machu Picchu: Đi tàu đến Aguas Calientes. Tham quan Thành cổ Machu Picchu.",
      day8: "Cusco - Lima: Quay về Cusco, tham quan Quảng trường Plaza de Armas. Bay về Lima.",
      day9: "Lima: Tự do mua sắm/tham quan.",
      day10: "Lima - Transit.",
      day11: "Transit.",
      day12: "Việt Nam: Về đến Việt Nam.",
    },
    priceDetails: {
      included: [
        "Vé máy bay quốc tế và nội địa Nam Mỹ.",
        "Khách sạn tiêu chuẩn 4 sao (9 đêm).",
        "Các bữa ăn theo chương trình.",
        "Vé tham quan Machu Picchu, Tượng Chúa Cứu Thế.",
        "Hướng dẫn viên suốt tuyến, bảo hiểm du lịch quốc tế.",
      ],
      excluded: [
        "Visa các nước Nam Mỹ (nếu có), chi phí cá nhân, tiền tips bắt buộc (khoảng 10 USD/ngày).",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 50.000.000 VNĐ. Hoàn tất thanh toán 60 ngày trước khởi hành.",
      cancellation:
        "Hủy tour sau khi đặt cọc: Phí 100% tiền cọc. Hủy tour dưới 45 ngày: Phí 100% giá tour.",
      notes:
        "Tour yêu cầu thời gian chuẩn bị Visa và thể lực tốt do di chuyển nhiều.",
    },
  },
  {
    id: 23,
    name: "Tour Miền Trung Di Sản 4 ngày 3 đêm: Quảng Bình - Quảng Trị",
    slug: "tour-mien-trung-di-san-4-ngay-3-dem",
    destination: "Quảng Bình, Quảng Trị",
    destinationSuggestions: ["Quảng Bình", "Quảng Trị", "Huế", "Đà Nẵng"],
    departure: "Hà Nội",
    startDate: "2026-03-20",
    endDate: "2026-03-23",
    duration: "4 ngày 3 đêm",
    durationRange: "4-7 ngày",
    price: 4990000,
    images: [
      "https://phongnhatourist.com/wp-content/uploads/2018/10/phong-nha-ke-bang-6-600x400.jpg",
      "https://bizweb.dktcdn.net/thumb/grande/100/101/075/products/qb.jpg?v=1583584192593",
    ],
    description:
      "Khám phá 'Vương quốc hang động' Quảng Bình và các di tích lịch sử chiến tranh tại Quảng Trị.",
    highlights: [
      "Động Phong Nha/Tiên Sơn",
      "Suối nước Moọc",
      "Thành cổ Quảng Trị",
      "Địa đạo Vĩnh Mốc",
    ],
    categoryid: 1,
    isfeatured: false,
    schedule: {
      day1: "Hà Nội - Đồng Hới (Quảng Bình): Đến Đồng Hới, nhận phòng. Chiều tự do tắm biển Nhật Lệ.",
      day2: "Quảng Bình: Tham quan Động Phong Nha (hoặc Tiên Sơn), khám phá Suối Nước Moọc.",
      day3: "Quảng Bình - Quảng Trị: Tham quan Thánh địa La Vang, Thành cổ Quảng Trị, Địa đạo Vĩnh Mốc.",
      day4: "Quảng Trị - Hà Nội: Mua sắm đặc sản, ra sân bay Đồng Hới về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi Hà Nội - Đồng Hới.",
        "Khách sạn tiêu chuẩn 3 sao (3 đêm).",
        "Các bữa ăn theo chương trình (3 bữa sáng, 3 bữa chính).",
        "Vé tham quan, bảo hiểm du lịch.",
      ],
      excluded: ["Chi phí cá nhân, đồ uống."],
    },
    policy: {
      booking:
        "Đặt cọc 50% ngay khi đăng ký. Thanh toán hết 7 ngày trước khởi hành.",
      cancellation:
        "Hủy tour sau khi xuất vé máy bay: Phí 100% vé máy bay. Hủy tour dưới 7 ngày: Phí 100% giá tour.",
      notes: "Lịch trình có thể thay đổi tùy thuộc vào điều kiện thời tiết.",
    },
  },
  {
    id: 24,
    name: "Tour Ai Cập 8 ngày 7 đêm: Kim tự tháp - Sông Nile",
    slug: "tour-ai-cap-8-ngay-7-dem",
    destination: "Ai Cập",
    destinationSuggestions: ["Ai Cập", "Thổ Nhĩ Kỳ", "Hy Lạp", "Israel"],
    departure: "TP. Hồ Chí Minh",
    startDate: "2026-08-10",
    endDate: "2026-08-17",
    duration: "8 ngày 7 đêm",
    durationRange: "8-14 ngày",
    price: 39500000,
    images: [
      "https://vietlandtravel.vn/upload/img/products/02092024/cairo-egypt.jpg",
      "https://otrip.vn/wp-content/uploads/2025/02/2.png",
    ],
    description:
      "Hành trình về với nền văn minh cổ đại, khám phá Kim tự tháp và trải nghiệm du thuyền trên sông Nile.",
    highlights: [
      "Kim tự tháp Giza và Tượng Nhân Sư",
      "Du thuyền trên sông Nile (3 đêm)",
      "Đền Karnak và Luxor",
      "Thung lũng các vị Vua",
    ],
    categoryid: 2,
    isfeatured: true,
    schedule: {
      day1: "Việt Nam - Cairo (Ai Cập): Khởi hành.",
      day2: "Cairo: Thăm Kim tự tháp Giza, Tượng Nhân Sư. Chiều tham quan Viện bảo tàng Ai Cập.",
      day3: "Cairo - Luxor: Bay đến Luxor. Lên du thuyền sông Nile. Thăm Đền Karnak.",
      day4: "Du thuyền Nile: Tham quan Thung lũng các vị Vua, Đền Hatshepsut.",
      day5: "Du thuyền Nile: Thăm Đền Edfu, Đền Kom Ombo.",
      day6: "Aswan - Cairo: Thăm đền Abu Simbel (tùy chọn, chi phí tự túc). Chiều bay về Cairo.",
      day7: "Cairo: Tham quan Thành cổ Salah El Din, Chợ Khan El Khalili. Tối ăn tối tiễn đoàn.",
      day8: "Cairo - Việt Nam: Ra sân bay về Việt Nam.",
    },
    priceDetails: {
      included: [
        "Vé máy bay quốc tế và nội địa Ai Cập.",
        "Du thuyền 5 sao trên sông Nile (3 đêm), Khách sạn 4 sao (4 đêm).",
        "Các bữa ăn theo chương trình.",
        "Visa Ai Cập.",
        "Vé tham quan các điểm, bảo hiểm du lịch, tiền tips.",
      ],
      excluded: [
        "Vé tham quan bên trong Kim tự tháp, chi phí thăm Abu Simbel, phí cá nhân.",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 15.000.000 VNĐ và nộp hồ sơ Visa. Hoàn tất thanh toán 30 ngày trước khởi hành.",
      cancellation:
        "Hủy tour sau khi làm Visa: Phí 100% tiền cọc + phí Visa. Hủy tour dưới 21 ngày: Phí 100% giá tour.",
      notes:
        "Khí hậu Ai Cập nóng, nên chuẩn bị trang phục thoáng mát, kem chống nắng.",
    },
  },
  {
    id: 25,
    name: "Tour Đông Bắc Á 7 ngày 6 đêm: Hàn Quốc - Nhật Bản (Kết hợp)",
    slug: "tour-dong-bac-7-ngay-dem",
    destination: "Hàn Quốc, Nhật Bản",
    destinationSuggestions: ["Hàn Quốc", "Nhật Bản", "Trung Quốc"],
    departure: "Hà Nội",
    startDate: "2026-04-15",
    endDate: "2026-04-21",
    duration: "7 ngày 6 đêm",
    durationRange: "4-7 ngày",
    price: 39990000,
    images: [
      "https://letstours.com/wp-content/uploads/2022/03/du_lich_dong_bac-3.jpg",
      "https://thaiantravel.com/wp-content/uploads/2024/06/3-2-cung-dien-gyeongbokgung-kinh-nghiem-du-lich-han-quoc-2-1.jpg",
    ],
    description:
      "Hành trình ngắm hoa Anh Đào (tùy mùa) kết hợp hai nền văn hóa hiện đại và truyền thống của Hàn - Nhật.",
    highlights: [
      "Đảo Nami (Hàn Quốc)",
      "Cung điện Gyeongbokgung (Hàn Quốc)",
      "Núi Phú Sĩ (Nhật Bản)",
      "Đền Asakusa Kannon (Nhật Bản)",
    ],
    categoryid: 2,
    isfeatured: false,
    schedule: {
      day1: "Hà Nội - Seoul (Hàn Quốc): Khởi hành.",
      day2: "Seoul: Thăm Cung điện Gyeongbokgung, Làng Bukchon Hanok, Đảo Nami.",
      day3: "Seoul: Tự do mua sắm tại Myeongdong. Tối bay đi Osaka (Nhật Bản).",
      day4: "Osaka - Kyoto: Đến Osaka, tham quan Lâu đài Osaka (bên ngoài). Chiều đi Kyoto, thăm Chùa Vàng Kinkaku-ji.",
      day5: "Kyoto - Nagoya: Thăm Chùa Kiyomizu-dera. Đi tàu Shinkansen (tùy chọn) đến Nagoya.",
      day6: "Nagoya - Tokyo: Thăm Núi Phú Sĩ (Tầng 5). Di chuyển về Tokyo.",
      day7: "Tokyo - Hà Nội: Tham quan Đền Asakusa Kannon, chụp ảnh Tháp Skytree. Ra sân bay về Hà Nội.",
    },
    priceDetails: {
      included: [
        "Vé máy bay khứ hồi (Việt Nam - Hàn Quốc/Nhật Bản - Việt Nam) và nội địa/liên tuyến.",
        "Khách sạn tiêu chuẩn 3-4 sao (6 đêm).",
        "Các bữa ăn theo chương trình.",
        "Visa Hàn Quốc, Visa Nhật Bản (hoặc phí Visa đoàn).",
        "Vé tham quan, bảo hiểm du lịch, tiền tips.",
      ],
      excluded: [
        "Vé tàu Shinkansen (nếu không chọn trọn gói), chi phí cá nhân.",
      ],
    },
    policy: {
      booking:
        "Đặt cọc 15.000.000 VNĐ và nộp hồ sơ Visa. Hoàn tất thanh toán 30 ngày trước khởi hành.",
      cancellation:
        "Trượt Visa: Phí 5.000.000 VNĐ/khách + phí Visa. Hủy tour sau khi có Visa: Phí 100% tiền cọc và phí Visa. Hủy tour dưới 14 ngày: Phí 100% giá tour.",
      notes:
        "Tour này là tour kết hợp 2 quốc gia nên lịch trình di chuyển khá gấp, phù hợp với người thích khám phá.",
    },
  },
];

let toursFilter = [];

const posts = [
  {
    id: 1,
    title: "Kinh nghiệm du lịch Đà Nẵng: Thành phố đáng sống nhất Việt Nam",
    content:
      "Đà Nẵng nổi tiếng với biển Mỹ Khê, Bà Nà Hills và ẩm thực đa dạng. Kinh nghiệm quan trọng là nên đi vào tháng 3 - 8 để trời đẹp, đặt phòng trước 7–10 ngày và thuê xe máy để thuận tiện di chuyển.",
    author: "Bùi Trần Tiến",
    createdAt: "2025-01-10",
    thumbnail: "https://example.com/images/da-nang.jpg",
  },
  {
    id: 2,
    title: "Khám phá Đà Lạt: Những mẹo nhỏ để chuyến đi hoàn hảo hơn",
    content:
      "Đà Lạt có khí hậu se lạnh quanh năm. Khi đi du lịch bạn nên chuẩn bị áo khoác ấm, đặt vé tham quan đồi chè Cầu Đất từ sớm và ghé các quán cà phê view đồi để tận hưởng buổi sáng yên bình.",
    author: "Bùi Trần Tiến",
    createdAt: "2025-01-12",
    thumbnail: "https://example.com/images/da-lat.jpg",
  },
  {
    id: 3,
    title: "Du lịch Phú Quốc: Những điều nhất định phải thử",
    content:
      "Phú Quốc nổi tiếng với biển trong xanh và hải sản tươi ngon. Bạn nên trải nghiệm câu cá - lặn ngắm san hô, tham quan Hòn Thơm và thưởng thức gỏi cá trích. Thời điểm đẹp nhất là từ tháng 10 đến tháng 4.",
    author: "Bùi Trần Tiến",
    createdAt: "2025-01-15",
    thumbnail: "https://example.com/images/phu-quoc.jpg",
  },
];

const orders = [];

const cartOrder = [];

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Không có token" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ" });
    req.user = user;
    next();
  });
};

// Hàm tạo danh sách các ngày khởi hành, ngày về cho mỗi tour
const generateDepartures = (product, count = 4) => {
  const baseStart = new Date(product.startDate.replace("2025", "2026"));
  const baseEnd = new Date(product.endDate.replace("2025", "2026"));

  return Array.from({ length: count }, (_, i) => {
    const offsetDays = i * 3;

    const start = new Date(baseStart);
    start.setDate(start.getDate() + offsetDays);

    const end = new Date(baseEnd);
    end.setDate(end.getDate() + offsetDays);

    return {
      departureId: `${product.slug}-${start.getFullYear()}-${i + 1}`,
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      price: product.price + i * 300000,
      seats: 30 - i * 2,
    };
  });
};
// Cập nhật thêm dữ liệu ngày, tháng, năm vào từng tour
products = products.map((product) => ({
  ...product,
  departures: product.departures?.length
    ? product.departures
    : generateDepartures(product, 5),
}));

//API Products theo filter trang Product
app.get("/api/products", (req, res) => {
  const { id } = req.query;
  let filterProducts = products;

  // Nếu có id → lọc theo categoryid trước
  if (id) {
    const productId = Number(id);
    filterProducts = filterProducts.filter((p) => p.categoryid === productId);
  }

  // Không tìm thấy
  if (filterProducts.length === 0) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }

  res.json(filterProducts);
});

//API Products theo filter trang Home
app.get("/api/toursFilter", (req, res) => {
  const { categoryId, departure, destination, startDate, durationRange } =
    req.query;

  let result = [...products];

  // 1. Lọc loại tour
  if (categoryId) {
    result = result.filter((tour) => tour.categoryid === Number(categoryId));
  }

  // 2. Lọc điểm đi
  if (departure) {
    result = result.filter((tour) =>
      tour.departure.toLowerCase().includes(departure.toLowerCase())
    );
  }

  // 3. Lọc điểm đến (match destination + suggestion)
  if (destination) {
    result = result.filter(
      (tour) =>
        tour.destination.toLowerCase().includes(destination.toLowerCase()) ||
        tour.destinationSuggestions.some((d) =>
          d.toLowerCase().includes(destination.toLowerCase())
        )
    );
  }

  // 4. Lọc theo ngày khởi hành
  if (startDate) {
    result = result.filter((tour) =>
      tour.departures.some((d) => d.startDate === startDate)
    );
  }

  // 5. Lọc theo số ngày
  if (durationRange) {
    result = result.filter((tour) => tour.durationRange === durationRange);
  }

  toursFilter.push(result);

  res.json({
    total: result.length,
    data: result,
  });
});

//API chi tiết sản phẩm
app.get("/api/products/:slug", (req, res) => {
  const product = products.find((p) => p.slug === req.params.slug);
  if (product) res.json(product);
  else res.status(404).json({ message: "Không tìm sản phẩm" });
});

//API sản phẩm liên quan
app.get("/api/products/relatedproducts/:slug", (req, res) => {
  const product = products.find((p) => p.slug === req.params.slug);
  if (product) {
    let cateProducts = products.filter(
      (p) => p.categoryid === product.categoryid
    );
    cateProducts = cateProducts.filter((p) => p.id !== product.id);
    res.json(cateProducts);
  } else res.status(404).json({ message: "Không tìm sản phẩm" });
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
  const token = jwt.sign(
    { email: user.email, name: user.name, phone: user.phone },
    JWT_SECRET,
    {
      expiresIn: "10h",
    }
  );
  res.json({
    accessToken: token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
    },
  });
});

// API Lấy danh sách users
app.get("/api/users", authenticateJWT, (req, res) => {
  const userList = users.map(({ id, email }) => ({ id, email }));
  res.json(userList);
});

//Api lấy bài biết
app.get("/api/posts", (req, res) => {
  res.status(200).json(posts);
});

//Api tất cả orders
app.get("/api/orders", authenticateJWT, (req, res) => {
  res.status(200).json(orders);
});

//Api order của khách
app.post("/api/orders", authenticateJWT, (req, res) => {
  const newOrder = {
    id: Date.now().toString(),
    userEmail: req.user.email,
    userName: req.user.name,
    userPhone: req.user.phone,
    productId: req.body.orderByUser?.productId || req.body.productId,
    productName: req.body.orderByUser?.productName || req.body.productName,
    price: req.body.orderByUser?.price || req.body.price,
    departureDate:
      req.body.orderByUser?.departureDate || req.body.departureDate,
    returnDate: req.body.orderByUser?.returnDate || req.body.returnDate,
    orderByUser: req.body.orderByUser,
    userInfo: req.body.userInfo,
    adultCount: req.body.adultCount,
    childCount: req.body.childCount,
    guests: req.body.guests,
    Total: req.body.Total,
    userNote: req.body.userNote,
    selectedPayment: req.body.selectedPayment,
    createdAt: new Date(),
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

//Api chi tiết đơn hàng
app.get("/api/orders/:id", authenticateJWT, (req, res) => {
  const order = orders.find((o) => o.id == req.params.id);
  if (order) res.status(200).json(order);
  else res.status(404).json({ message: "Không tìm thấy đơn hàng" });
});

//Api tất cả orders
app.get("/api/cart", authenticateJWT, (req, res) => {
  res.status(200).json(cartOrder);
});

//Api thêm sản phẩm trong cart
app.post("/api/cart", authenticateJWT, (req, res) => {
  const newCart = {
    id: Date.now().toString(),
    ...req.body,
  };

  cartOrder.push(newCart);
  res.status(201).json(newCart);
});

app.listen(port, () => console.log(`Server chạy tại http://localhost:${port}`));
