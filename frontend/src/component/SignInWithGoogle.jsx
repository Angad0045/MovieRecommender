import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { BASE_URL } from "../Utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/Slices/UserSlice";

const SignInWithGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseGoogle = async (authResult) => {
    try {
      const code = authResult.code;
      if (code) {
        const res = await axios.post(`${BASE_URL}/auth/signInWithGoogle`, {
          code,
        });
        console.log(res.data);
        dispatch(addUser(res?.data?.user));
        navigate("/home");
      } else {
        console.log("No authorization code received from Google.");
      }
    } catch (err) {
      console.error("Something went wrong while requesting Google code:", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => console.error("Google login failed:", error),
    flow: "auth-code",
  });

  return (
    <>
      <div className="w-full p-5 flex justify-center">
        <button
          type="button"
          onClick={googleLogin}
          className="flex items-center justify-center w-full gap-3 p-3 border border-gray-300 rounded-xl 
             bg-white text-gray-700 font-medium shadow-sm 
             hover:bg-gray-50 active:scale-[0.98] 
             transition-all duration-200"
        >
          {/* Google Icon */}
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </>
  );
};

export default SignInWithGoogle;
