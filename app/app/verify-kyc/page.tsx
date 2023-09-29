"use client";

import { useState, useRef } from "react";
import { Steps, Button, Divider } from "@arco-design/web-react";
import { IconLeft, IconRight } from "@arco-design/web-react/icon";
const Step = Steps.Step;

const stepsData = [
  {
    name: "Personal Details",
    description: "description step 1",
  },
  {
    name: "step 2 ",
    description: "description step 2",
  },
  {
    name: "step 3",
    description: "description step 3",
  },
  {
    name: "step 4",
    description: "description step 4",
  },
];

const mapStepForm: { [key: number]: number } = {
  1: stepForm(0),
  2: stepForm(1),
  3: stepForm(2),
  4: stepForm(3),
};

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

        <div className="">
          <Button
            type="secondary"
            className="pl-[8px]"
            disabled={current <= 1}
            onClick={() => setCurrent(current - 1)}
          >
            <IconLeft />
            Back
          </Button>
          <Button
            disabled={current >= stepsData.length}
            onClick={() => setCurrent(current + 1)}
            style={{ marginLeft: 20, paddingRight: 8 }}
            type="primary"
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
        <Divider type="vertical" className="block h-auto" />
        {renderContent(mapStepForm[current])}
      </div>
    </div>
  );
}

export default App;
