import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/nav";
import logowhite from "../Media/logoWhite.svg";
import Advert1 from "../components/adverts/adComponent1";

const Home = () => {
  return (
    <div>
      <div className="hero_img h-[90vh] overflow-hidden">
        <Navbar bgClass={"backdrop-blur-md bg-white/20"} logo={logowhite} />
        <div className="grid grid-cols-1 md:grid-cols-3 m-5 px-0 md:px-5 h-[76%] content-between">
          <Outlet />

          <div className="p-8 col-span-2 hidden md:block lg:block">
            <Advert1 />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
