import "astro/client";

export type Creation = {
  id: string;
  image: string;
  description: string;
  source: string;
};

// ./src is required for imagetools to work when building
const assetPrefix = import.meta.env.MODE === "production" ? "./src" : "";

const fetchCreations = async (
  jsonFiles: any[],
  imageFiles: any[]
): Promise<Creation[]> => {
  const creations: Creation[] = [];

  const rawCreations = jsonFiles[0].default;
  for (const creation of rawCreations.sort(
    (a: any, b: any) => b.fetchedAt - a.fetchedAt
  )) {
    const image = imageFiles.find((f: any) =>
      f.default.src.includes(creation.filename)
    );
    creations.push({
      id: creation.id,
      image: assetPrefix + image!.default.src,
      description: creation.description,
      source: creation.sourceUrl,
    });
  }

  return creations;
};

export { fetchCreations };
