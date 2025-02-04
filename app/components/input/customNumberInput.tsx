import { formatNumber } from "@/utils/formatNumber";

interface NumberInputProps {
  value: number;
  placeholder: string;
  onChange: (value: number) => void;
  className?: string;
  disable?: boolean;
}

const CustomNumberInput = ({
  value,
  placeholder,
  onChange,
  className = "",
  disable = false,
}: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    const numericValue = rawValue ? Number(rawValue) : 0; // NaN 방지
    onChange(numericValue);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={formatNumber(value)}
        placeholder={placeholder}
        onChange={handleChange}
        className={`w-full p-3 rounded-xl text-mobile_body1_r bg-searchbar text-black
        md:text-body1_r md:px-[22px] md:py-[14px] focus:outline-none ${className}
        ${disable ? "cursor-pointer" : "cursor-default"}`}
        disabled={disable}
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-subtext2 md:text-body1_r">
        원
      </span>
    </div>
  );
};

export default CustomNumberInput;
