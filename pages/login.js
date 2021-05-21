import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [nin, setNin] = useState(0);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.connectionString}/api/auth/login`,
        {
          nin,
          password,
        }
      );

      setLoading(false);
      toast.dark("Login Successful");

      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-secondary square text-white">
        Login Screen
      </h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={formSubmit}>
          <input
            type="number"
            placeholder="Enter NIN"
            required
            className="form-control mb-4 p-4"
            onChange={(e) => setNin(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            placeholder="Enter Your Pasword"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!nin || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Login"}
          </button>
        </form>

        <p className="text-center p-3">
          Don't have an account ? <Link href="/register">Register</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
