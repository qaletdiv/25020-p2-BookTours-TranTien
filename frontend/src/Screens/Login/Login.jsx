import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap(); // unwrap sẽ throw error nếu login thất bại
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-1/2 bg-white rounded-lg my-20 mx-auto">
    <div className="w-[200px] h-auto m-8 mx-auto">
        <img src="https://www.luavietours.com/assets/img/common/logo.jpg" alt="logo" className="h-full w-full" />
    </div>
    <form onSubmit={handleSubmit} className="w-[525px] h-auto px-10 py-10 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1),_0_2px_5px_rgba(0,0,0,0.08)] mx-auto">
      <h2 className="mb-4 text-3xl font-bold text-[#013879] text-center">Đăng Nhập</h2>
      <div className="flex flex-col mb-3 group">
        <label htmlFor="email" className="font-bold">Email <span className="text-red-500">*</span></label>
        <input
          type="email"
          id="email" //id username phải trùng với htmlFor ở label để khi gõ input label nó biết
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          placeholder="Email"
          required
          className="no-spin py-3 focus:outline-none"
        />
        <div className="w-full h-[1.75px] bg-black"></div>
        <p className="mt-1 text-xs text-red-500 transition-all duration-300 ease-out opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-5">Thông tin bắt buộc</p>
      </div>
      <div className="flex flex-col mb-3 group">
        <label htmlFor="password" className="font-bold">Mật Khẩu <span className="text-red-500">*</span></label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          placeholder="Mật Khẩu"
          required
          className="no-spin py-3 focus:outline-none"
        />
        <div className="w-full h-[1.75px] bg-black"></div>
        <p className="mt-1 text-xs text-red-500 transition-all duration-300 ease-out opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-5">Thông tin bắt buộc</p>
      </div>
      <div className="text-center">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading} className="button m-6">
        {loading ? "Đang check..." : "Đăng Nhập"}
      </button>
      </div>
      <p className="text-xs text-center">
        Chưa có Tài Khoản ? <Link to="/dang-ky"><span className="italic text-[#013879]">Đăng Ký</span> </Link>
      </p>
    </form>
    </div>
  );
};

export default Login;
