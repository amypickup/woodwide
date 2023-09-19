// types/index.ts

import { PortableTextBlock } from "sanity";

export type ProfileType = {
  _id: string,
  name: string,
  slug: string,
  image: {
    alt: string,
    image: string
  },
  bio: PortableTextBlock[],
};