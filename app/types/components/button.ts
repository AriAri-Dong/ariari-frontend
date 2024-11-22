export interface ButtonProps {
  onClick: () => void;
}

export interface ButtonWithTextProps {
  title: string;
  onClick: () => void;
  round?: boolean;
}
