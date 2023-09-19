// sanity/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getAuthor() {
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