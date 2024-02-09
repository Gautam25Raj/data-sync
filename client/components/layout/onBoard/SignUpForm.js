"use client";

import { Button } from "@material-tailwind/react";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import FormInput from "@/components/ui/FormInput";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <FormInput
        label="Your Username"
        id={"username"}
        type={"text"}
        placeholder={"Username"}
        input={username}
        setInput={setUsername}
      />

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

      <Button size="lg" className="mt-2">
        Sign Up
      </Button>
    </>
  );
};
export default SignUpForm;
