import { Formik } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Vui lòng nhập họ tên")
    .min(3, "Họ tên quá ngắn"),

  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),

  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải ít nhất 6 ký tự"),

  confirmPassword: Yup.string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
});

export default function TestYub() {
  return (
    <Formik
      initialValues={{
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      validateOnChange={true} // 👈 Gõ là báo lỗi ngay
      validateOnBlur={true}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Submitted:", values);

        setTimeout(() => {
          setSubmitting(false);
          alert("Đăng ký thành công!");
        }, 800);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {/* Họ tên */}
          <input
            type="text"
            name="fullname"
            placeholder="Họ và tên"
            value={values.fullname}
            onChange={handleChange}
          />
          {errors.fullname && touched.fullname && (
            <span style={{ color: "red" }}>{errors.fullname}</span>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <span style={{ color: "red" }}>{errors.email}</span>
          )}

          {/* Mật khẩu */}
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && touched.password && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}

          {/* Xác nhận mật khẩu */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span style={{ color: "red" }}>{errors.confirmPassword}</span>
          )}

          {/* Submit */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>
      )}
    </Formik>
  );
}
