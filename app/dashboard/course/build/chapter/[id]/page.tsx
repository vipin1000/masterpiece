import React from "react";
import { SITE_URL } from "@/app/config"
import supabase from "@/utils/supabase/supabase";
import "react-quill/dist/quill.snow.css";
import ChapterTable from "../../../compoennts/ChaptersTable";
import ALLchapters from "../../../compoennts/allchapters";
export default async function Page({ params }: { params: { id : string } }) {
    const { data: chapters, error } = await supabase
      .from("chapter")
      .select("*")
      .eq("slug", params.id)
      .single();

    return (
      <div className="w-full pt-[90px] mx-auto min-h-screen space-y-10 ">
        you are adding chapter to {params.id}  

        <div className="grid grid-cols-3 grid-flow-row">

<div>
    <ChapterTable  id={params.id} />
{/* <ALLchapters id={params.id}  /> */}



</div>

<div>

</div>

        </div>
      </div>
    );
  }