interface InputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disable?: boolean;
}

const CustomInput = ({
  value,
  placeholder,
  onChange,
  className = "",
  disable = false,
}: InputProps) => (
  <input
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={`w-full p-3 rounded-xl text-mobile_body1_r bg-searchbar text-black
      md:text-body1_r md:px-[22px] md:py-[14px] focus:outline-none ${className}
      ${disable ? "cursor-pointer" : "cursor-default"}`}
    disabled={disable}
  />
);

export default CustomInput;
