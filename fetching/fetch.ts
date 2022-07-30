import { writableStreamFromWriter } from "https://deno.land/std@0.149.0/streams/mod.ts";
import { Image } from "./models.ts";

export async function storeImage(image: Image) {
  const response = await fetch(image.imageUrl);
  if (response.body) {
    // await Deno.mkdir("./images", { recursive: true });
    const file = await Deno.open(`../src/assets/images/${image.filename}`, {
      write: true,
      create: true,
    });
    const writableStream = writableStreamFromWriter(file);
    await response.body.pipeTo(writableStream);
    await Deno.writeTextFile(`../src/assets/images/${image.id}.json`, JSON.stringify(image));
  }
}
