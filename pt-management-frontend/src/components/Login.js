import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { getLoginResponse } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const { error, isLoading, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const loginPayload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(getLoginResponse(loginPayload));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          {error && <p className="text-red-700">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Your Email"
                ref={emailRef}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******"
                ref={passwordRef}
              />
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
