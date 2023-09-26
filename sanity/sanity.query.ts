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
      body,
      publishedAt,
    }`,
    { slug }
  );
}