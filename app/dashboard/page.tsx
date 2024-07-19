"use client"
import React from "react";
import BlogTable from "./blog/components/BlogTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
export default function Blog() {
	return (
		<div className="space-y-5">
			<div className="flex items-center pt-[100px] justify-between">
				<h1 className="text-3xl font-bold">Blogs</h1>
				<Link href="/dashboard/blog">
					<Button
						className="flex items-center gap-2 "
						variant="outline"
					>
						Blogs <PlusIcon />
					</Button>
				</Link>
			</div>
			<div className="flex items-center pt-[100px] justify-between">
				<h1 className="text-3xl font-bold">Course</h1>
				<Link href="/dashboard/course">
					<Button
						className="flex items-center gap-2 "
						variant="outline"
					>
						Course <PlusIcon />
					</Button>
				</Link>
			</div>
		</div>
	);
}
