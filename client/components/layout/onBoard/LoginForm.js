"use client";

import { Button } from "@material-tailwind/react";

import { toast } from "sonner";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import useUser from "@/hooks/useUser";

import FormInput from "@/components/ui/FormInput";

const LoginForm = () => {
  const { loginUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      if (!email.includes("@")) {
        throw new Error("Invalid email format.");
      }

      const response = await loginUser(email, password);

      if (response) {
        toast.success("User created successfully.");
      }

      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
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
