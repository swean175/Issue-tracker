"use client";

// import SimpleMDE from "react-simplemde-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import type { z } from "zod";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import { createIssueSchema } from "../../validationSchemas";

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue, id }: { issue?: Issue; id?: number }) => {
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
			if (issue) {
				await axios.patch(`/api/issues/${issue.id}`, data);
			} else {
				await axios.post("/api/issues", data);
			}
		 	router.push("/issues/list")
			router.refresh();
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
				<TextField.Root
					placeholder="Title"
					defaultValue={issue?.title}
					{...register("title")}
				/>
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
					{issue ? "Update Issue" : "Submit New Issue"}{" "}
					{isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
