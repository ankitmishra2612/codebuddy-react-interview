import { useState } from "react";
import PropTypes from "prop-types";

const Form1 = ({ formData, setFormData, nextStep }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    // Validate email (used online regex pattern)
    if (!formData.emailId) {
      errors.emailId = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      errors.emailId = "Email is invalid.";
    }

    // Validate password (used online regex pattern)
    const passwordPattern =
      /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9].*[0-9])(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9]).{8,}$/;
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (!passwordPattern.test(formData.password)) {
      errors.password =
        "Password must contain 2 capital letters, 2 small letters, 2 numbers, and 2 special characters.";
    }
    return errors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      nextStep();
    }
  };

  return (
    <div>
      <input
        type="email"
        value={formData.emailId}
        onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
        placeholder="Email"
        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
      {errors.emailId && <p className="text-red-500">{errors.emailId}</p>}

      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
        className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      <button
        onClick={handleNext}
        className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Save and Next
      </button>
    </div>
  );
};

export default Form1;
Form1.propTypes = {
  formData: PropTypes.shape({
    emailId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
