import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { addUser } from "./Slices/UserSlice";
import { useEffect } from "react";
import { BASE_URL } from "./Constants";

const ProtectedRoutes = () => {
  const userData = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const FetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(`${BASE_URL}/auth/user`, {
        withCredentials: true,
      });
      // console.log(res?.data);
      dispatch(addUser(res?.data));
    } catch (err) {
      if (err?.status === 501) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    FetchUser();
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
