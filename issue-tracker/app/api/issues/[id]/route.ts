import { createIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { type NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string | number } },
) {
	const body = await request.json();
	const validation = createIssueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}
	const issue = await prisma.issue.findUnique({
		where: { id: typeof params.id === "string" ? parseInt(params.id) : params.id },
	});

	if (!issue)
		return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

	const updatedIssue = await prisma.issue.update({
		where: { id: issue.id },
		data: {
			title: body.title,
			description: body.description,
		},
	});
	return NextResponse.json(`Update issue with id: ${params.id}`, {
		status: 200,
	});
	
}

export async function DELETE( request: NextRequest,{ params }: { params: { id: string | number } }) {

	const issue = await prisma.issue.delete({
		where: { id: typeof params.id === "string" ? parseInt(params.id) : params.id },
	});

	if (!issue) {
		return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
	} else {
		prisma.issue.delete({
			where: { id: issue.id },
		});
		return NextResponse.json({});
	}
}
function delay(arg0: number) {
	throw new Error("Function not implemented.");
}

