import { useState } from 'react';
// Источник хука: https://codepen.io/thedevilinthewhitecity/pen/bGpyGBg

/**
 * Хук управления формой
 */
export function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
