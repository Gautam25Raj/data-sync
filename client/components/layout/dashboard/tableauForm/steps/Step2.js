import FormInput from "@/components/ui/FormInput";

const Step2 = ({
  clientId,
  setClientId,
  appSecretId,
  setAppSecretId,
  appSecretValue,
  setAppSecretValue,
}) => {
  return (
    <div className="space-y-4 max-w-md w-full mx-auto">
      <FormInput
        label="Your Client ID"
        id={"client-id"}
        type={"text"}
        placeholder={"abcd-efgh-ijkl-mnop-qrst"}
        input={clientId}
        setInput={setClientId}
      />

      <FormInput
        label="Your App Secret ID"
        id={"app-secret-id"}
        type={"password"}
        placeholder={"abcd-efgh-ijkl-mnop-qrst"}
        input={appSecretId}
        setInput={setAppSecretId}
      />

      <FormInput
        label="Your App Secret Value"
        id={"app-secret-value"}
        type={"password"}
        placeholder={"abcd-efgh-ijkl-mnop-qrst"}
        input={appSecretValue}
        setInput={setAppSecretValue}
      />
    </div>
  );
};

export default Step2;
