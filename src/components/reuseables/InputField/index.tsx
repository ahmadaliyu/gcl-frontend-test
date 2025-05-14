import { useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

const InputField = ({
  label,
  placeholder,
  textarea = false,
  type,
  isPhoneInput = false,
  disabled = false,
  value = undefined,
  name,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  textarea?: boolean;
  type?: string;
  isPhoneInput?: boolean;
  disabled?: boolean;
  name?: string;
  value?: any;
  onChange?: (name: string, value: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine the actual input type
  const getInputType = () => {
    if (textarea) return undefined;
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div
      className={`overflow-hidden font-poppins w-full border border-[#CCD6DF] rounded-[10px] flex gap-[16px] h-[61px] px-[16px] items-center ${
        textarea ? 'pt-[12px] pb-[8px]' : 'py-[8px]'
      }`}
    >
      <div className="flex-1">
        <p className="text-[#0088DD] text-[12px] mb-1">{label}</p>

        <div className="flex w-full text-[12px] items-center">
          {textarea ? (
            <textarea
              value={value}
              disabled={disabled}
              onChange={(e) => onChange?.(name || '', e.target.value)}
              className="h-full placeholder:text-[#757575] placeholder:text-[12px] text-[12px] flex-1 w-full focus:border-[#CCD6DF] focus:outline-none"
            ></textarea>
          ) : (
            <>
              <input
                value={value}
                disabled={disabled}
                type={getInputType()}
                placeholder={placeholder}
                onChange={(e) => onChange?.(name || '', e.target.value)}
                className="placeholder:text-[#757575] placeholder:text-[12px] text-[12px] flex-1 w-full focus:border-[#CCD6DF] focus:outline-none"
              />
              {type === 'password' && (
                <button
                  type="button"
                  className="ml-2 text-[#757575] hover:text-[#0088DD] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={disabled}
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
