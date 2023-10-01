"use client";

import React, { useState, useEffect } from "react";
import { Steps, Button } from "@arco-design/web-react";
import { IconLeft, IconRight } from "@arco-design/web-react/icon";
import axios from "axios";

const Step = Steps.Step;

const stepsData = [
  {
    name: "Personal Details",
    description: "Your Personal Information",
  },
  {
    name: "Family & Nominee Info ",
    description: "Family Details",
  },
  {
    name: "Address Info",
    description: "Address and Location Information",
  },
  {
    name: "Occupation Info",
    description: "Professional Information",
  },
];

const mapStepForm: {
  [key: number]: ({ formData, setFormData }: any) => JSX.Element;
} = {
  1: PersonalDetails,
  2: FamilyNominee,
  3: AddressInfo,
  4: OccupationInfo,
};

function App() {
  const [current, setCurrent] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    nationality: "",
    education: "",
    govID: null,
    phone: "",
    fatherName: "",
    motherName: "",
    grandfatherName: "",
    nomineeName: "",
    nomineeRelationship: "",
    nomineeGovId: "",
    province: "",
    district: "",
    municipality: "",
    wardNo: "",
    toleName: "",
    occupationInfo: "",
    annualIncome: "",
  });

  function renderContent(step: any) {
    return (
      <div
        className="text-[#C2C7CC] justify-between flex flex-col py-10"
        style={{
          width: "100%",
        }}
      >
        <div className="">{step} </div>

        <div className="flex gap-2 justify-center">
          <Button
            className="pl-[8px]"
            disabled={current <= 1}
            onClick={() => setCurrent(current - 1)}
          >
            <IconLeft />
            Back
          </Button>
          <Button
            className={`bg-blue-300`}
            disabled={current >= stepsData.length}
            onClick={() => setCurrent(current + 1)}
            type="default"
          >
            Next
            <IconRight />
          </Button>
          {current === 4 ? (
            <button onClick={() => {}} className="">
              Submit
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="root" className="mx-auto container p-10">
      <div className="flex flex-col md:flex-row">
        <div className="p-20">
          <Steps className="" direction="vertical" current={current}>
            {stepsData.map((step, index) => (
              <Step
                key={index}
                title={step.name}
                description={step.description}
              />
            ))}
          </Steps>
        </div>
        {renderContent(mapStepForm[current]({ formData, setFormData }))}
      </div>
    </div>
  );
}

export default App;

function PersonalDetails({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) {
  const { fullName, gender, dob, nationality, education, phone } = formData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGovIDFileChange = (e: any) => {
    // Store the selected file
    setFormData({
      ...formData,
      govIDFile: e.target.files[0], // Update the form data with the selected file
    });
  };

  async function handleSubmit(e: any) {
    e.preventDefault(); // Prevent the form from submitting via browser default behavior

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", fullName);
      formDataToSend.append("gender", gender);
      formDataToSend.append("dob", dob);
      formDataToSend.append("nationality", nationality);
      formDataToSend.append("education", education);
      formDataToSend.append("phone", phone);
      formDataToSend.append("govIDFile", formData.govIDFile); // Append the selected file

      const apiUrl = "http://192.168.100.124:6970/ocr";

      if (!apiUrl) {
        console.log("api url problems");
        return;
      }

      const response = await axios.post(apiUrl + "/ocr", formDataToSend, {
        
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response from the API as needed
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-5 text-black text-base py-10">
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Full Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="fullName"
          id="full-name"
          placeholder="Full Name"
          value={fullName}
          onChange={handleChange}
        />
      </div>
      {/* Add other input fields here */}
      {/* ... */}
      <div className="flex flex-col w-1/2">
        <span className="text-xs mb-1">Gov ID (Licence / Citizenship)</span>
        <input
          type="file"
          name="govIDFile"
          accept=".jpg, .jpeg, .png, .gif"
          id="file-input"
          className="block w-full border border-gray-200 shadow-sm rounded-[0.40rem] text-sm file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
          onChange={handleGovIDFileChange}
        />
        <span className="text-xs italic mt-1">
          Only files with (.jpg, .jpeg, .png, .gif) extensions are accepted
        </span>
        <button onClick={handleSubmit}>Send!</button>
      </div>
    </div>
  );
}

// Define FamilyNominee, AddressInfo, and OccupationInfo components similarly.

function FamilyNominee({ formData, setFormData }: any) {
  const {
    fatherName,
    motherName,
    grandfatherName,
    nomineeRelationship,
    nomineeName,
  } = formData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="grid md:grid-cols-2 gap-5 text-black">
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Father&apos;s Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="fatherName"
          id="fatherName"
          onChange={handleChange}
          value={fatherName}
          placeholder="Father's Name"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs mb-1">Mother&apos;s Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="motherName"
          id="motherName"
          placeholder="Mother's Name"
          value={motherName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Grand Father&apos;s Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="grandfatherName"
          id="grandfatherName"
          placeholder="Grandfather's Name"
          value={grandfatherName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Nominee&apos;s Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="nomineeName"
          id="nomineeName"
          placeholder="Nominee's Name"
          value={nomineeName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Relationship with Nominee</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="nomineeRelationship"
          id="nomineeRelation"
          placeholder="Relation with Nominees"
          value={nomineeRelationship}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col col-span-2">
        <span className="text-xs mb-1">
          Gov ID (Licence / Citizenship) of Nominee
        </span>
        <input
          type="file"
          name="fileInput"
          accept=".jpg, .jpeg, .png, .gif"
          id="fileInput"
          className="block w-full border border-gray-200 shadow-sm rounded-[0.40rem] text-sm file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
        />
        <span className="text-xs italic mt-1">
          Only files with (.jpg, .jpeg, .png, .gif) extensions are accepted
        </span>
      </div>
    </div>
  );
}

function AddressInfo({ formData, setFormData }: any) {
  const { province, district, municipality, wardNo, toleName } = formData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="grid md:grid-cols-2 gap-5 text-black">
      <div className="flex flex-col">
        <span className="text-xs mb-1">Province</span>
        <select
          id="province"
          name="province"
          value={province}
          onChange={handleChange}
          className="border-[1px] h-full rounded-[0.40rem] px-2 py-2"
        >
          {[
            "Koshi Province ",
            "Madhesh Province ",
            "Bagmati Province ",
            "Gandaki Province ",
            "Lumbini Province ",
            "Karnali Province ",
            "Sudurpashchim Province ",
          ].map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">District</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="district"
          id="district"
          value={district}
          onChange={handleChange}
          placeholder="Arghakhanchi"
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Metropolitan / Municipality</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="municipality"
          id="municipality"
          value={municipality}
          onChange={handleChange}
          placeholder="Kathmandu Metropolitan City"
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Ward No.</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="wardNo"
          id="wardNo"
          value={wardNo}
          onChange={handleChange}
          placeholder="Ward no."
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Tole Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="toleName"
          id="toleName"
          value={toleName}
          onChange={handleChange}
          placeholder="Subas Nagar"
        />
      </div>
    </div>
  );
}

function OccupationInfo({ formData, setFormData }: any) {
  const { occupationInfo, annualIncome } = formData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="grid md:grid-cols-2 gap-5 text-black">
      <div className="flex flex-col">
        <span className="text-xs mb-1">Occupation Info</span>
        <select
          id="occupation-info"
          name="occupation-info"
          className="border-[1px] h-full rounded-[0.40rem] px-2 py-2"
        >
          <option value="salaried">Salaried</option>
          <option value="self-employed">Self Employed</option>
          <option value="other">Others</option>
        </select>
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Annual Income</span>
        <input
          type="number"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="annualIncome"
          id="annualIncome"
          value={annualIncome}
          onChange={handleChange}
          placeholder="4500000"
        />
      </div>
    </div>
  );
}
