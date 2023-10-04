// types/index.ts

import { PortableTextBlock, DatetimeComponents } from "sanity";

export type AuthorType = {
  _id: string,
  name: string,
  slug: string,
  image: {
    alt: string,
    image: string
  },
  bio: PortableTextBlock[],
};

export type PostType = {
  _id: string,
  name: string,
  title: string,
  description: string,
  slug: string,
  author: AuthorType,
  mainImage: {
    alt: string,
    image: string
  },
  body: PortableTextBlock[],
  publishedAt: DatetimeComponents,
};