import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [nin, setNin] = useState(0);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhonenumber] = useState();

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "credentials :>> ",
      nin,
      password,
      firstName,
      lastName,
      dob,
      phoneNumber,
      state,
      address
    );
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary text-white">
        Register Screen
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
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Enter Your Phone Number"
            required
            className="form-control mb-4 p-4"
            onChange={(e) => setPhonenumber(e.target.value)}
          />

          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="state"
            className="form-control mb-4 p-4"
            placeholder="Valid State"
            onChange={(e) => setState(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter Your Ethereum Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter Your Date of Birth"
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            placeholder="Enter Your Pasword"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>

        <p className="text-center p-3">
          Have an account ? <Link href="/login">Login</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
