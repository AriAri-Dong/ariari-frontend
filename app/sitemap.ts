import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ariari.kr", // 사용자가 접근할 수 있는 URL
      lastModified: new Date().toISOString().split("T")[0], // 마지막으로 수정된 날짜
      changeFrequency: "yearly", // 변경 빈도
      priority: 1, // 우선순위
    },
    {
      url: "https://ariari.kr",
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://ariari.kr",
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
