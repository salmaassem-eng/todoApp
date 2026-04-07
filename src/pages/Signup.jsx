import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [strength, setStrength] = useState(0);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 chars").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required"),
    terms: Yup.bool().oneOf([true], "You must accept the terms"),
  });

  const getStrength = (val) => {
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strengthConfig = {
    0: { label: "Min. 6 characters", color: "text-gray-400" },
    1: { label: "Weak", color: "text-red-500" },
    2: { label: "Fair", color: "text-amber-500" },
    3: { label: "Good", color: "text-indigo-600" },
    4: { label: "Strong", color: "text-emerald-600" },
  };

  const segColor = (i) => {
    if (i >= strength) return "bg-gray-200";
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-amber-500";
    if (strength === 3) return "bg-indigo-500";
    return "bg-emerald-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-5">
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

        {/* Perks */}
        <div className="flex flex-wrap gap-2 mb-5">
          {["Free forever", "Unlimited tasks", "No credit card"].map((p) => (
            <span key={p} className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
              {p}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-medium text-gray-900 mb-1">Create account</h2>
        <p className="text-sm text-gray-500 mb-5">Start checking things off your list</p>

        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", terms: false }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            navigate("/home");
          }}
        >
          {({ handleChange }) => (
                      <Form className="flex flex-col gap-4">

                          {/* First + Last name row */}
                          <div className="grid grid-cols-2 gap-2.5">
                              <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1.5">First name</label>
                                  <Field name="firstName" placeholder="Alex"
                                      className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition" />
                                  <ErrorMessage name="firstName" component="p" className="text-xs text-red-500 mt-1" />
                              </div>
                              <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Last name</label>
                                  <Field name="lastName" placeholder="Kim"
                                      className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition" />
                                  <ErrorMessage name="lastName" component="p" className="text-xs text-red-500 mt-1" />
                              </div>
                          </div>

                          {/* Email */}
                          <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
                              <Field type="email" name="email" placeholder="you@example.com"
                                  className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition" />
                              <ErrorMessage name="email" component="p" className="text-xs text-red-500 mt-1" />
                          </div>

                          {/* Password + strength */}
                          <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
                              <Field name="password" type="password" placeholder="Create a password"
                                  className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                  onChange={(e) => { handleChange(e); setStrength(getStrength(e.target.value)); } } />
                              <div className="flex gap-1 mt-1.5">
                                  {[0, 1, 2, 3].map((i) => (
                                      <div key={i} className={`flex-1 h-0.5 rounded-full transition-colors ${segColor(i)}`} />
                                  ))}
                              </div>
                              <p className={`text-xs mt-1 ${strengthConfig[strength]?.color}`}>
                                  {strengthConfig[strength]?.label}
                              </p>
                              <ErrorMessage name="password" component="p" className="text-xs text-red-500 mt-1" />
                          </div>

                          {/* Confirm password */}
                          <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1.5">Confirm password</label>
                              <Field name="confirmPassword" type="password" placeholder="Repeat your password"
                                  className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition" />
                              <ErrorMessage name="confirmPassword" component="p" className="text-xs text-red-500 mt-1" />
                          </div>

                          {/* Terms */}
                          <div className="flex items-start gap-2">
                              <Field type="checkbox" name="terms" id="terms"
                                  className="mt-0.5 w-3.5 h-3.5 accent-indigo-600 flex-shrink-0" />
                              <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
                                  I agree to the{" "}
                                  <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>{" "}
                                  and{" "}
                                  <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                              </label>
                          </div>
                          <ErrorMessage name="terms" component="p" className="text-xs text-red-500 -mt-2" />

                          <button type="submit"
                              className="w-full h-10 bg-[#1a1a2e] text-white text-sm font-medium rounded-lg hover:opacity-85 active:scale-[0.98] transition">
                              Create account
                          </button>
                      </Form>
                  )}
        </Formik>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}