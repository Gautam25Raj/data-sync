"use client";

import { Card, CardBody } from "@material-tailwind/react";

import { useState } from "react";

import FormHeader from "./FormHeader";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import FormFooter from "./FormFooter";

const CheckoutForm = () => {
  const [isSigningUp, setIsSigningUp] = useState(true);

  return (
    <Card className="w-full max-w-[24rem]">
      <FormHeader isSigningUp={isSigningUp} />

      <CardBody>
        <form className="flex flex-col gap-4">
          {isSigningUp ? <SignUpForm /> : <LoginForm />}
        </form>
      </CardBody>

      <FormFooter isSigningUp={isSigningUp} setIsSigningUp={setIsSigningUp} />
    </Card>
  );
};

export default CheckoutForm;
