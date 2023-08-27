import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import AuthLayout from "../layout";
import FileInput from "../ui/file-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProjectSchema } from "../validations";
import CreateProjectLevel from "../layout/create-project-level";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ErrorText } from "../ui/error-text";
import { Textarea } from "../components/ui/textarea";
import React, { useState } from "react";
import { handleUploadImage } from "../functions";
import { useNavigate } from "react-router-dom";
import { ADD_NFT } from "../helper/paths";

const CreateProjectPage = () => {
    const [logo, setLogo] = React.useState([]);
    const [coverImage, setCoverImage] = React.useState([]);
    const [progress, setProgress] = React.useState();
    const [coverImageProgress, setCoverImageProgress] = React.useState();
    const [logoResponse, setLogoResponse] = useState(null);
    const [coverImageResponse, setCoverImageResponse] = useState(null);
    const navigate = useNavigate();
    
    const prevData = JSON.parse(localStorage.getItem('user_project'));
  
    const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateProjectSchema),
    delayError: 1000,
  });

  console.log(errors, 'erros-')

  const handleChangeLogo = (file) => {
    handleUploadImage(file[0], setProgress)
    .then((res) => setLogoResponse(res));
  };

  const handleChangeCoverImage = (file) => {
    handleUploadImage(file[0], setCoverImageProgress)
    .then((res) => setCoverImageResponse(res));
  };


  const submitForm = (data) => {
    console.log(data);
    const payload = { ...data, logo: logoResponse?.secure_url, cover_image: coverImageResponse?.secure_url };
    localStorage.setItem('user_project', JSON.stringify({ ...prevData, ...payload }));
    navigate(ADD_NFT);
  }

  return (
    <AuthLayout>
      <div className="mt-8 px-[400px]">
        <h1 className="text-center underline underline-offset-8">
          Create a project
        </h1>     

        <CreateProjectLevel />

        <div className="mt-14">
          <h1 className="font-bold text-[22px]">Project Details</h1>
          <p className="text-[12px] mt-2 pr-12">
            Enter your project&apos;s details. You can edit your project&apos;s
            details at any time after you deploy your project, but the
            transaction will cost gas.
          </p>

          <form className="mt-8" onSubmit={handleSubmit(submitForm)}>
            <Label htmlFor='project_name' className='text-sm'>Project Name *</Label>
            <Input {...register("project_name")} id="project_name" placeholder="Enter your project name" name="project_name" className="mt-2 mb-8 rounded-lg placeholder:text-xs" error={errors && errors.project_name?.message} />
            <ErrorText message={errors && errors.project_name?.message} />

            <Label htmlFor='tagline' className='text-sm'>Project tagline *</Label>
            <Input {...register("tagline")} id="tagline" placeholder="Enter your project tagline" name="tagline" className="mt-2 mb-8 rounded-lg placeholder:text-xs" error={errors && errors.tagline?.message} />
            <ErrorText message={errors && errors.tagline?.message} />


            <Label htmlFor='project_description' className='text-sm'>Project description *</Label>
            <Textarea {...register("project_description")} id="project_description" placeholder="Enter your project description" name="project_description" className="mt-2 rounded-lg placeholder:text-xs" error={errors && errors.project_description?.message} />
            <ErrorText message={errors && errors.project_description?.message} />

            <FileInput handleChangeFile={handleChangeLogo} setFiles={setLogo} files={logo} progress={progress} fileName={logoResponse && logoResponse.original_filename || ''} />

            <div className="flex justify-between mb-8">
              <div>
                <Label htmlFor='website_link' className='text-sm'>Website link</Label>
                <Input {...register("website_link")} id="website_link" placeholder="Enter your website link" name="website_link" className="mt-2 rounded-lg placeholder:text-xs" error={errors && errors.website_link?.message} />
                <ErrorText message={errors && errors.website_link?.message} />
              </div>
              <div>
                <Label htmlFor='twitter_handle' className='text-sm'>Twitter handle</Label>
                <Input {...register("twitter_handle")} id="twitter_handle" placeholder="Enter your twitter handle" name="twitter_handle" className="mt-2 rounded-lg placeholder:text-xs" error={errors && errors.twitter_handle?.message} />
                <ErrorText message={errors && errors.twitter_handle?.message} />
              </div>
            </div>

                <Label htmlFor='goal' className='text-sm'>Goal(in Ether)</Label>
                <Input {...register("goal")} id="goal" placeholder="Amout to raise in ether" name="goal" className="mt-2 rounded-lg placeholder:text-xs" error={errors && errors.goal?.message} />
                <ErrorText message={errors && errors.goal?.message} />

                <Label htmlFor='duration' className='text-sm'>Duration</Label>
                <Input {...register("duration")} id="duration" placeholder="Duration in days" name="duration" className="mt-2 rounded-lg placeholder:text-xs" error={errors && errors.duration?.message} />
                <ErrorText message={errors && errors.duration?.message} />

            <FileInput handleChangeFile={handleChangeCoverImage} setFiles={setCoverImage} files={coverImage} progress={coverImageProgress} fileName={coverImageResponse && coverImageResponse.original_filename || ''} label="Cover Image" />

            <div className="flex justify-end w-full my-10">
              <Button
                className="px-12 bg-fuchsia-500"
                // disabled={!isDirty || !isValid || !logoResponse}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CreateProjectPage;
