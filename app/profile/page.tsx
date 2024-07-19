"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import { Button } from '@/components/ui/button';
import supabase from '@/utils/supabase/supabase';
import { useUser } from "@/lib/store/user";
import { Input } from "@/components/ui/input";

// Define interface for instructor data
interface InstructorData {
  Name: string;
  Bio: string;
  instagram?: string;
  github?: string;
  linkdin?: string;
}

export default function Page() {
  const user:any = useUser((state) => state.user);
  const [isInstructor, setIsInstructor] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [Edit, SetEdit] =  useState(false)
  const [showdata, setShowdata] =  useState(true)
  const [formData, setFormData] = useState<InstructorData>({
    Name: '',
    Bio: '',
    instagram: '',
    github: '',
    linkdin: '',
  });
  const [instructorData, setInstructorData] = useState<InstructorData | null>(null);

  useEffect(() => {
    if (user) {
      checkIfInstructor(user);
    }
  }, [user]);

  const checkIfInstructor = async (user: any) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('instructor')
      .select('*')
      .eq('id', user.id);

    if (error) {
      console.error('Error checking if user is instructor:', error.message);
      return;
    }

    if (data.length > 0) {
      setIsInstructor(true);
      setInstructorData(data[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.from('instructor').insert([
      {
        id: user.id,
        ...formData,
      },
    ]);

    if (error) {
      console.error('Error saving instructor details:', error.message);
      return;
    }

    setIsInstructor(true);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
const handleedit = () =>{
  setShowForm(false);
  SetEdit(true)  
  setShowdata(false);

}
  return (
    <div>
      <Navbar />

      {showdata && isInstructor && instructorData ? (
         <div className='flex justify-center py-[120px] '>
        <div className=' justify-center items-center  gap-4'>
          <h2>Instructor Profile</h2>
          <p>Name: {instructorData.Name}</p>
          <p>Bio: {instructorData.Bio}</p>
          <p>Instagram: {instructorData.instagram}</p>
          <p>Github: {instructorData.github}</p>
          <p>Linkedin: {instructorData.linkdin}</p>
          <div className='  flex justify-center'>
          <Button onClick={handleedit} className='justify-center itrem-center'>Edit</Button>
          </div>
        </div>
            </div>
      ) : (
        <div className='pt-20'>
          <Button className='' onClick={toggleForm}>
            Become Instructor
          </Button>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <label htmlFor="Name">Name:</label>
              <Input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="Bio">Bio:</label>
              <Input
                type="text"
                id="Bio"
                name="Bio"
                value={formData.Bio}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="instagram">Instagram:</label>
              <Input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
              />
              <label htmlFor="github">Github:</label>
              <Input
                type="text"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
              />
              <label htmlFor="linkdin">Linkedin:</label>
              <Input
                type="text"
                id="linkdin"
                name="linkdin"
                value={formData.linkdin}
                onChange={handleInputChange}
              />
              <button type="submit">Save</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
