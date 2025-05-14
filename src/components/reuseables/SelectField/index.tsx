import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  placeholder: string;
  options: Option[];
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  isPhoneInput?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeholder,
  options,
  disabled = false,
  value = '',
  onChange,
  isPhoneInput = false,
}) => {
  return (
    <div
      className={`font-poppins w-full border border-[#CCD6DF] rounded-[10px] flex gap-[16px] h-[61px] py-[8px] px-[16px] items-center ${
        disabled ? 'bg-[#F5F5F5]' : ''
      }`}
    >
      <div className="flex-1">
        <Select
          disabled={disabled}
          value={value}
          onValueChange={(newValue) => {
            if (onChange) {
              onChange(newValue);
            }
          }}
        >
          <SelectTrigger className="flex-1 flex-col p-0 border-0 items-start justify-start outline-none focus:ring-0 border-none shadow-none">
            <p className="text-[#0088DD] text-[12px]">{label}</p>
            <div className="flex w-full text-[12px]">
              {isPhoneInput && value ? (
                <div className="flex items-center">
                  <span className="mr-2">{value.split(' ')[0]}</span>
                  {value.split(' ')[1]}
                </div>
              ) : (
                <SelectValue
                  placeholder={placeholder}
                  className="placeholder:text-[#757575] placeholder:text-[12px] text-[12px] flex-1 w-full focus:border-[#CCD6DF] focus:outline-none"
                />
              )}
              <img
                src="/icons/chevron-down.png"
                className={`h-[24px] w-[24px] ml-auto ${disabled ? 'opacity-50' : ''}`}
                alt="chevron-down"
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.length > 0 ? (
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <SelectLabel className="text-[#757575] text-[12px]">No options available</SelectLabel>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectField;
