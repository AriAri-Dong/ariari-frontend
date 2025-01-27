interface ConroutProps {
  className?: string;
}

const Contour = ({ className }: ConroutProps) => {
  return <div className={`h-[1px] bg-menuborder ${className}`} />;
};

export default Contour;
