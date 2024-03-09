import { Button } from "@material-tailwind/react";

import FormInput from "@/components/ui/FormInput";

const Step3 = ({
  patName,
  setPatName,
  patSecret,
  setPatSecret,
  handleSubmit,
}) => {
  return (
    <div className="space-y-4 max-w-md w-full mx-auto">
      <FormInput
        label="Your App Secret ID"
        id={"app-secret-id"}
        type={"password"}
        placeholder={"abcd-efgh-ijkl-mnop-qrst"}
        input={patName}
        setInput={setPatName}
      />

      <FormInput
        label="Your App Secret Value"
        id={"app-secret-value"}
        type={"password"}
        placeholder={"abcd-efgh-ijkl-mnop-qrst"}
        input={patSecret}
        setInput={setPatSecret}
      />

      <Button className="w-full" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default Step3;
