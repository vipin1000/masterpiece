import React from "react";
import { SITE_URL } from "@/app/config"
import supabase from "@/utils/supabase/supabase";
import "react-quill/dist/quill.snow.css";
import ModuleForm from "../../../compoennts/EditModuleform";
export default async function Page({ params }: { params: { id : string } }) {
    const { data: module, error } = await supabase
      .from("modules")
      .select("*")
      .eq("slug", params.id)
      .single();

    return (
      <div className="w-full pt-[90px] mx-auto min-h-screen space-y-10">
      <ModuleForm module={module} id={params.id}  />
      </div>
    );
  }