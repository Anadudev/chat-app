import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router";
import AuthDesign from "../components/authDesign";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loginLoading } = useAuthStore();

  const validateForm = () => {
    const { email, password } = formData;
    switch (true) {
      case !email || !email.trim():
        toast.error("Email is required");
        return false;
      case password.length < 6:
        toast.error("Password must be greater than 6 characters");
        return false;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const success = validateForm();
      if (!success) return;
      e.preventDefault();
      await login(formData);
      // toast.success("User logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error logging in user");
    } finally {
      setFormData({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* email input */}
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  id=""
                  className="input input-bordered w-full pl-10"
                  placeholder="Tt5Hr@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* password input */}
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id=""
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-center/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthDesign
        title="join Our Community"
        subtitle="Connect with friends,  share moments, and stay in touch with your loved ones"
      />
    </div>
  );
};

export default LoginPage;
