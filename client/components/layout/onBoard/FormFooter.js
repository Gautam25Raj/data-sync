"use client";

import { CardFooter, Typography } from "@material-tailwind/react";

import Link from "next/link";

const FormFooter = ({ isSigningUp, setIsSigningUp }) => {
  return (
    <CardFooter className="flex justify-center -mt-4">
      {isSigningUp ? (
        <Typography color="gray" className="text-center font-normal">
          Already have an account?{" "}
          <Link
            href="#"
            onClick={() => setIsSigningUp((prev) => !prev)}
            className="font-medium underline text-gray-900 prevent-select"
          >
            Sign In
          </Link>
        </Typography>
      ) : (
        <Typography color="gray" className="text-center font-normal">
          Don't have an Account?{" "}
          <Link
            href="#"
            onClick={() => setIsSigningUp((prev) => !prev)}
            className="font-medium underline text-gray-900 prevent-select"
          >
            Sign Up
          </Link>
        </Typography>
      )}
    </CardFooter>
  );
};

export default FormFooter;
