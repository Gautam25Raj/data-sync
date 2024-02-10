"use client";

import { Button } from "@material-tailwind/react";

import { toast } from "sonner";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { setUser } from "@/redux/slice/userSlice";

import FormInput from "@/components/ui/FormInput";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warning("Email, Username and password are required");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
        return;
      }

      const data = await response.json();
      dispatch(setUser(data));

      toast.success("Welcome Back! You are now signed up!");

      setEmail("");
      setPassword("");

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormInput
        label="Email"
        id={"email"}
        type={"email"}
        placeholder={"Email"}
        input={email}
        setInput={setEmail}
      />

      <FormInput
        id="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        input={password}
        setInput={setPassword}
        icon={
          showPassword ? (
            <FaEyeSlash
              className="h-5 w-5 text-gray-800 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <FaEye
              className="h-5 w-5 text-gray-800 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )
        }
      />

      <Button onClick={handleLogin} size="lg" className="mt-2">
        Login
      </Button>
    </>
  );
};

export default LoginForm;
