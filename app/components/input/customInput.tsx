interface InputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disable?: boolean;
  maxLength?: number;
}

const CustomInput = ({
  value,
  placeholder,
  onChange,
  className = "",
  disable = false,
  maxLength,
}: InputProps) => (
  <input
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    maxLength={maxLength}
    className={`w-full p-3 rounded-xl text-mobile_body1_r bg-searchbar text-black placeholder-subtext2
      md:text-body1_r md:px-[22px] md:py-[14px] focus:outline-none ${className}
      ${disable ? "cursor-pointer" : "cursor-default"}`}
    disabled={disable}
  />
);

export default CustomInput;
