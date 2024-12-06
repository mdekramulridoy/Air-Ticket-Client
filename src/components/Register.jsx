import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Register = () => {
  useEffect(() => {
    document.title = "Registration";
  }, []);

  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const photo = e.target.photo.value;

    setError("");
    setSuccess(false);

    if (!terms) {
      setError("Please accept our terms & conditions.");
      toast.error("You must accept the terms & conditions to proceed.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be 6 characters or longer.");
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      toast.error("Password must meet the required criteria.");
      return;
    }

    if (name.length < 5) {
      setError("Name must be at least 5 characters long.");
      toast.error("Name must be at least 5 characters long.");
      return;
    }

    createUser(email, password, name, photo)
      .then(() => {
        e.target.reset();
        setSuccess(true);
        toast.success(`Welcome, ${name}!`, {
          duration: 4000,
          style: {
            background: "#08ABE9",
            color: "#fff",
          },
        });
        navigate("/add-visa");
      })
      .catch((err) => {
        setError(err.message);
        toast.error(`Registration failed: ${err.message}`, {
          duration: 4000,
          style: {
            background: "#E74C3C",
            color: "#fff",
          },
        });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Photo URL"
                className="input input-bordered"
              />
            </div>

            <div className="form-control flex flex-col  items-center space-y-2 md:space-y-0 md:space-x-4">
              <label className="label flex items-center">
                <input name="terms" type="checkbox" className="mr-2" />
                <span className="text-sm">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    terms & conditions
                  </Link>
                </span>
              </label>
              <div className="mt-2 md:mt-0">
                <Link
                  className="font-bold text-red-600 hover:underline"
                  to="/login"
                >
                  Already have an account ? Login
                </Link>
              </div>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            {error && <p className="text-red-600 text-center">{error}</p>}
            {success && (
              <p className="text-green-600 text-center">
                Registration successful!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
