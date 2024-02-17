"use client";

import { Input, Typography } from "@material-tailwind/react";

const FormInput = ({
  id,
  label,
  type,
  placeholder,
  input,
  setInput,
  icon,
  required,
}) => {
  return (
    <div>
      <Typography
        as="label"
        htmlFor={id}
        variant="small"
        color="gray"
        className="mb-2 font-semibold cursor-default prevent-select"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Typography>

      <Input
        id={id}
        type={type || "text"}
        placeholder={placeholder || ""}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="!border-2 !border-gray-300 focus:!border-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        icon={icon && icon}
      />
    </div>
  );
};

export default FormInput;
