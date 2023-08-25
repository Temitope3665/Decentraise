/* eslint-disable react/prop-types */
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { ErrorText } from "./error-text";

const TextAreaInput = ({ label, name, type, placeholder, className, errors, onChange, value, defaultValue, labelClassName }) => {
  return (
    <div className="mt-8">
      <Label htmlFor={name} className={`${labelClassName} text-sm`}>{label}</Label>
      <Textarea
        type={type || 'text'}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`rounded-lg mt-2 ${className} placeholder:text-xs`}
        minLength="50"
        error={errors && errors[name]?.message}
        onChange={onChange}
        defaultValue={defaultValue || ''}
        value={value}
      />
        <ErrorText message={errors && errors[name]?.message} />
    </div>
  );
};

export default TextAreaInput;
