import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
      <div className="h-16 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="text-indigo-500 ">
          <h2 className="font-semibold text-xl">Real-Estate Listing</h2>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div className="">
            <button
              onClick={logoutUser}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
            >
              <span>Logout</span>
            </button>
          </div>
          <div className="">
            <Link to="/profile" className="">
              <img
                className="w-12 h-12 rounded-full"
                src="/user-avatar.png"
                alt="userlogo"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
