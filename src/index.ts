import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {z} from "zod";
import {scrape} from "./scrape";

const app = new Hono();

app.get(
  "/",
  zValidator(
    "query",
    z.object({
      url: z.string().url(),
    }),
  ),
  async (c) => {
    const url = c.req.query("url")!;
    try {
      console.log("scraping", url);
      const page = await scrape({url});
      return c.json(page);
    } catch (e) {
      if (e instanceof Error) {
        return c.json({error: e.message});
      } else {
        return c.json({error: "An unknown error occurred"});
      }
    }
  },
);

export default app;
