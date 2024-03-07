"use client";

import { Button } from "@material-tailwind/react";

import { Magic } from "magic-sdk";

import { toast } from "sonner";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import useUser from "@/hooks/useUser";

import FormInput from "@/components/ui/FormInput";

const SignUpForm = () => {
  const { signUpUser } = useUser();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      if (!email || !password || !username) {
        throw new Error("Email, Username and password are required");
      }

      if (username.length < 3) {
        throw new Error("Username should be at least 3 characters long");
      }

      if (!email.includes("@")) {
        throw new Error("Invalid email format");
      }

      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters long");
      }

      const magic = new Magic(process.env.NEXT_PUBLIC_API_KEY);

      await magic.auth.loginWithEmailOTP({
        email: email,
        showUI: true,
      });

      const response = await signUpUser({ email, username, password });

      if (response) {
        toast.success("User created successfully.");
      }

      setIsLoading(false);

      toast.loading("Logging in...");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormInput
        label="Your Username"
        id={"username"}
        type={"text"}
        placeholder={"datasync"}
        input={username}
        setInput={setUsername}
        required
      />

      <FormInput
        label="Email"
        id={"email"}
        type={"email"}
        placeholder={"datasync@gmail.com"}
        input={email}
        setInput={setEmail}
        required
      />

      <FormInput
        id="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        input={password}
        setInput={setPassword}
        required
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
        onClick={handleSignUp}
        size="lg"
        className="mt-2"
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="mx-auto animate-spin" />
        ) : (
          "Sign Up"
        )}
      </Button>
    </>
  );
};
export default SignUpForm;
