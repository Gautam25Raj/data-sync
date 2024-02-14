"use client";

import { Textarea, Typography } from "@material-tailwind/react";

const FormTextarea = ({
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
        className="mb-2 font-medium cursor-default prevent-select"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Typography>

      <Textarea
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

export default FormTextarea;
