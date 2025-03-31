interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  color: string;
  iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;
}

export const Icon = ({ name, color, iconMap, ...props }: IconProps) => {
  const IconComp = iconMap[name];

  return <IconComp color={color} {...props} style={{ fill: color }} />;
};
