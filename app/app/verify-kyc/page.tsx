"use client";

import React, { useState } from "react";
import { Steps, Button } from "@arco-design/web-react";
import { IconLeft, IconRight } from "@arco-design/web-react/icon";

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
    govID: "",
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

function PersonalDetails({ formData, setFormData }: any) {
  const { fullName, gender, dob, nationality, education, govID, phone } =
    formData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
      <div className="flex flex-col">
        <span className="text-xs mb-1">Gender</span>
        <select
          id="gender"
          name="gender"
          className="border-[1px] h-full rounded-[0.40rem] px-2 py-2"
          value={gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-col">
        <span className="text-xs mb-1">Date Of Birth</span>
        <input
          type="date"
          className="border-[1px] py-2 px-2 rounded-[0.40rem]"
          name="dob"
          id="dob"
          value={dob}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs mb-1">Nationality</span>
        <input
          type="text"
          className="border-[1px] py-2 px-2 rounded-[0.40rem]"
          name="nationality"
          id="nationality"
          placeholder="Nepali"
          value={nationality}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center col-span-2 w-full justify-between gap-5">
        <div className="flex flex-col w-1/2">
          <span className="text-xs mb-1">Education</span>
          <select
            id="education"
            name="education"
            className="border-[1px] h-fit rounded-[0.40rem] px-2 py-2"
            value={education}
            onChange={handleChange}
          >
            <option value="ble">BLE / DLE</option>
            <option value="see">SLC / SEE</option>
            <option value="plus-two">Plus Two</option>
            <option value="bachelors">Bachelor&apos;s</option>
            <option value="masters">Master&apos;s</option>
            <option value="phd">Ph.D</option>
          </select>
        </div>
        <div className="flex flex-col w-1/2">
          <span className="text-xs mb-1">Gov ID (Licence / Citizenship)</span>
          <input
            type="file"
            name="govID"
            accept=".jpg, .jpeg, .png, .gif"
            id="file-input"
            className="block w-full border border-gray-200 shadow-sm rounded-[0.40rem] text-sm file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
            value={govID}
            onChange={handleChange}
          />
          <span className="text-xs italic mt-1">
            Only files with (.jpg, .jpeg, .png, .gif) extensions are accepted
          </span>
        </div>
      </div>
      <div className="flex flex-col col-span-2 px-[20%]">
        <span className="text-xs mb-1">Phone</span>
        <div className="border-[1px] px-4 py-2 flex gap-5 rounded-lg">
          <span>+977</span>
          <input
            type="tel"
            className="h-full w-full"
            name="phone"
            inputMode="numeric"
            id="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

// Define FamilyNominee, AddressInfo, and OccupationInfo components similarly.

function FamilyNominee(clientData: any) {

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Father&apos;s Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="father-name"
          id="father-name"
          placeholder="Father&apos;s Name"
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Mother&apos;s Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="mother-name"
          id="mother-name"
          placeholder="Mother&apos;s Name"
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Grand Father&apos;s Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="grandfather-name"
          id="grandfather-name"
          placeholder="Grandfather&apos;s Name"
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Nominee&apos;s Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="nominee-name"
          id="nominee-name"
          placeholder="Nominee&apos;s Name"
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Relationship with Nominee</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="nominee-relation"
          id="nominee-relation"
          placeholder="Relation with Nominees"
        />
      </div>
      <div className="flex flex-col col-span-2">
        <span className="text-xs mb-1">
          Gov ID (Licence / Citizenship) of Nominee
        </span>
        <input
          type="file"
          name="file-input"
          accept=".jpg, .jpeg, .png, .gif"
          id="file-input"
          className="block w-full border border-gray-200 shadow-sm rounded-[0.40rem] text-sm file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
        />
        <span className="text-xs italic mt-1">
          Only files with (.jpg, .jpeg, .png, .gif) extensions are accepted
        </span>
      </div>
    </div>
  );
}

function AddressInfo(clientData: any) {
  return (
    <div className="grid md:grid-cols-2 gap-5 text-black">
      <div className="flex flex-col">
        <span className="text-xs mb-1">Province</span>
        <select
          id="gender"
          name="gender"
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
          placeholder="Kathmandu Metropolitan City"
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Ward No.</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="ward"
          id="ward"
          placeholder="Ward no."
        />
      </div>
      <div className="flex flex-col ">
        <span className="text-xs mb-1">Tole Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="tole"
          id="tole"
          placeholder="Subas Nagar"
        />
      </div>
    </div>
  );
}

function OccupationInfo(clientData: any) {
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
        <span className="text-xs mb-1">Full Name</span>
        <input
          type="text"
          className="border-[1px] h-full px-2 py-2 rounded-[0.40rem]"
          name="full-name"
          id="full-name"
          placeholder="Full Name"
        />
      </div>
    </div>
  );
}
