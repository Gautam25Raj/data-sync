"use client";

import { Input, Typography } from "@material-tailwind/react";

const TagInputs = ({
  id,
  label,
  type,
  placeholder,
  input,
  setInput,
  icon,
  required,
}) => {
  const handleBackspace = (e) => {
    if (e.key === "Backspace" && input.endsWith(",")) {
      setInput(input.slice(0, input.lastIndexOf(",")));
    }
  };

  return (
    <div className="usernames-input" onKeyDown={handleBackspace}>
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

      {input && (
        <div className="space-x-1 mb-1 overflow-auto flex flex-wrap">
          {input.split(",").map((username, index) => (
            <span
              key={index}
              className="rounded-full px-3 py-1 bg-black text-white"
            >
              {username}
            </span>
          ))}
        </div>
      )}

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

export default TagInputs;
