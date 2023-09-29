"use client";

import React, { useState, useRef } from "react";
import { Steps, Button, Divider } from "@arco-design/web-react";
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

const mapStepForm: { [key: number]: () => React.JSX.Element } = {
  1: PeronalDetails,
  2: FamilyNominee,
  3: AddressInfo,
  4: OccupationInfo,
};

function PeronalDetails() {
  return (
    <div className="flex flex-col w-fit">
      <label htmlFor="full-name" className="">
        Full Name
      </label>
      <input
        name="full-name"
        type="text"
        className="py-3 px-4 block border-gray-200 border-[1px] rounded-md text-sm"
        placeholder="Full Name"
      />
    </div>
  );
}

function FamilyNominee(): JSX.Element {
  return <div>Family Nominee</div>;
}

function AddressInfo() {
  return <div>Family Nominee</div>;
}

function OccupationInfo() {
  return <div>Family Nominee</div>;
}

function stepForm(num: number) {
  return num;
}

function App() {
  const [current, setCurrent] = useState(1);

  function renderContent(step: any) {
    return (
      <div
        className="text-[#C2C7CC] justify-between flex flex-col py-10"
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <div className="">Step{step} Content</div>

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
        <div className="p-24">
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
        {renderContent(mapStepForm[current]())}
      </div>
    </div>
  );
}

export default App;
