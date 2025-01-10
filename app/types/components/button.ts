export interface ButtonProps {
  onClick: () => void;
  className?: string;
  imageSize?: number;
}

export interface ButtonWithTextProps {
  title: string;
  onClick: () => void;
  className?: string;
  imageSize?: number;
  round?: boolean;
  className?: string;
}
