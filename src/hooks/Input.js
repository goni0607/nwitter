import { useState } from "react";

export const useInput = (init = "") => {
  const [value, setValue] = useState(init);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setValue(value);
  };
  return { value, onChange };
};
