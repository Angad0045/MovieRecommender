import Footer from "../component/Footer";
import Movies from "../component/Movies";
import Navbar from "../component/Navbar";

const HomePage = () => {
  return (
    <>
      <div className="bg-neutral-900 pb-5">
        <Navbar />
        <Movies />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
