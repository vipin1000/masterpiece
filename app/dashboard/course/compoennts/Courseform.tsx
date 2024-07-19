import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/store/user";
import { useState } from "react";
import { Icourse } from "@/lib/types";
import { useForm } from "react-hook-form";
import { BsSave } from "react-icons/bs";
import { readCatogries } from "@/lib/actions/blog";
import { Catagories } from "@/lib/types";
import slugify from "slugify";

interface CourseFormProps {
  onHandleSubmit: (data: Icourse) => void;
  defaultCourse: Icourse;
}

export default function Courseform({
  onHandleSubmit,
  defaultCourse,
}: CourseFormProps) {
  const user = useUser((state) => state.user);
  const [formValues, setFormValues] = useState<Icourse>(defaultCourse);
  const [categories, setCategories] = useState<Catagories[]>([]);

  const form = useForm<Icourse>({
    defaultValues: formValues,
  });

  useEffect(() => {
    // Fetch categories from Supabase backend
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: Catagories } = await readCatogries();
      if (Catagories) {
        setCategories(Catagories);
      } } 
      catch (error) {
        console.log(error);
  };
};

  const onSubmit = (data: Icourse) => {
    if (user?.id) {
      const instructor = user?.id;
      const slug = slugify(form.getValues().Name, { lower: true }) + instructor;
      const created_at = new Date().toISOString().slice(0, 16);
      const newData = { ...data, instructor, created_at, slug  };
      onHandleSubmit(newData);
    }
  };

  useEffect(() => {
    if (user?.id) {
      const instructor = user?.id;
      const Catogory_id = " ";
      setFormValues({
        ...formValues,
        instructor,
        Catogory_id,
        created_at: new Date().toISOString().slice(0, 16),
    
      });
    }
  }, [user?.id]);

  return (
    <div className="pt-[100px] mx-4 justify-center">
      <h1 className="text-2xl font-bold">Add Course</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border pb-5 rounded-md">
        <div className="px-2 py-2 pb-10">
          <button
            type="submit"
            className={cn(
              "flex float-right gap-2 text-white items-center border px-3 py-2 rounded-md border-green-500 disabled:border-gray-800 bg-zinc-800 transition-all group text-sm disabled:bg-gray-900",
              { "cursor-not-allowed": !form.formState.isValid }
            )}
            disabled={!form.formState.isValid}
          >
            <BsSave className="animate-bounce group-disabled:animate-none" />
            Save
          </button>
        </div>
        <div className="grid grid-cols-2 grid-flow-row">
          <div className={cn("w-full flex divide-x p-2 gap-2 items-center")}>
            <label className="block font-bold mb-2" htmlFor="banner_image">
              Banner Image
            </label>
            <Input
              placeholder="🔗 Image url"
              {...form.register("banner_image")}
              className={cn("border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500")}
              type="text"
            />
          </div>
          <div className={cn("w-full flex break-words p-2 gap-2")}>
            <label className="block font-bold mb-2" htmlFor="Name">
              Course name
            </label>
            <Input
              placeholder="Course Name"
              {...form.register("Name")}
              autoFocus
              className={cn("shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline")}
            />
          </div>
          <div className={cn("w-full flex break-words p-2 gap-2")}>
            <label className="block font-bold mb-2" htmlFor="Description">
              Course Description
            </label>
            <Input
              placeholder="Course Description"
              {...form.register("Description")}
              autoFocus
              className={cn("shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline")}
            />
          </div>
          <div className={cn("w-full flex break-words p-2 gap-2")}>
            <label className="block font-bold mb-2" htmlFor="Category">
              Category
            </label>
            <select
              {...form.register("Catogory_id")}
              className={cn("shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline")}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={cn("w-full flex break-words p-2 gap-2")}>
            <label className="block font-bold mb-2" htmlFor="price">
              Course Price
            </label>
            <Input
              type="number"
              placeholder="Course price"
              {...form.register("price")}
              autoFocus
              className={cn("shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
