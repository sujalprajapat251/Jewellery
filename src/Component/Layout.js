import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import { useContext, useEffect, useState } from "react";
import noteContext from "../Context/noteContext";

const Layout = () => {
  const { allCategory, allProduct, addwishlistHandler, wishlistID, findWishlistID, bestseller } = useContext(noteContext);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (allCategory && allProduct && addwishlistHandler && wishlistID && findWishlistID && bestseller) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);

      // Cleanup timer on unmount
      return () => clearTimeout(timer);
    }
  }, [allCategory, allProduct, addwishlistHandler, wishlistID, findWishlistID, bestseller]);

  return (
    <>
      {isLoaded ?

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
        </div> :
        <Loader></Loader>
      }
    </>
  )
}

export default Layout;