/* eslint-disable react/prop-types */
import Navbar from "../ui/navbar";

const AuthLayout = ({ children }) => (
  <div className="py-8">
    <Navbar />
    <div>{children}</div>
  </div>
);

export default AuthLayout;
