import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogoutResponse } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPanel() {

  const { isLoggedIn, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(getLogoutResponse());
  }

  useEffect(() => {
    console.log(3333);
    if (!isLoggedIn) navigate("/");
    if (error) toast(error);

  }, [error, isLoggedIn, navigate]);

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-blue-900 text-white flex flex-col">
          <div className="h-16 flex items-center justify-center border-b border-blue-800">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-2 py-4">
            <ul>
              <li className="mb-2">
                <a
                  href="#dashboard"
                  className="block px-4 py-2 rounded hover:bg-blue-800"
                >
                  Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#patients"
                  className="block px-4 py-2 rounded hover:bg-blue-800"
                >
                  Patient Lists
                </a>
              </li>
              <li className="mt-auto mb-2">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 rounded hover:bg-blue-800"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold mb-6">
            Welcome to the Admin Dashboard
          </h2>
          <div className="bg-white shadow-md rounded p-4">
            <p>This is the main content area.</p>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminPanel;
