// MultiStepForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  const navigate = useNavigate();

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const { ...dataToSubmit } = formData;
    const response = await fetch("https://codebuddy.review/submit", {
      method: "POST",
      body: JSON.stringify(dataToSubmit),
    });
    if (response.ok) {
      navigate("/posts");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {currentStep === 1 && (
          <Form1 formData={formData} setFormData={setFormData} nextStep={nextStep} />
        )}
        {currentStep === 2 && (
          <Form2
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 3 && (
          <Form3
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
