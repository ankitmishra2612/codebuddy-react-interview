import { useState } from "react";
import PropTypes from "prop-types";

const Form2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    // Validate firstName
    if (!formData.firstName) {
      errors.firstName = "First Name is required.";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.firstName = "First Name must contain only alphabets.";
    } else if (formData.firstName.length < 2 || formData.firstName.length > 50) {
      errors.firstName = "First Name must be between 2 to 50 characters.";
    }

    // Validate lastName (optional)
    if (formData.lastName && !/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = "Last Name must contain only alphabets.";
    }

    // Validate address
    if (!formData.address || formData.address.length < 10) {
      errors.address = "Address is required and must be at least 10 characters long.";
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
    <div className="rounded-lg bg-white p-8 shadow-md">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
            errors.firstName ? "border-red-500" : ""
          }`}
        />
        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name (Optional)
        </label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
            errors.lastName ? "border-red-500" : ""
          }`}
        />
        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
            errors.address ? "border-red-500" : ""
          }`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

Form2.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired, // Assuming address is an array of strings
    length: PropTypes.number.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default Form2;
