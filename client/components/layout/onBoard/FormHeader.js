import { CreditCardIcon } from "@heroicons/react/24/solid";

import { CardHeader, Typography } from "@material-tailwind/react";

const FormHeader = ({ isSigningUp }) => {
  return (
    <CardHeader
      color="gray"
      floated={false}
      shadow={true}
      className="m-0 grid place-items-center px-4 py-8 text-center"
    >
      <div className="mb-4 h-20 p-6 text-white">
        <CreditCardIcon className="h-10 w-10 text-white" />
      </div>

      <Typography variant="h5" color="white">
        {isSigningUp ? "Sign Up in DataSync" : "Welcome Back!"}
      </Typography>
    </CardHeader>
  );
};

export default FormHeader;
