import React, { useEffect, useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import AuthInput2 from "../onboarding/AuthInput2";
import GenerateCrediantial from "../Modal/GenerateCrediantial";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../Toaster/Toaster";
import { FiLoader } from "react-icons/fi";

const Step1 = ({
  register,
  errors,
  onNext,
  setValue,
  getValues,
  handleSubmit,
}) => {
  const onSubmit = (data) => {
    console.log("Step 1 Data:", data);
    onNext(); // Move to next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-[#001229] h-[410px] rounded-[18px] ">
        <h2 className="text-[18px] font-[700] p-4 ">Owner Details</h2>
        <div className="grid grid-cols-12 gap-4 p-4">
          <div className="col-span-6">
            <div className="mt-3">
              <AuthInput
                register={register("name", {
                  required: "Please enter name",
                })}
                text={"Name"}
                placeholder={"Enter name here"}
                type={"text"}
                error={errors.name}
              />
            </div>
            <div className="mt-3">
              <AuthInput
                text={"Job Title"}
                placeholder={"Dock manager"}
                type={"text"}
                register={register("jobTitle", {
                  required: "Please enter job title",
                })}
                error={errors.jobTitle}
              />
            </div>
            <div className="mt-3">
              <AuthInput
                text={"Phone Number"}
                placeholder={"000 0000 0000"}
                type={"text"}
                register={register("phoneNumber", {
                  required: "Please enter your phone number.",
                  pattern: {
                    value: /^\+1\d{10}$/,
                    message:
                      "Phone number must start with '+1' and contain exactly 10 digits following '+1'.",
                  },
                })}
                maxLength="12"
                error={errors.phoneNumber}
              />
            </div>
          </div>
          <div className="col-span-6">
            <div className="mt-3">
              <AuthInput
                register={register("email", {
                  required: "Please enter email address.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                text={"Email"}
                placeholder={"Enter email here"}
                type={"text"}
                error={errors.email}
              />
            </div>
            <div className="mt-3">
              <AuthInput
                text={"Location"}
                placeholder={"East California dock"}
                type={"text"}
                maxLength={80}
                register={register("location", {
                  required: "Please enter location",
                })}
                error={errors.location}
              />
            </div>
            <div className="mt-3">
              <AuthInput
                placeholder={"Onboarding Date"}
                register={register("onboarding", {
                  required: "Please enter onboarding date",
                })}
                error={errors.onboarding}
                text={"Onboarding Date"}
                type={"date"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 flex-wrap">
        <Link to={-1} className="hover:no-underline">
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-[#02203A] w-[235px]   h-[54px] rounded-[8px] text-[#199BD1] font-[700]"
            >
              Back
            </button>
          </div>
        </Link>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white"
            // onClick={() => setTab("2")}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

const Step2 = ({
  register,
  errors,
  onBack,
  onSubmit,
  getValues,
  setValue,
  handleSubmit,
  loading,

  setStep,
}) => {
  const onFormSubmit = (data) => {
    console.log("Step 2 Data:", data);
    onSubmit(data); // Call API or handle final submission
  };

  useEffect(() => {
    const nameValue = getValues("name");
    if (nameValue) setValue("name", nameValue); // Prefill the "name" field
  }, [getValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <div className="bg-[#001229] h-[594px] rounded-[18px] flex justify-center items-center">
          <div className="w-[536px] h-[565px] bg-[#1A293D] rounded-[18px] flex flex-col items-center justify-center">
            <div className="w-full px-12">
              <div className="text-start mb-6">
                <div className="text-[20px] font-[700] text-white mb-2">
                  Preview Details
                </div>
                <div className="text-[#FFFFFF80] text-[13px]">
                  Please ensure the accuracy of the information provided.
                  Incorrect details may result in the employee not receiving
                  their credentials.
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-full mb-5">
                  <AuthInput
                    register={register("name", {
                      required: "Please enter name",
                    })}
                    text={"Name"}
                    placeholder={"Enter name here"}
                    type={"text"}
                    isAuth={false}
                    error={errors.name}
                  />
                </div>
                <div className="w-full mb-5">
                  <AuthInput
                    register={register("password", {
                      required: "Please enter password.",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long.",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                      },
                    })}
                    maxLength={12}
                    text={"Password"}
                    placeholder={"Enter password here"}
                    type={"password"}
                    error={errors.password}
                    isAuth={false}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-[52px] lg:w-[434px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                <div className="flex items-center">
                  <span className="mr-1"> Generate Credentials</span>
                  {loading && (
                    <FiLoader className="animate-spin text-lg mx-auto" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white"
            onClick={() => setStep(1)}
          >
            Back
          </button>
        </div>
      </div>
    </form>
  );
};

const OwnerDetail = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [generateOpen, setGenerateOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleApiCall = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
        jobTitle: formData.jobTitle,
        location: formData.location,
        onboarding: formData.onboarding,
      };
      const response = await axios.post("/admin/customer", obj);
      if (response.status === 200) {
        setLoading(false);
        SuccessToast("Added Successfully");
        navigate("/ownerlist");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* onClick={() => setGenerateOpen(true)} */}
      <div>
        {step === 1 && (
          <Step1
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            onNext={handleNext}
            handleSubmit={handleSubmit}
          />
        )}
        {step === 2 && (
          <Step2
            register={register}
            errors={errors}
            onBack={handleBack}
            onSubmit={handleApiCall}
            getValues={getValues}
            setValue={setValue}
            handleSubmit={handleSubmit}
            loading={loading}
            setStep={setStep}
          />
        )}
      </div>
      <GenerateCrediantial
        isOpen={generateOpen}
        onClose={() => setGenerateOpen(false)}
      />
    </div>
  );
};

export default OwnerDetail;
