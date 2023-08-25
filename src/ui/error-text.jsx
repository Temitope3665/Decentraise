/* eslint-disable react/prop-types */
export const ErrorText = ({ message }) => (
  <p
    className={`text-[12px] my-px first-letter:capitalize text-error`}
  >
    {message?.replace(/_/g, " ")}
  </p>
);
