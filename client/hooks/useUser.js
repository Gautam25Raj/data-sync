"use client";

import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { setUser } from "@/redux/slice/userSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const userData = await response.json();

      return userData;
    } catch (err) {
      toast.error(err.message);
      return null;
    }
  };

  const signUpUser = async ({ email, username, password }) => {
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
          // credentials: "include",
          body: JSON.stringify({ email, password, username }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      dispatch(setUser(data));

      localStorage.setItem("token", data.token);

      toast.success("User created successfully");

      router.push("/dashboard");
    } catch (error) {
      toast.error(err.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
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
        throw new Error(data.error);
      }

      const data = await response.json();
      dispatch(setUser(data));
      localStorage.setItem("token", data.token);

      toast.success("Welcome Back! You are now signed up!");

      router.push("/dashboard");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { getUser, signUpUser, loginUser };
};

export default useUser;
