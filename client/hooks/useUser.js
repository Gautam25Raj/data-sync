"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { clearUser, setUser } from "@/redux/slice/userSlice";

const useUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.user);

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

      return userData.data;
    } catch (err) {
      toast.error(err.message);
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
      dispatch(setUser(data.data));

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
      dispatch(setUser(data.data));
      localStorage.setItem("token", data.token);

      toast.success("Welcome Back! You are now signed up!");

      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updatedUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          // credentials: "include",
          body: JSON.stringify(currentUser),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      dispatch(setUser(data.data));
      localStorage.setItem("token", data.token);

      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          // credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      dispatch(clearUser());
      localStorage.removeItem("token");

      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      localStorage.removeItem("token");
      dispatch(clearUser(null));
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  return {
    getUser,
    signUpUser,
    loginUser,
    updatedUser,
    deleteUser,
    logoutUser,
  };
};

export default useUser;
