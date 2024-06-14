import { useState } from "react";
import PropTypes from "prop-types";

const Form3 = ({ formData, setFormData, prevStep, handleSubmit }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    // Validate countryCode
    if (!formData.countryCode) {
      errors.countryCode = "Country Code is required.";
    }

    // Validate phoneNumber
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone Number is required and must be 10 digits.";
    }

    // Validate acceptTermsAndCondition
    if (!formData.acceptTermsAndCondition) {
      errors.acceptTermsAndCondition = "You must accept the Terms and Conditions.";
    }

    return errors;
  };

  const handleSaveAndSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <div className="mb-4">
        <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
          Country Code
        </label>
        <select
          id="countryCode"
          value={formData.countryCode}
          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
          className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
            errors.countryCode ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Country Code</option>
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {errors.countryCode && <p className="mt-1 text-sm text-red-500">{errors.countryCode}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
            errors.phoneNumber ? "border-red-500" : ""
          }`}
        />
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.acceptTermsAndCondition}
            onChange={(e) =>
              setFormData({ ...formData, acceptTermsAndCondition: e.target.checked })
            }
            className="form-checkbox h-5 w-5 text-green-600"
          />
          <span className="ml-2 text-sm text-gray-700">I accept the Terms and Conditions</span>
        </label>
        {errors.acceptTermsAndCondition && (
          <p className="mt-1 text-sm text-red-500">{errors.acceptTermsAndCondition}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleSaveAndSubmit}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

Form3.propTypes = {
  formData: PropTypes.shape({
    countryCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    acceptTermsAndCondition: PropTypes.bool.isRequired,
    // Add other properties as per your actual formData structure
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Form3;
