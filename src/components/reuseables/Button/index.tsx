import React from 'react';
import { cn } from '@/lib/utils';
import Spinner from '@/components/reuseables/Spinner';

function Button({
  title,
  height = '49px',
  variant = 'red',
  fullWidth = false,
  type = 'button',
  disabled = false,
  id,
  onClick,
  loading,
  className,
}: {
  title?: string;
  height?: '38px' | '49px' | '62px';
  variant?: 'red' | 'outlined-blue' | 'outlined-blue-dark' | 'white' | 'outlined-red' | 'black' | 'blue';

  fullWidth?: boolean;

  type?: 'reset' | 'submit' | 'button';
  disabled?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;

  loading?: boolean;
  className?: string;
}) {
  // const _bg = background ==="dark"?

  // HEIGHTS
  const height_38_cn = 'h-[38px] px-[24px] py-[8px] text-[14px] leading-[22px]';
  const height_49_cn = 'h-[49x] px-[32px] py-[12px] text-[16px] leading-[24px]';
  const height_56_cn = 'h-[62px] px-[32px] py-[16px] text-[16px] leading-[24px]';

  // VARIANTS
  const variant_black_cn = 'bg-[#21222D] text-white border-[#21222D]';
  const variant_blue_cn = 'bg-[#02044A] text-white border-[#02044A]';
  const variant_red_cn = 'bg-[#E51520] text-white border-[#E51520]';
  const variant_outlined_blue_cn = 'bg-[#ffffff00] text-[#0088DD] border-[#0088DD]';
  const variant_outlined_blue_dark_cn = 'bg-[#ffffff00] text-[#02044A] border-[#02044A]';
  const variant_outlined_red_cn = 'bg-[#ffffff00] text-[#DC3545] border-[#DC3545]';
  const variant_white_cn = 'bg-[#ffffff] text-[#21222D] border-[#ffffff]';
  const disabled_cn = 'cursor-not-allowed';

  return (
    <button
      className={cn(
        'flex items-center justify-center gap-[10px] border-[1px] rounded-[40px]  font-[500] cursor-pointer m-0 shrink-0 hover:opacity-85',

        // WIDTH
        fullWidth ? 'w-full' : 'w-fit',

        // HEIGHTS
        height === '38px' ? height_38_cn : null,
        height === '49px' ? height_49_cn : null,
        height === '62px' ? height_56_cn : null,

        // VARIANTS
        variant === 'black' ? variant_black_cn : null,
        variant === 'blue' ? variant_blue_cn : null,
        variant === 'red' ? variant_red_cn : null,
        variant === 'outlined-blue' ? variant_outlined_blue_cn : null,
        variant === 'outlined-blue-dark' ? variant_outlined_blue_dark_cn : null,
        variant === 'outlined-red' ? variant_outlined_red_cn : null,
        variant === 'white' ? variant_white_cn : null,

        disabled ? disabled_cn : null,
        className
      )}
      type={type}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >
      <span className="font-poppins text-inherit">{title}</span>

      {loading ? <Spinner className="text-inherit" /> : null}
    </button>
  );
}

export default Button;
