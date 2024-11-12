// components/QuizOptions.jsx

import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import React from "react";

const QuizOptions = ({ options, selectedAnswer, onAnswerSelect }) => {
  return (
    <RadioGroup
      value={selectedAnswer || ""}
      onValueChange={onAnswerSelect}
      className="space-y-4"
    >
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => onAnswerSelect(option.id)} // Handle click on the entire div
          className={`border border-gray-300 p-3 rounded-md flex items-center justify-between space-x-2 cursor-pointer ${
            selectedAnswer === option.id ? "border-[#FF8A6C]" : ""
          }`}
        >
          <Label
            htmlFor={option.id}
            className={`cursor-pointer text-lg font-medium text-gray-700 ${selectedAnswer === option.id ? "text-[#FE6249]" : ""}`}
          >
            {option.label}
          </Label>
          {/* <RadioGroupItem value={option.id} id={option.id} className="bg-[#FE6249]"/> */}
        </div>
      ))}
    </RadioGroup>
  );
};

export default QuizOptions;

// <div
//   key={option.id}
//   className=""
// >
//   <RadioGroupItem
//     value={option.id}
//     id={option.id}
//     className="border-2 border-gray-300"
//   />
// </div>
