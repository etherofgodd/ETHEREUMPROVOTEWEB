import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
