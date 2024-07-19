import React from "react";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IBlog } from "@/lib/types";
import SwitchForm from "./SwitchForm";
import DeleteAlert from "./Deletealertmodule";
import { readmodulesbycourseId } from "@/lib/actions/blog";
import { PlusIcon } from "@radix-ui/react-icons";
import ChapterTable from "./ChaptersTable";
interface Props {
    id: string;
  }
  
export default async function ModuleTable( {id}: Props) {

    const { data: mdoules } = await readmodulesbycourseId(id);
	return (
		<>
		<div className="">
		<div className="rounded-md bg-graident-dark border-[0.5px] overflow-y-scroll ">
				<div className="w-[800px] md:w-full">
					<div className="grid grid-cols-2 border-b p-5 dark:text-gray-500">
						<h1 className=" col-span-2">Title</h1>
                        <Link className="" 
                        href={`/dashboard/course/build/create/${id}`}>
                        <Button className="gap-2 mt-2 mr-2" variant="outline">
                      <PlusIcon />
                      Add a Module
                    </Button>
                        </Link>
					</div>
					<div className="space-y-10 p-5">
						{mdoules?.map((module, index) => {
							
							return (
								<div className="grid grid-cols-2 grid-flow-row" key={index}>
									<div>

                                    <div className="">

									<h1 className="dark:text-gray-200 col-span-2 font-lg font-medium">
										{module.module_name}
									</h1>
                                    <h4 className="dark:text-gray-200 col-span-2 text-sm font-sm">
										{module.module_description}
									</h4>
                                    <h4 className="dark:text-gray-200 col-span-2 text-sm font-sm">
										{module.module_number}
									</h4>
                                    </div>

									<Actions id={module.id } slug={module.slug} />

									<div>
									
									</div>
									</div>

									<div>

									<ChapterTable id={module.slug}/>
									</div>
								</div>
							);	
						})}
					</div>
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
			<Link href={`/dashboard/course/build/add/${slug}`}>
				<Button className="flex gap-2 items-center" variant="outline">
					<Pencil1Icon />
					Edit
				</Button>
			</Link>
            <Link href={`/dashboard/course/build/chapter/${slug}`}>
				<Button className="flex gap-2 items-center" variant="outline">
					<Pencil1Icon />
					Build
				</Button>

				
			</Link>
		</div>
	);
};
