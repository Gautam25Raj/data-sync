"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import jwt from "jsonwebtoken";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

import { setUser } from "@/redux/slice/userSlice";

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token`,
            {
              method: "GET",

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            router.push("/");
          }

          const decodedToken = jwt.decode(token);
          dispatch(
            setUser({
              _id: decodedToken.id,
              email: decodedToken.email,
              username: decodedToken.username,
            })
          );

          const data = await response.json();

          toast.success("Logged in successfully.");
          localStorage.setItem("token", data.token);
        } else {
          router.push("/");
        }
      } catch (err) {
        toast.error("An error occurred while checking token.");
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkToken();
  }, []);

  if (isCheckingToken) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <AiOutlineLoading3Quarters
          size={30}
          className="animate-spin h-10 w-10"
        />
      </div>
    );
  }

  return <Suspense>{children}</Suspense>;
};

export default AuthProvider;
