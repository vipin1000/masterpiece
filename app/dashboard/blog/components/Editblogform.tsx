"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/store/user";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import { BsGithub } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { PiLinkedinLogo } from "react-icons/pi";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { PlayCircle, Speaker, TwitterIcon } from "lucide-react";
import { IoShare } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Share1Icon } from "@radix-ui/react-icons";
import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css'; // or any other style you prefer
import "highlight.js/styles/atom-one-dark.min.css";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import Image from "next/image";
import { cn } from "@/lib/utils";
import slugify from "slugify";
import {
  EyeOpenIcon,
  Pencil1Icon,
  RocketIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { ReactNode, useRef, useTransition } from "react";
import { IBlogDetial, IBlogForm } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { BsSave } from "react-icons/bs";
import { BlogFormSchemaType } from "../schema";
import Link from "next/link";
import logo from "../../../image.png"
import ReactQuill from "react-quill";

interface CustomQuillProps extends ReactQuill.ReactQuillProps {
    hookRef: (ref: ReactQuill | null) => void; 
  }
  const MyReactQuill = dynamic(
    async () => {
      // @ts-ignore
      window.hljs = hljs;
      const { default: RQ } = await import("react-quill");
  
      return function ReactQuillHoc(props: CustomQuillProps) {
        const { hookRef, ...rest } = props;
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <RQ ref={hookRef} {...{ ...rest }} />;
      };
    },
    {
      ssr: false,
      //  loading: () => <div>hi</div>
    }
  );

export default function BlogForm({
  onblogsubmit,
  defaultBlog,
}: {
  defaultBlog: IBlogDetial;
  onblogsubmit: (data: BlogFormSchemaType) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreview] = useState(false);
  const user = useUser((state) => state.user);
  // const [content, setContent] = useState<string>('');

  const form = useForm<BlogFormSchemaType>({
    mode: "all",
    defaultValues: {
      title: defaultBlog?.title,
      image: defaultBlog?.image || "",
      status: defaultBlog?.status || true,
      author: defaultBlog?.author || "",
      content: defaultBlog?.content || "",
      meta_title: defaultBlog?.meta_tiltle || "",
      meta_description: defaultBlog?.meta_description || "",
      created_at: defaultBlog?.created_at || "",
      slug: defaultBlog?.slug || "",
      coments_enabled: defaultBlog?.coments_enabled || false,
    },
  });

  const onSubmit = (data: BlogFormSchemaType) => {
    console.log(data);
    console.log("button pressed");
    startTransition(() => {
        onblogsubmit(data);
    });
  };

  useEffect(() => {
    if (form.getValues().title && user?.id) {
      const slug = slugify(form.getValues().title, { lower: true }) + user?.id;
      const meta_title = form.getValues().title;
      const meta_description = form.getValues().content;
      form.setValue("slug", slug);
      form.setValue("meta_title", meta_title);
      form.setValue("meta_description", meta_description);
      console.log(slug);
      form.setValue("author", user?.id);
      form.setValue("created_at", new Date().toISOString().slice(0, 16));
    }
  }, [form.getValues().title, user?.id]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules = {
    syntax: true,
    // Equivalent to { toolbar: { container: '#toolbar' }}
    toolbar: toolbarOptions,
  };
  useEffect(() => {
    // Initialize highlight.js
    hljs.initHighlightingOnLoad();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full pt-[50px] border pb-5 rounded-md"
      >
        <div className="border-b p-5 flex items-center sm:justify-between flex-wrap  gap-2">
          <div className="flex items-center flex-wrap gap-5">
            <span
              onClick={() => {
                setPreview(!isPreview && !form.getFieldState("image").invalid);
              }}
              role="button"
              tabIndex={0}
              className="flex gap-2 text-white items-center border px-3 py-2 rounded-md hover:border-zinc-400 transition-all bg-zinc-800 text-sm"
            >
              {!isPreview ? (
                <>
                  <EyeOpenIcon />
                  Preview
                </>
              ) : (
                <>
                  <Pencil1Icon />
                  Edit
                </>
              )}
            </span>
          </div>

          <button
            type="submit"
            role="button"
            className={cn(
              "flex gap-2 text-white items-center border px-3 py-2 rounded-md border-green-500 disabled:border-gray-800  bg-zinc-800 transition-all group text-sm disabled:bg-gray-900",
              { "animate-spin": isPending }
            )}
            disabled={!form.formState.isValid}
          >
            <BsSave className="animate-bounce group-disabled:animate-none" />
            Save
          </button>
        </div>



        {!isPreview ? (
          <div className="mx-[300px]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full  break-words p-2 gap-2">
                      <Input
                        placeholder="Blog title"
                        {...field}
                        autoFocus
                        className="border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full "
                      />
                    </div>
                  </FormControl>

                  {form.getFieldState("title").invalid &&
                    form.getValues().title && (
                      <div className="px-2">
                        <FormMessage />
                      </div>
                    )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <div className="w-full flex divide-x p-2 gap-2 items-center">
                        <Input
                          placeholder="🔗 Image url"
                          {...field}
                          className="border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 w-full "
                          type="url"
                        />
                      </div>
                    </FormControl>

                    <div className="px-3">
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />
            <div className=" p-2 gap-2">
              <div className=" contentclass">
              <MyReactQuill
               hookRef={(ref) => console.log(ref)} theme="bubble" 
                value={form.getValues().content}
                modules={modules}
                placeholder="Blog content"
           onChange={(value : '') => form.setValue("content", value)} />
                {/* <ReactQuill
                  theme="bubble"
                  value={form.getValues().content}
                  onChange={(value) => form.setValue("content", value)}
                  modules={modules}
                  placeholder="Blog content"
                  className="my-custom-class"
                /> */}
              </div>
            </div>
          </div>
        ) : (

            <div className="">
            <div className="mx-[400px] ">
            <div className="">
              <div className="space-y-5 ">
                <h1 className="text-6xl  font-bold dark:text-gray-200">
                {form.getValues().title || "Untitled blog"}
                </h1>
                <div className=" flex justify-between px-1 py-2 mx-0 sm:mx-2 font-lg">
                  <div className="flex gap-2 ">
                    <div className="">
                      <Image
                        className="rounded-full px-1 py-1 "
                        width={60}
                        height={60}
                        alt="profile"
                        src={logo}
                      />
                    </div>
      
                    <div className="pt-2">
                      <p className="text-lg font-medium  dark:text-gray-400">
                       author
                      </p>
                      <p className="text-sm   font-medium  dark:text-gray-400">
                       14 may 2024
                      </p>
                    </div>
                  </div>
                  <div className="flex pt-10 gap-3">
                    <Link target="_blank" href="google.com">
                      <BsGithub />
                    </Link>
                    <Link target="_blank" href="google.com">
                      <BsInstagram />
                    </Link>
                    <Link target="_blank" href="google.com">
                      <BsTwitter />
                    </Link>
                    <Link target="_blank" href="google.com">
                      <PiLinkedinLogo />
                    </Link>
                    <p className="text-lg font-medium flex dark:text-gray-400"></p>
                  </div>
                </div>
      
                <div className="">
                  <hr className="border-gray-200" />
      
                  <div className="flex items-center justify-between mb-4 pt-2">
                    <div className="flex items-center space-x-4">
                      <button
                        className="ml-[60px] flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
                      >
                        <span>
                          <AiOutlineComment />{" "}
                        </span>
                      </button>
      
      
      
      
      
      
      
      
                    </div>
                    <div className="flex items-center space-x-4">
                    <button className="hello"
      >
        <span className="material-icons">
          {/* <PlayCircle onClick="pass" /> */}
        </span>
      </button>
      
      
                      <button className="text-gray-600 font-medium text-xl hover:text-gray-800 transition">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            {" "}
                            <span className="material-icons">
                              <IoShare />
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>
      
      
      
                              <button className="flex pl-3 px-2">
                                <span className=" py-2">
                                  <Share1Icon />
                                </span>
                                <span className="flex ml-2 pt-1 ">Copy link</span>
                                <span className="ml-1">
                                  {" "}
                                  {/* <CopyButton id={blogUrl} /> */}
                                </span>
                              </button>
      
      
      
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <button
                  
                                className="flex px-2 py-2 "
                              >
                                <span className="pt-1 ">
                                  <TwitterIcon />
                                </span>
                                <span className="flex ml-2  "> Share on twiter</span>
                              </button>
      
      
      
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <button
                         
                                className="flex px-2 py-2 "
                              >
                                <span className="pt-1">
                                  <BsInstagram />{" "}
                                </span>
                                <span className="flex ml-2  "> Share on threads</span>
                              </button>
      
      
      
                            </DropdownMenuItem>
                            <DropdownMenuItem>
      
      
                              <button
                             
                                className="flex px-2 py-2 "
                              >
                                <span className="pt-1">
                                  <PiLinkedinLogo />{" "}
                                </span>
                                <span className="flex ml-2  ">Share on Linkdin</span>
                              </button>
      
      
      
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </button>
      
                   <DropdownMenu>
                          <DropdownMenuTrigger>
                            <span className="material-icons">
                              <BsThreeDotsVertical />
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link
                                className="font-medium text-green-400"
                                target="_blank"
                                href="google.com"
                              >
                                Follow Author
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-large text-red-700">
                              Report Article
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </div>
                  <hr className="border-gray-200 font-mono" />
                </div>
              </div>
      
              <div className="w-full px-8  mt-6 h-96 relative">
                <Image
                  priority
                  src={form.getValues().image}
                  alt="cover"
                  fill
                  className=" object-cover sm:w-[300px] object-center rounded-md border-[0.5px] border-zinc-600"
                  sizes="(max-width: 300px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div
  className="font-[20px]  mb-[20px] contentclass"
  dangerouslySetInnerHTML={{
    __html: form.getValues().content || "",
  }}
/>
            </div>
          </div>
          </div>
        )}
      </form>
    </Form>
  );
}
