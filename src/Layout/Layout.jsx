import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/Header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
