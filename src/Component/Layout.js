import { Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <div className="layout-container">
        <Header />
        <div className="content-wrapper">
            <div className="outlet-container">
            <Outlet />
          </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Layout;