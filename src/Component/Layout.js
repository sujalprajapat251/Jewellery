import { Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <div className="layout-container">
        <Header />
        {/* <h1> hellllo</h1> */}
        <div className="content-wrapper">
            <div className="outlet-container">
            <Outlet />
          </div>
        </div>
        {/* <h1> hellllo</h1> */}
      <Footer />
      </div>
    </>
  )
}

export default Layout;