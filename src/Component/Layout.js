import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="layout-container">
        {/* <Header /> */}
        <h1> hellllo</h1>
        <div className="content-wrapper">
            <div className="outlet-container">
            <Outlet />
          </div>
        </div>
        <h1> hellllo</h1>

      </div>
    </>
  )
}

export default Layout;