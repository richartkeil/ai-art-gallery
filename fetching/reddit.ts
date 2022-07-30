import { DOMParser } from "https://esm.sh/linkedom";
import { storeImage } from "./fetch.ts";

async function storeImages(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const document = new DOMParser().parseFromString(html, "text/html");
  const links = document.querySelectorAll(`div[data-test-id="post-content"] a`);
  const title = document.querySelector(`div[data-test-id="post-content"] h1`);
  for (const link of links) {
    const href = link.getAttribute("href");
    if (!href) continue;
    if (href.includes("https://i.redd.it/")) {
      const regex = /https:\/\/i\.redd\.it\/([\d\w]+)\.(png|jpg).*/;
      const matches = href.match(regex);
      const type = matches[2];

      const id = crypto.randomUUID();
      await storeImage({
        id,
        filename: `${id}.${type}`,
        sourceUrl: url,
        imageUrl: href,
        description: title.textContent,
      });
      // If it is a preview url, we extract the image id and use the raw image cdn url:
    } else if (href.includes("https://preview.redd.it/")) {
      const regex = /https:\/\/preview\.redd\.it\/([\d\w]+)\.(png|jpg).*/;
      const matches = href.match(regex);
      const redditId = matches[1];
      const type = matches[2];

      const id = crypto.randomUUID();
      await storeImage({
        id,
        filename: `${id}.${type}`,
        sourceUrl: url,
        imageUrl: `https://i.redd.it/${redditId}.${type}`,
        description: title.textContent,
      });
    }
    console.log(`Stored ${href}`);
  }
}

const redditLines = await Deno.readTextFile("./sources/reddit.txt");
const redditUrls = redditLines.trim().split("\n");

await Promise.all(redditUrls.map(storeImages));
