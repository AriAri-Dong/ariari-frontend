import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://ariari.kr/sitemap.xml",
  };
}

// User-Agent: 크롤러의 이름을 나타내는 요소입니다. "*"는 모든 크롤러를 의미합니다.
// Allow: 크롤러가 접근할 수 있는 URL을 나타내는 요소입니다.
// Disallow: 크롤러가 접근할 수 없는 URL을 나타내는 요소입니다.
// Sitemap: 사이트맵 파일의 URL을 나타내는 요소입니다. 이 요소는 사이트맵 파일의 URL을 검색 엔진에게 알려줍니다.
