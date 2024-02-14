"use client";

import { Button } from "@material-tailwind/react";

import { toast } from "sonner";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { setUser } from "@/redux/slice/userSlice";

import FormInput from "@/components/ui/FormInput";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("gautam@gg.com");
  const [password, setPassword] = useState("12345678");

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",
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
      localStorage.setItem("token", data.token);

      toast.success("Welcome Back! You are now signed up!");

      setEmail("");
      setPassword("");
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
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

      <Button
        disabled={isLoading}
        onClick={handleLogin}
        size="lg"
        className="mt-2"
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="mx-auto animate-spin" />
        ) : (
          "Login"
        )}
      </Button>
    </>
  );
};

export default LoginForm;
