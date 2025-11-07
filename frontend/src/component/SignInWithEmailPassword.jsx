import axios from "axios";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/Slices/UserSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignInWithEmailPassword = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // React Hook Form setup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const URL = isSigninForm
        ? `${BASE_URL}/auth/signInWithEmailPassword`
        : `${BASE_URL}/auth/signUpWithEmailPassword`;

      const res = await axios.post(URL, data, { withCredentials: true });
      console.log(res.data);
      if (res.status === 200) {
        dispatch(addUser(res?.data?.data));
        navigate(isSigninForm ? "/home" : "/subscription");
      }
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  // Reset form on successful submit
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <h1 className="text-3xl text-center font-bold">
        {isSigninForm ? "Sign In" : "Sign Up"}
      </h1>
      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Username (only for signup) */}
        {!isSigninForm && (
          <>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="w-full h-11 px-4 border border-transparent border-l-4 border-l-red-700 
                   bg-gray-100 text-gray-900 placeholder-gray-500 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-red-700/50 focus:border-red-700
                   transition duration-200 ease-in-out"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9._]{4,}$/,
                  message:
                    "Username must start with a letter, be at least 5 characters long, and contain only letters, numbers, underscores, or periods.",
                },
              })}
            />
            {errors.username && (
              <p className="text-red-600 text-xs px-1">
                {errors.username.message}
              </p>
            )}
          </>
        )}

        {/* Email */}
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full h-11 px-4 border border-transparent border-l-4 border-l-red-700
               bg-gray-100 text-gray-900 placeholder-gray-500 shadow-sm
               focus:outline-none focus:ring-2 focus:ring-red-700/50 focus:border-red-700
               transition duration-200 ease-in-out"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message:
                "Please enter a valid email address (e.g. username@example.com)",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-600 text-xs px-1">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="relative flex justify-center items-center">
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="w-full h-11 px-4 border border-transparent border-l-4 border-l-red-700 
          bg-gray-100 text-gray-900 placeholder-gray-500 shadow-sm
          focus:outline-none focus:ring-2 focus:ring-red-700/50 focus:border-red-700
          transition duration-200 ease-in-out"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number, special character, and be at least 8 characters long.",
              },
            })}
          />
          <button
            className="absolute right-2 text-neutral-500"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}{" "}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-600 text-xs px-1">{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-2 bg-gradient-to-r from-red-800 to-red-700 
               text-white font-semibold rounded-md shadow-md 
               hover:from-red-700 hover:to-red-600 active:scale-[0.98]
               transition-all duration-200 ease-in-out"
        >
          {isSigninForm ? "Sign in" : "Sign up"}
        </button>

        {/* Toggle Form */}
        <p className="text-sm text-center text-neutral-400 mt-3">
          {isSigninForm ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSigninForm(false)}
                className="font-semibold text-red-400 hover:text-red-300 transition-colors"
              >
                Sign up now
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSigninForm(true)}
                className="font-semibold text-red-400 hover:text-red-300 transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </form>

      <DevTool control={control} />
    </>
  );
};

export default SignInWithEmailPassword;
