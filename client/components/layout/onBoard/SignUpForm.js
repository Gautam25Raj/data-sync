"use client";

import { Button } from "@material-tailwind/react";

import { toast } from "sonner";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import FormInput from "@/components/ui/FormInput";
import { setUser } from "@/redux/slice/userSlice";

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      toast.warning("Email, Username and password are required");
      return;
    }

    if (username.length < 3) {
      toast.error("Username should be at least 3 characters long");
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, username }),
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

      toast.success("User created successfully");

      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
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
