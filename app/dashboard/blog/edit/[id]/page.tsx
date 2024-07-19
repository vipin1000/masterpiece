import React from "react";
import EditForm from "./components/EditForm";
import { IBlogDetial } from "@/lib/types";
import { readBlogDeatailById } from "@/lib/actions/blog";
import BlogForm from "../../components/BlogForm";
import { DefaultValues } from "react-hook-form";

export default async function Edit({ params }: { params: { id: string } }) {
	const { data: blog } = await readBlogDeatailById(params.id);
	return <EditForm blog={blog as IBlogDetial} />;
}