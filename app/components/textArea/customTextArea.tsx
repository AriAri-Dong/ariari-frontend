interface TextAreaProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
}

const CustomTextArea = ({
  value,
  placeholder,
  onChange,
  className = "",
  disabled = false,
}: TextAreaProps) => (
  <textarea
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={`w-full p-3 rounded-xl text-mobile_body1_r bg-searchbar text-black
        md:text-body1_r md:px-[22px] md:py-[14px] focus:outline-none ${className}
        ${disabled ? "cursor-not-allowed" : "cursor-default"}`}
    disabled={disabled}
  />
);

export default CustomTextArea;
