'use client';

import { useRouter } from "next/navigation";
import { TextField,  Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../../validationSchemas";
import { set, z } from "zod";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit, formState:{errors} } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = React.useState('')
    const [isSubmitting, setSubmitting] = React.useState(false);

    const onSubmit = handleSubmit(async (data) => {
            try {  
                setSubmitting(true);
                await axios.post('/api/issues', data);
                router.push('/issues');} 
                catch (error) {
                setSubmitting(false);
                setError('Failed to create issue');
            }
        })
    return (
        <div  className='max-w-xl'>

      {error && <Callout.Root color="red" className="mb-4">
            <Callout.Text>
                {error}
            </Callout.Text>
        </Callout.Root>}
        <form 
        className='space-y-3' onSubmit={onSubmit}>
            <TextField.Root placeholder="Title" {...register("title")}/>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
                name="description"
                control={control}
                render={({ field }) => <SimpleMDE placeholder="Desciption" {...field}/>}/>
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmitting} type='submit'>Submit New Issue{isSubmitting && <Spinner/>}</Button>
        
        </form>
        </div>
    );
};

export default NewIssuePage;