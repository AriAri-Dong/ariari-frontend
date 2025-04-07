import { ClubReviewSaveReq, PassReviewSaveReq } from "../review";

export interface ActivityReviewProps {
  onClose: () => void;
  onSubmit: (data: ClubReviewSaveReq) => void;
}

export interface AcceptanceReviewProps {
  onClose: () => void;
  onSubmit: (data: PassReviewSaveReq) => void;
  className?: string;
}
