import { useState } from "react";

export const useInput = (init = "") => {
  const [value, setValue] = useState(init);
  const changeValue = (val) => {
    setValue(val);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setValue(value);
  };
  return { value, onChange, changeValue };
};
