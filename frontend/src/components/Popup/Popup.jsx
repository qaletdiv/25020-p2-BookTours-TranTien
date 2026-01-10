import { useEffect, useState } from "react";

//Tạo biến lưu tên chuỗi trên local storage
const POPUP_KEY = "contact_popup_seen";

const ContactPopup = () => {
  const [open, setOpen] = useState(false);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      {/* Popup */}
      <div
        className="relative w-full max-w-[450px] bg-[#013879] text-white p-5 rounded-xl
                   animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white text-xl hover:opacity-70"
        >
          ✕
        </button>

        <h2 className="text-center text-2xl font-bold mb-2">
          Đăng Ký Liên Hệ
        </h2>
        <p className="text-center mb-5 text-sm">
          Vui lòng điền form dưới đây và gửi cho chúng tôi
        </p>

        <form className="space-y-3">
          {/* Tên */}
          <div>
            <label className="block font-bold mb-1">
              Tên khách hàng <span className="text-yellow-300">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Nhập tên khách hàng"
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-black
                         focus:outline-none focus:border-[#013879]"
            />
          </div>

          {/* Điện thoại */}
          <div>
            <label className="block font-bold mb-1">
              Điện thoại <span className="text-yellow-300">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: 0123456789"
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-black
                         focus:outline-none focus:border-[#013879]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-bold mb-1">
              Email <span className="text-yellow-300">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="vidu@mail.com"
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-black
                         focus:outline-none focus:border-[#013879]"
            />
          </div>

          {/* Tour */}
          <div>
            <label className="block font-bold mb-1">
              Tour quan tâm
            </label>
            <select
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-black
                         focus:outline-none focus:border-[#013879]"
            >
              <option value="">Vui lòng chọn</option>
              <option value="domestic">Tour trong nước</option>
              <option value="international">Tour ngoài nước</option>
            </select>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block font-bold mb-1">
              Mô tả
            </label>
            <textarea
              rows={4}
              placeholder="Nhập nội dung mô tả..."
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-black
                         focus:outline-none focus:border-[#013879]"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 py-3 rounded-md bg-white text-[#013879]
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
