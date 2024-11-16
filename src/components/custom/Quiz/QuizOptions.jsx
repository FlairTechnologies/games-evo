// components/QuizOptions.jsx
import React from "react";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

const QuizOptions = ({ options, selectedAnswer, onAnswerSelect }) => {
  return (
    <RadioGroup
      value={selectedAnswer}
      className="space-y-3"
    >
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => onAnswerSelect(option.id)}
          className={`
            border rounded-md p-4
            hover:border-[#FF8A6C] hover:bg-orange-50
            cursor-pointer transition-all duration-200
            ${selectedAnswer === option.id ? "border-[#FF8A6C] bg-orange-50" : "border-gray-300"}
          `}
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem
              value={option.id}
              id={option.id}
              className="text-[#FF8A6C]"
            />
            <Label
              htmlFor={option.id}
              className="flex-1 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default QuizOptions;