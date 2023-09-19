// app/studio/[...index]/page.tsx

"use client";

import { NextStudio } from "next-sanity/studio";
import defineConfig from "../../../../sanity.config";

export default function Studio() {
  return <NextStudio config={defineConfig} />;
}
