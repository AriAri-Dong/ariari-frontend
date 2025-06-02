import { addClubBookmark, deleteClubBookmark } from "@/api/club/api";
import { useMutation } from "@tanstack/react-query";

interface ToggleBookmarkProps {
  clubId: string;
  isBookmarked: boolean;
}

export function useToggleClubBookmark() {
  const addBookmark = useMutation({
    mutationFn: addClubBookmark,
  });

  const removeBookmark = useMutation({
    mutationFn: deleteClubBookmark,
  });

  const toggleClubBookmark = async ({
    clubId,
    isBookmarked,
  }: ToggleBookmarkProps) => {
    if (isBookmarked) {
      await removeBookmark.mutateAsync(clubId);
    } else {
      await addBookmark.mutateAsync(clubId);
    }
  };

  return {
    toggleClubBookmark,
  };
}
