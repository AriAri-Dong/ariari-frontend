export interface ActivityReviewProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    details: string;
    badges: number[];
  }) => void;
}

export interface AcceptanceReviewProps {
  onClose: () => void;
  onSubmit: () => void;
  className?: string;
}
