import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import { astroImageTools } from "astro-imagetools";
import vercel from '@astrojs/vercel/serverless';

const integrations = [image(), tailwind(), astroImageTools];

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations,
});
