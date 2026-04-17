import {Readability} from "@mozilla/readability";
import {parseHTML} from "linkedom";
import TurndownService from "./turndown";

export const scrape = async ({url}: {url: string}) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)",
    },
  });
  const html = await response.text();

  const getCoverImage = (html: string) => {
    const doc = parseHTML(html);
    const metaTags = doc.window.document.querySelectorAll(
      'meta[property="og:image"], meta[name="twitter:image"]',
    );

    let coverImage: string | null = null;

    metaTags.forEach((tag: any) => {
      if (tag instanceof doc.window.HTMLElement) {
        const imageUrl = tag.getAttribute("content");
        if (imageUrl && !coverImage) {
          coverImage = imageUrl;
        }
      }
    });

    return coverImage;
  };

  const coverImage = getCoverImage(html);
  const article = extract(html);

  if (article == null) {
    return null;
  }

  let textContent = convertToMarkdown(article.content);
  textContent = textContent.replace(/!\[.*?\]\(.*?\)/g, "");

  return {
    title: article.title,
    byline: article.byline,
    date: article.publishedTime,
    textContent: textContent,
    image: coverImage,
  };
};

const extract = (html: string) => {
  var doc = parseHTML(html);
  let reader = new Readability(doc.window.document);
  return reader.parse();
};

const convertToMarkdown = (html: string) => {
  const turndown = new TurndownService();
  const doc = parseHTML(html);
  return turndown.turndown(doc.window.document);
};
