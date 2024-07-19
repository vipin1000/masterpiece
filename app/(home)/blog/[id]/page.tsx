import React from "react";
import { IBlog } from "@/lib/types";
import Content from "./components/Content"
import { SITE_URL } from "@/app/config";
import { createServerClient } from "@supabase/ssr";
import { createBrowserClient } from "@supabase/ssr";
import Comments from "./components/coments/coments";
import supabase from "@/utils/supabase/supabase";
import { IAuthor } from "@/lib/types";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/app/navbar/navbar";

export async function generateStaticParams() {
  const { data: blogs, error } = await supabase
    .from("blog")
    .select("slug");
  if (error) {
    throw error;
  }

  return blogs?.map((blog) => ({ id: blog.slug }));
}


export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
                .from("blog")
                .select("*")
                .eq("slug", params.id)
                .single();
      const blog = await data
      return {
        title: blog?.title,
        openGraph: {
          title: blog?.title,
          url: `${SITE_URL}blog/${params.id}`,
          siteName: "Hardware Garage",
          images: blog?.image,
          type: "website",
        },
        keywords: ["mechatronics", "arduino", "Raspberry pi"],
      };
    }

    export default async function Page({ params }: { params: { id: string } }) {
    
      const { data: blog, error } = await supabase
        .from("blog")
        .select("*")
        .eq("slug", params.id)
        .single();

  
    const { data: authorData, error: authorError } = await supabase
      .from("instructor")
      .select("*")
      .eq("id", blog.author)
      .single();

      return (
        <div>
          <Navbar/>
         <article className="pt-8">
        <div className="max-w-[800px] pt-[60px] mx-auto min-h-screen space-y-10">
          <Content  blog={blog} author={authorData} />
        </div>
         </article>
        </div>
      );
    }