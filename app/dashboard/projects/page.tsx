"use client"
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input'
import supabase from '@/utils/supabase/supabase';
import axios from 'axios';
import { useUser } from '@/lib/store/user';

export default function page() {
    const new_id = useUser((state) => state.user?.id);
    const [loading, setLoading] = useState(false);
   
    const [formData, setFormData] = useState({
        Budget: 0,
        current_funding: 0,
        Progress: 0,
        Project_title: "",
        communication_channel: "",
        opportunity_details: "",
        profit_sharing_model: "",
        project_description: "",
        user_id: new_id,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            user_id: new_id,
          
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(formData);
            const { data, error } = await supabase
                .from('Project') // Replace 'your_table_name' with your actual table name in Supabase
                .insert([formData]);
            if (error) {
                throw error;
            }
            console.log('Data inserted successfully:', data);
            // Optionally, you can clear the form after successful submission
            setFormData({
                Budget: 0,
                current_funding: 0,
                Progress: 0,
                Project_title: "",
                communication_channel: "",
                opportunity_details: "",
                profit_sharing_model: "",
                project_description: "",
                user_id: new_id
            });
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };


  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <label>
        Budget:
        <input
            type="number"
            name="Budget"
            value={formData.Budget}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
        />
    </label>
    <label>
        Current Funding:
        <input
            type="number"
            name="current_funding"
            value={formData['current_funding']}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
        />
    </label>
    <label>
        Progress:
        <input
            type="number"
            name="Progress"
            value={formData.Progress}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
        />
    </label>
    <label>
        Project Title:
        <input
            type="text"
            name="Project_title"
            value={formData.Project_title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
        />
    </label>
    <label>
        Communication Channel:
        <input
            type="text"
            name="communication_channel"
            value={formData.communication_channel}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
        />
    </label>
    <label>
        Opportunity Details:
        <input
            type="text"
            name="opportunity_details"
            value={formData.opportunity_details}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
        />
    </label>
    <label>
        Profit Sharing Model:
        <input
            type="text"
            name="profit_sharing_model"
            value={formData.profit_sharing_model}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
        />
    </label>
    <label>
        Project Description:
        <input
            type="text"
            name="project_description"
            value={formData.project_description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
        />
    </label>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
</form>
       
    </div>
  )
}
