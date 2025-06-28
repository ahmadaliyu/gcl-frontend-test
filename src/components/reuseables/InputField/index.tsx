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
  className = '',
  error,
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
  className?: string;
  error?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (textarea) return undefined;
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <p className="text-[#0088DD] text-[12px] font-medium mb-1">{label}</p>}

      <div
        className={`
          font-poppins w-full border rounded-[10px] h-[61px] px-[16px] flex items-center
          ${disabled ? 'bg-[#F5F5F5]' : 'bg-white'}
          ${error ? 'border-red-500' : 'border-[#CCD6DF]'}
        `}
      >
        <div className="flex-1 w-full">
          <div className="flex w-full text-[14px] items-center">
            {textarea ? (
              <textarea
                value={value}
                disabled={disabled}
                maxLength={isPhoneInput ? 15 : undefined}
                onChange={(e) => onChange?.(name || '', e.target.value)}
                className="h-full placeholder:text-[#757575] placeholder:text-[14px] text-[14px] flex-1 w-full focus:outline-none bg-transparent resize-none"
              ></textarea>
            ) : (
              <>
                <input
                  value={value}
                  disabled={disabled}
                  type={getInputType()}
                  placeholder={placeholder}
                  maxLength={isPhoneInput ? 15 : undefined}
                  onChange={(e) => onChange?.(name || '', e.target.value)}
                  className="placeholder:text-[#757575] placeholder:text-[14px] text-[14px] flex-1 w-full focus:outline-none bg-transparent"
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

      {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default InputField;
