import { CheckboxContainer } from "./commonStyles";
import { Label } from "./commonStyles";

interface RadioInputProps {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const RadioInput: React.FC<RadioInputProps> = ({ label, name, value, checked, onChange }) => (
    <CheckboxContainer>
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </CheckboxContainer>
  );
  
  interface QuestionGroupProps {
    question: string; // 질문 텍스트
    name: string; // input의 name 속성
    options: { label: string; value: string }[]; // 라벨과 값으로 이루어진 옵션 목록
    selectedValue: string; // 선택된 값
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 값이 변경될 때 호출되는 함수
  }
  
  export const QuestionGroup: React.FC<QuestionGroupProps> = ({ question, name, options, selectedValue, onChange }) => (
    <div>
      <Label>{question}</Label>
      {options.map((option) => (
        <RadioInput
          key={option.value}
          label={option.label}
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
  