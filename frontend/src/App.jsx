import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import LoginPage from "./screens/LoginPage";
import NotFoundPage from "./screens/NotFoundPage";
import HomePage from "./screens/HomePage";
import SubscriptionsPage from "./screens/SubscriptionsPage";
import SuccessPage from "./screens/SuccessPage";
import FailurePage from "./screens/FailurePage";
import MoviePage from "./screens/MoviePage";
import MyListPage from "./screens/MyListPage";
import AISearchPage from "./screens/AISearchPage";
import { Bounce, ToastContainer } from "react-toastify";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import UpgradePlanPage from "./screens/UpgradePlanPage";

function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="868535194841-km66e0hu3e9l026biuopvgvjcj9ctrn0.apps.googleusercontent.com">
        <LoginPage></LoginPage>
      </GoogleOAuthProvider>
    );
  };

  return (
    <Provider store={appStore}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/fail" element={<FailurePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/subscription" element={<SubscriptionsPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/list" element={<MyListPage />} />
            <Route path="/subscription/upgrade" element={<UpgradePlanPage />} />
            <Route path="/movies/suggestions" element={<AISearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
