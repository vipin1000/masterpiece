import React from "react";
import { IBlog } from "@/lib/types";

import Content from "../components/Content";
import { SITE_URL } from "@/app/config";
import { createServerClient } from "@supabase/ssr";
import { createBrowserClient } from "@supabase/ssr";
import Comments from "../components/coments";
import supabase from "@/utils/supabase/supabase";
import { IAuthor } from "@/lib/types";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/app/navbar/navbar";
import "react-quill/dist/quill.bubble.css";

export async function generateStaticParams() {
  const { data: chapters, error } = await supabase
    .from("chapters")
    .select("slug");
  if (error) {
    throw error;
  }

  return chapters?.map((chapter) => ({ id: chapter.slug }));
}


export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
                .from("chapters")
                .select("*")
                .eq("slug", params.id)
                .single();
      const chapter = await data
      return {
        title: chapter?.Name,
        openGraph: {
          title: chapter?.title,
          url: `${SITE_URL}blog/${params.id}`,
          siteName: "Hardware Garage",
          images: chapter?.image,
          type: "website",
        },
        keywords: ["mechatronics", "arduino", "Raspberry pi"],
      };
    }

    export default async function Page({ params }: { params: { id: string } }) {
    
      const { data: chapter, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("slug", params.id)
        .single();

  
    const { data: authorData, error: authorError } = await supabase
      .from("instructor")
      .select("*")
      .eq("id", chapter.instructor)
      .single();

      return (
        <div>
          <Navbar/>
         <article className="pt-8">
        <div className="max-w-[800px] pt-[60px] mx-auto min-h-screen space-y-10">
          <Content  chapter={chapter} author={authorData} />
        </div>
         </article>
        </div>
      );
    }