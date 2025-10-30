"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { set, type z } from "zod";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import { createIssueSchema } from "../../validationSchemas";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;


const IssueForm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(createIssueSchema),
	});
	const [error, setError] = React.useState("");
	const [isSubmitting, setSubmitting] = React.useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try {
			setSubmitting(true);
			await axios.post("/api/issues", data);
			router.push("/issues");
		} catch (error) {
			setSubmitting(false);
			setError("Failed to create issue");
		}
	});
	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-4">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className="space-y-3" onSubmit={onSubmit}>
				<TextField.Root placeholder="Title" defaultValue={issue?.title} {...register("title")} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					defaultValue={issue?.description || ""}
					render={({ field }) => (
						<SimpleMDE placeholder="Desciption" {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting} type="submit">
					Submit New Issue{isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
