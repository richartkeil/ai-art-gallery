import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import { astroImageTools } from "astro-imagetools";

export default defineConfig({
  integrations: [image(), tailwind(), astroImageTools]
});
