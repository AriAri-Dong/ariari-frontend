import { ClubReviewSaveReq, TagIconType } from "../review";

export interface ActivityReviewProps {
  onClose: () => void;
  onSubmit: (data: ClubReviewSaveReq) => void;
}

export interface AcceptanceReviewProps {
  onClose: () => void;
  onSubmit: () => void;
  className?: string;
}
