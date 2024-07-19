"use client"
import React, { useEffect, useState } from 'react';
import { IModules, IchapterDetails } from '@/lib/types'; // Assuming IChapter type exists
import { readchaptersbymodule } from '@/lib/actions/blog';
import Loading from './loader';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  interface SidebarProps {
    modules: IModules;
    onChapterClick: (chapterId: string) => void; // Callback function to handle chapter clicks
  }

function Sidebar({ modules, onChapterClick }: SidebarProps) {
    const [chapterData, setChapterData] = useState<{ [moduleId: string]: IchapterDetails[] }>({});
    const [loader, setLoading] = useState<boolean>(true); // Define loading state

    useEffect(() => {
        const fetchChapters = async (moduleId: string) => {
            try {
                setLoading(true);
                const response = await readchaptersbymodule(moduleId);
                if (response && response.data) {
                    setChapterData((prevData) => ({
                        ...prevData,
                        [moduleId]: response.data,
                    }));
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching chapters:", error);
            }
        };

        modules.forEach((module) => {
            fetchChapters(module.slug);
        });
    }, [modules]);

    return (
        <div className='w-[300p] mx-4'>
{loader? (
<div>
       <Loading/>
</div>

):(

    <div>
              {modules.map((module, index) => (
                <div key={index}>

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className='w-[400px]'>{module.module_name}</AccordionTrigger>

    {chapterData[module.slug] && chapterData[module.slug].map((chapter, idx) => (
         <AccordionContent key={idx}>
                <button onClick={() => onChapterClick(chapter.slug)}>
                    {chapter.chapter_name}
                  </button>
         </AccordionContent>  
                            ))}
   
  </AccordionItem>
</Accordion>
                </div>
            ))}

    </div>



    
)}




      
        </div>
    );
}

export default Sidebar;