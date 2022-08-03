import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import { astroImageTools } from "astro-imagetools";

const integrations = [image(), tailwind(), astroImageTools];

export default defineConfig({
  integrations,
});
