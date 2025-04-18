// base64 -> File 변환
export const formatBase64ToFile = (base64Str: string, filename: string) => {
  try {
    // data:image/jpeg;base64 제거
    const base64Image = base64Str
      .split(",")[1]
      ?.replace(/[^A-Za-z0-9+/=]/g, "");

    // Base64 형식 유효성 확인
    if (!base64Image) {
      throw new Error("Invalid Base64 string");
    }

    // MIME 타입 추출
    const mimeType = base64Str.split(",")[0].split(":")[1].split(";")[0];

    const byteString = atob(base64Image);
    const byteArray = new Uint8Array(byteString.length);

    byteString.split("").forEach((c, i) => {
      byteArray[i] = c.charCodeAt(0);
    });

    return new File([byteArray], filename, { type: mimeType });
  } catch (error) {
    console.error("Failed to convert base64 to file", error);
    throw error;
  }
};
