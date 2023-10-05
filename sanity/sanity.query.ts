// sanity/sanity.query.ts
// read "https://www.sanity.io/docs/how-queries-work" for more info

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getAuthors() {
  return client.fetch(
    groq`*[_type == "author"]{
      _id,
      name,
      slug,
      image,
      bio,
    }`
  );
}

export async function getAuthor(slug: string) {
  return client.fetch(
    groq`*[_type == "author" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      image,
      bio,
    }`,
    { slug }
  );
}

export async function getPosts() {
  return client.fetch(
    groq`*[_type == "post"]{
      _id,
      title,
      description,
      mainImage,
      slug,
      publishedAt,
    }`
  );
}

export async function getPost(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      description,
      mainImage,
      author->{
        name,
        slug,
        image,
      },
      body,
      publishedAt,
    }`,
    { slug }
  );
}

export async function getRecipes() {
  return client.fetch(
    groq`*[_type == "recipe"]{
      _id,
      title,
      mainImage,
      author->{
        name,
      },
      slug,
    }`
  );
}

export async function getRecipe(slug: string) {
  return client.fetch(
    groq`*[_type == "recipe" && slug.current == $slug][0]{
      _id,
      title,
      description,
      mainImage,
      author->{
        name,
        slug,
        image,
      },
      time,
      ingredients,
      instructions,
      publishedAt,
    }`,
    { slug }
  );
}

export async function getDocuments() {
  return client.fetch(
    groq`*[_type == "recipe" ||_type == "post" ]{
      _id,
      _type,
      title,
      mainImage,
      author->{
        name,
      },
      slug,
      description,
      publishedAt,
    }`
  );
}