import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../Utils/Slices/UserSlice";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store?.user);
  const plan = user?.planType;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAvatarSectionOpen, setIsAvatarSectionOpen] = useState(false);
  // console.log(user);

  const handleManageSubscription = async () => {
    const customerId = user?.customer?.id;
    try {
      const res = await axios.get(
        `${BASE_URL}/payment/manage/subscription/${customerId}`,
        {
          withCredentials: true,
        }
      );
      const url = res?.data?.url;
      if (url) {
        window.location.href = url;
      } else {
        console.log("Something went wrong while fetching Url");
      }
    } catch (err) {
      console.log(err);
      navigate("/home");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };
  return (
    <div className="w-screen">
      <div className="bg-neutral-900 inset-0 -z-10">
        <div className="mix-blend-overlay">
          <img
            src="LoginPageImage.jpg"
            alt="Logo"
            className="h-32 md:h-40 w-screen object-cover"
          />
        </div>
        <div className="absolute top-16 md:top-10 left-1/2 -translate-x-1/2 flex justify-center items-center">
          <h1 className="bg-white/10 p-2 md:p-4 rounded-3xl md:rounded-4xl text-2xl md:text-5xl lg:text-7xl text-red-700 font-black cursor-pointer">
            ...MovieRecommender
          </h1>
          <img
            className="h-16 md:h-20 lg:h-28 -m-6 md:-m-8 lg:-m-10"
            src="Popcorn Bucket.png"
            alt="Popcorn Bucket"
          />
        </div>
      </div>
      {user && (
        <div className="flex flex-col items-center px-5 md:px-20">
          <button onClick={() => setIsAvatarSectionOpen(!isAvatarSectionOpen)}>
            <img
              src="UserIcon.png"
              alt="Remy Sharp"
              className="absolute top-2 md:top-5 right-2 md:right-5 w-10 h-10 bg-white p-1 border-2 border-neutral-800 rounded-full object-cover"
            />
          </button>
          {isAvatarSectionOpen && (
            <ul className="absolute bg-neutral-800/80 text-white min-w-[250px] h-auto rounded-2xl mt-3 top-12 md:top-14 right-2 md:right-5 z-10">
              <li>
                <div className="bg-neutral-700/50 flex flex-col justify-center items-center m-3 p-3 rounded-2xl">
                  <img
                    src={user.picture ? user.picture : "UserIcon.png"}
                    alt="Remy Sharp"
                    className="w-10 h-10 bg-white p-1 rounded-full object-cover"
                  />
                  <h1 className="mt-2 text-xl font-bold">{user.name}</h1>
                  <h4 className="text-sm font-semibold">{user.email}</h4>
                </div>
              </li>
              <li className="mt-3 pl-3 py-1 text-sm hover:bg-neutral-700/50">
                <button onClick={() => navigate("/list")}>My List</button>
              </li>
              {plan === "premium" && (
                <li className="pl-3 py-1 text-sm hover:bg-neutral-700/50">
                  <button onClick={handleManageSubscription}>
                    Manage Subscription
                  </button>
                </li>
              )}
              <li className="pl-3 py-1 text-sm hover:bg-neutral-700/50">
                <button onClick={() => navigate("/subscription/upgrade")}>
                  Upgrade
                </button>
              </li>
              <li className="mb-3 pl-3 py-1 text-sm hover:bg-neutral-700/50">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
