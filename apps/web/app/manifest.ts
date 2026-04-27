import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stacks Wrapped",
    short_name: "Wrapped",
    description: "Your on-chain year in review — powered by the Stacks blockchain",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
