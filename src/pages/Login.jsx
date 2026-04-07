import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 chars").required("Required"),
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 bg-[#1a1a2e] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="2" rx="1" fill="white"/>
              <rect x="2" y="8" width="10" height="2" rx="1" fill="white"/>
              <rect x="2" y="12" width="7" height="2" rx="1" fill="white"/>
              <circle cx="14" cy="13" r="2.5" fill="#4f46e5"/>
              <path d="M12.8 13l.8.8 1.6-1.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-900">Doable</span>
        </div>

      

        <h2 className="text-xl font-medium text-gray-900 mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-5">Log in to see your tasks</p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            navigate("/home");
          }}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
              <ErrorMessage name="email" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
              <ErrorMessage name="password" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div className="text-right -mt-2">
              <a href="#" className="text-xs text-indigo-600 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-[#1a1a2e] text-white text-sm font-medium rounded-lg hover:opacity-85 active:scale-[0.98] transition"
            >
              Log in
            </button>
          </Form>
        </Formik>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}