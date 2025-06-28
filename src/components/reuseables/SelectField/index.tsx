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
  className?: string;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeholder,
  options,
  disabled = false,
  value = '',
  onChange,
  isPhoneInput = false,
  className = '',
  error,
}) => {
  const getOptionKey = (option: Option, index: number) => {
    return `${option.value}-${index}`;
  };

  return (
    <div className={`w-full ${className}`}>
      <p className="text-[#0088DD] text-[12px] font-medium mb-1">{label}</p>

      <div
        className={`
        font-poppins w-full border rounded-[10px] h-[61px] px-[16px]
        ${disabled ? 'bg-[#F5F5F5]' : 'bg-white'}
        ${error ? 'border-red-500' : 'border-[#CCD6DF]'}
      `}
      >
        <Select disabled={disabled} value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full h-full p-0 border-0 bg-transparent hover:bg-transparent focus:ring-0">
            <div className="flex w-full items-center justify-between">
              <span className={`text-[14px] ${value ? 'text-[#272727]' : 'text-[#757575]'}`}>
                {value || placeholder}
              </span>
              <img
                src="/icons/chevron-down.png"
                className={`h-[24px] w-[24px] ml-2 ${disabled ? 'opacity-50' : ''}`}
                alt="dropdown indicator"
              />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            <SelectGroup>
              {options.length > 0 ? (
                options.map((option, index) => (
                  <SelectItem
                    key={getOptionKey(option, index)}
                    value={option.value}
                    className="text-[14px] whitespace-normal break-words leading-snug"
                  >
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <SelectLabel className="text-[#757575] text-[14px]">No options available</SelectLabel>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default SelectField;
