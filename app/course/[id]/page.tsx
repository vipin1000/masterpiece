"use client"
import React, { useState, useEffect } from 'react';
import { readmodulesbycourseId } from '@/lib/actions/blog';
import ModuleTable from '@/app/dashboard/course/compoennts/NewModuleTable';
import Sidebar from '../components/sidebar';
import supabase from '@/utils/supabase/supabase';
import Navbar from '@/app/navbar/navbar';
import "react-quill/dist/quill.snow.css";
// import 'highlight.js/styles/arduino-light.min.css';
import "highlight.js/styles/atom-one-dark.min.css";
import Image from 'next/image';

import { BlogContentLoading } from '@/app/(home)/blog/[id]/components/Skeleton';
export default function Page({ params }: { params: { id: string } }) {
  const [modules, setModules] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Define loading state

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data: modules } = await readmodulesbycourseId(params.id);
        setModules(modules || []);
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchModules();
  }, [params.id]);

  const handleChapterClick = async (chapterId: string) => {
    try {
      const { data: chapter, error } = await supabase.from('chapters').select('*').eq('slug', chapterId).single();
      if (error) {
        throw error;
      }
      setSelectedChapter(chapter);
    } catch (error) {
      console.error("Error fetching chapter details:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex pt-[90px]'>
        <div className='w-1/5'>
          <Sidebar onChapterClick={handleChapterClick} modules={modules} />
        </div>

        <div className='w-4/5'>
          <div className='mx-2 flex'>
            <div className='overflow-y-auto max-h-screen'>
              {/* Conditional rendering based on loading state */}
              {loading ? (
                <BlogContentLoading /> // Render skeleton loading component
              ) : (
                selectedChapter && (
                  <div className='mx-4 ml-[10px] mr-[350px]'>
                    <h2 className='text-6xl'>{selectedChapter.chapter_name}</h2>
                    <p className='text-xl font-serif mt-2'>{selectedChapter.description}</p>

                    <img  className='w-[1200px] rounded-md object-cover object-center  h-[500px]'	src={selectedChapter.image} alt="" />
                    <div
                      className="font-[20px] mt-6 mr-[300px] mb-[20px] contentclass"
                      dangerouslySetInnerHTML={{ __html: selectedChapter.content || "" }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

