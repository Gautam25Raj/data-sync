import { CardHeader, Typography } from "@material-tailwind/react";

import Image from "next/image";

const FormHeader = ({ isSigningUp }) => {
  return (
    <CardHeader
      color="gray"
      floated={false}
      shadow={true}
      className="m-0 grid place-items-center px-4 py-8 text-center"
    >
      <div className="-mb-8 p-6 text-white prevent-select">
        <Image
          src="/assets/logo-white.png"
          alt="DataSync"
          width={100}
          height={100}
        />
      </div>

      <Typography variant="h5" color="white">
        {isSigningUp ? "Sign Up in DataSync" : "Welcome Back!"}
      </Typography>
    </CardHeader>
  );
};

export default FormHeader;
