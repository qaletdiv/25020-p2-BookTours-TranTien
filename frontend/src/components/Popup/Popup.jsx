import { useEffect, useState } from "react";

//Tạo biến lưu tên chuỗi trên local storage
const POPUP_KEY = "contact_popup_seen";

const ContactPopup = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    tour: "",
    description: "",
  });

  useEffect(() => {
    const isSeen = localStorage.getItem(POPUP_KEY);
    if (!isSeen) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(POPUP_KEY, "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
      onClick={handleClose}
    >
      {/* Popup */}
      <div
        className="relative w-full max-w-[450px] bg-[#013879] text-white p-4 sm:p-6 rounded-xl
                   animate-fadeIn my-8 sm:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 text-white text-lg sm:text-xl hover:opacity-70"
        >
          ✕
        </button>

        <h2 className="text-center text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
          Đăng Ký Liên Hệ
        </h2>
        <p className="text-center mb-4 sm:mb-5 text-xs sm:text-sm">
          Vui lòng điền form dưới đây và gửi cho chúng tôi
        </p>

        <form className="space-y-2 sm:space-y-3">
          {/* Tên */}
          <div>
            <label className="block font-bold mb-1 text-sm sm:text-base">
              Tên khách hàng <span className="text-yellow-300">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Nhập tên khách hàng"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 sm:py-2.5 text-sm rounded-md border border-gray-300 text-black
                         focus:outline-none focus:border-[#013879]"
            />
          </div>

          {/* Điện thoại */}
          <div>
            <label className="block font-bold mb-1 text-sm sm:text-base">
              Điện thoại <span className="text-yellow-300">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: 0123456789"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 sm:py-2.5 text-sm rounded-md border border-gray-300 text-black
                         focus:outline-none focus:border-[#013879]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-bold mb-1 text-sm sm:text-base">
              Email <span className="text-yellow-300">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="vidu@mail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 sm:py-2.5 text-sm rounded-md border border-gray-300 text-black
                         focus:outline-none focus:border-[#013879]"
            />
          </div>

          {/* Tour */}
          <div>
            <label className="block font-bold mb-1 text-sm sm:text-base">
              Tour quan tâm
            </label>
            <select
              value={formData.tour}
              onChange={(e) =>
                setFormData({ ...formData, tour: e.target.value })
              }
              className="w-full px-3 py-2 sm:py-2.5 text-sm rounded-md border border-gray-300 text-black
                         focus:outline-none focus:border-[#013879]"
            >
              <option value="">Vui lòng chọn</option>
              <option value="domestic">Tour trong nước</option>
              <option value="international">Tour ngoài nước</option>
            </select>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block font-bold mb-1 text-sm sm:text-base">
              Mô tả
            </label>
            <textarea
              rows={3}
              placeholder="Nhập nội dung mô tả..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 sm:py-2.5 text-sm rounded-md border border-gray-300 text-black resize-none
                         focus:outline-none focus:border-[#013879]"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 sm:mt-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-md bg-white text-[#013879]
                       font-bold transition duration-300
                       hover:bg-[#013879] hover:text-white border border-white"
          >
            Gửi yêu cầu tư vấn
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;
