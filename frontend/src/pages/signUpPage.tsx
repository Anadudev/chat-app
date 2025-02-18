import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { MessageSquare } from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, singUpLoading } = useAuthStore();

  const validateForm = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      return false;
    }
    return true;
  };

  const handleSyubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (validateForm()) {
        await signup(formData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="in-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
