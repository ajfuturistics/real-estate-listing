import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../redux/user/userSlice";

const Home = () => {
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoggedIn, users } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/property");
    }
  }, [isLoggedIn, navigate]);

  const checkFields = (mail, pass) => {
    let errObj = {};
    // eslint-disable-next-line no-useless-escape
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (mail.trim() === "") {
      errObj = { ...errObj, email: { message: "Email is required" } };
    }
    if (!regex.test(mail)) {
      errObj = { ...errObj, email: { message: "Invalid Email" } };
    }

    if (!pass.length >= 8) {
      errObj = {
        ...errObj,
        password: { message: "Password must be minimum 8 characters" },
      };
    }
    if (pass.trim() === "") {
      errObj = { ...errObj, password: { message: "Password is required" } };
    }

    return Object.keys(errObj).length === 0 ? false : errObj;
  };

  const clearErrors = () => {
    setTimeout(() => {
      setError({});
    }, [4000]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checks = checkFields(email, password);

    console.log("checks", checks);

    if (checks) {
      setError(checks);
      clearErrors();
      return;
    }

    if (isNew) {
      // this checks will come from backend
      const emailExists = users.some((u) => u.email === email);
      if (emailExists) {
        setError({ ...error, email: { message: "Email already exists" } });
        clearErrors();
        return;
      }

      console.log({ email, password }, "Register");

      dispatch(register({ email, password }));
    } else {
      // this checks will come from backend
      const userCheck = users.find((u) => u.email === email);
      if (!userCheck) {
        setError({ ...error, email: { message: "Email does not exists" } });
        clearErrors();
        return;
      }
      if (userCheck.password !== password) {
        setError({
          ...error,
          password: { message: "Invalid password" },
        });
        clearErrors();
        return;
      }

      dispatch(login({ email, password }));
    }

    // clearing fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="md:w-full box-border relative flex flex-col justify-center min-h-screen">
      <div className="md:w-full m-2 p-4 md:p-6 md:m-auto bg-white rounded shadow-lg ring-2 ring-purple-800/50 lg:max-w-md">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          {isNew ? "Register" : "Login"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-800">
              Email
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error?.email?.message && (
              <span className="inline-flex text-sm text-red-600">
                {error?.email?.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="password" className="block text-sm text-gray-800">
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error?.password?.message && (
                <span className="inline-flex text-sm text-red-700">
                  {error?.password?.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              {isNew ? "Register" : "Login"}
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          {isNew ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsNew((prev) => !prev)}
            className="font-medium text-purple-600 hover:underline cursor-pointer"
          >
            {isNew ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
