import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import React from "react";
import { prisma } from "@/prisma/client";
import IssueFormSkeleton from "./Loading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

interface Props {
	params: { id: string };
}
 
const EditIssuePage = async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});

	if (!issue) notFound();

	return <IssueForm issue={issue} />;
};

export default EditIssuePage;
