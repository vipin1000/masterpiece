"use client";
import React from "react";

import { toast } from "@/components/ui/use-toast";
import BlogForm from "../../../components/BlogForm";
import { IBlogDetial } from "@/lib/types";
import { updateBlogDetail } from "../../../../../../lib/actions/blog";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import { BlogFormSchemaType } from "../../../schema";
import Editblogform from "../../../components/Editblogform";

export default function EditForm({ blog }: { blog: IBlogDetial }) {
	const router = useRouter();

	const onblogsubmit = async (data: BlogFormSchemaType) => {
		const result = (
			await updateBlogDetail(blog?.id!, data)
		) as PostgrestSingleResponse<null>;
		if (result.error) {
			toast({
				title: "Fail to update ",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">
							{result.error?.message}
						</code>
					</pre>
				),
			});
		} else {
			toast({
				title: "Successfully update 🎉",
			});
			router.push("/dashboard");
		}
	};

	return <Editblogform onblogsubmit={onblogsubmit} defaultBlog={blog} />;
}