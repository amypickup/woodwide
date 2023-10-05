// types/index.ts

import { PortableTextBlock, DatetimeComponents, Slug } from "sanity";

export type AuthorType = {
  _id: string,
  name: string,
  slug: Slug,
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
  slug: Slug,
  author: AuthorType,
  mainImage: {
    alt: string,
    image: string
  },
  body: PortableTextBlock[],
  publishedAt: string,
};

export type RecipeType = {
  _id: string,
  name: string,
  title: string,
  description: string,
  slug: Slug,
  author: AuthorType,
  mainImage: {
    alt: string,
    image: string
  },
  time: string,
  ingredients: PortableTextBlock[],
  instructions: string[],
  publishedAt: string,
};

export type DocumentType = {
  _id: string,
  _type: string,
  title: string,
  description: string,
  slug: Slug,
  author: AuthorType,
  mainImage: {
    alt: string,
    image: string
  },
  categories: string[],
  publishedAt: string,
};