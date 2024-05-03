import { groq } from "next-sanity";
import { Post } from "../../../../../types";
import { client } from "../../../../../sanity/lib/client";
import Container from "@/components/Container";
import Image from "next/image";
import { urlForImage } from "../../../../../sanity/lib/image";
import {
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/RichText";

interface Props {
  params: {
    slug: string;
  }
}

export const revalidate = 30;

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'post']{
        slug
    }`;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug?.slug?.current);
  return slugRoutes?.map((slug) => ({
    slug,
  }));
};

const SlugPage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
        ...,
        body,
        author->
    }`;
  const post: Post = await client.fetch(query, { slug });
  return (
    <Container className="mb-10">
      <div className="flex items-center">
        <div className="w-full md:w-2/3">
          <Image
            src={urlForImage(post?.mainImage).url()}
            width={500}
            height={500}
            alt="main image"
            className="object-cover w-full rounded-b-2xl"
          />
        </div>
        <div className="w-1/3 hidden lg:inline-flex flex-col items-center gap-5 px-4">
          <Image
            src={urlForImage(post?.author?.image).url()}
            width={200}
            height={200}
            alt="author image"
            className="w-32 h-32 rounded-full object-cover"
          />
          <p className="text-3xl text-gray-500 font-semibold">{post?.author?.name}</p>
          <p className="text-center tracking-wide text-sm">{post?.author?.description}</p>
          <div className="flex items-center gap-3">
            <Link
              href={"#"}
              className="w-10 h-10 bg-blue-600 text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
              <FaTwitter />
            </Link>
            <Link
              href={"#"}
              className="w-10 h-10 bg-[#bc1888] text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <PortableText value={post?.body} components={RichText} />
      </div>
    </Container>
  )
}

export default SlugPage