import { PortableTextBlock, Slug } from "sanity";

export type AuthorType = {
  _id: string;
  name: string;
  slug: Slug;
  image: {
    alt: string;
    image: string;
  };
  bio: PortableTextBlock[];
  relatedRecipes: RecipeType[];
};

export type PostType = {
  _id: string;
  _type: string;
  name: string;
  title: string;
  description: string;
  slug: Slug;
  author: AuthorType;
  mainImage: {
    alt: string;
    image: string;
  };
  body: PortableTextBlock[];
  publishedAt: string;
};

type IngredientSection = { sectionTitle: string; sectionIngredients: string[]; _key: string };

export type RecipeType = {
  _id: string;
  _type: string;
  name: string;
  title: string;
  description: string;
  story: string;
  slug: Slug;
  author: AuthorType;
  mainImage: {
    alt: string;
    image: string;
  };
  time: string;
  ingredientsImport: IngredientSection[];
  instructions: string[];
  publishedAt: string;
};

export type DocumentType = {
  _id: string;
  _type: string;
  title: string;
  description: string;
  slug: Slug;
  author: AuthorType;
  mainImage: {
    alt: string;
    image: string;
  };
  categories: string[];
  publishedAt: string;
};
