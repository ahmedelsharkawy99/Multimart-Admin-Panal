import { useState } from "react";
import { toast } from "react-toastify";

const useForm = (initialState) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((prevState) => {
      if (e.target.type === "file") {
        return {
          ...prevState,
          [e.target.id]: e.target.files[0] || null,
          path:
            (e.target.files[0] && URL.createObjectURL(e.target.files[0])) ||
            null,
        };
      }

      if (e.target.type === "checkbox") {
        return {
          ...prevState,
          [e.target.id]: e.target.checked,
        };
      }

      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = (submitHandler) => async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await submitHandler();
      setFormData(initialState);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
