import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
// pages import
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import SettingsPage from "./pages/settingsPage";
// router import
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, authLoading } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  console.log(authUser);
  if (authLoading && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
