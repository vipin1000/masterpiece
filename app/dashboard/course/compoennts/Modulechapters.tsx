import React from "react";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IBlog } from "@/lib/types";
import SwitchForm from "./SwitchForm";
import DeleteAlert from "./DeleteAlertchapter";
import { readchaptersbymodule } from "@/lib/actions/blog";
import { PlusIcon } from "@radix-ui/react-icons";


interface Props {
    id: string;
  }
  
export default async function Modulechaptertable( {id}: Props) {

    const { data: chapters } = await readchaptersbymodule(id);
	return (
		<>
			<div className="rounded-md bg-graident-dark border-[0.5px] overflow-y-scroll ">
				<div className="w-[800px] md:w-full">
					<div className="grid grid-cols-5 border-b p-5 dark:text-gray-500">
						<h1 className=" col-span-2">Title</h1>
                        <Link className="" 
                        href={`/dashboard/course/build/chapter/lesson/${id}`}>
                        <Button className="gap-2 mt-2 mr-2" variant="outline">
                      <PlusIcon />
                      Add a chapter
                    </Button>
                        </Link>
					</div>
					<div className="space-y-10 p-5">
						{chapters?.map((chapter, index) => {
							
							return (
								<div className="grid grid-cols-2" key={index}>
                                    <div className="">

									<h1 className="dark:text-gray-200 col-span-2 font-lg font-medium">
										{chapter.chapter_name}
									</h1>
                                    <h4 className="dark:text-gray-200 col-span-2 text-sm font-sm">
										{chapter.description}
									</h4>
                                    <h4 className="dark:text-gray-200 col-span-2 text-sm font-sm">
										{chapter.chapterno}
									</h4>
                                    </div>

									<Actions id={chapter.id } slug={chapter.slug} />
								</div>
							);	
						})}
					</div>
				</div>
			</div>
		</>
	);
}

const Actions = ({ id, slug }: { id: number; slug: string } ) => {
	return (
		<div className="flex items-center gap-2 md:flex-wrap">
			{/* TODO: change to id */}
			<DeleteAlert id={id} />
			<Link href={`/dashboard/course/build/chapter/EditLesson/${slug}`}>
				<Button className="flex gap-2 items-center" variant="outline">
					<Pencil1Icon />
					Edit
				</Button>
			</Link>
		</div>
	);
};
