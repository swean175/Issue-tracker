import { createIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route"; // Zaimportuj swoje opcje autoryzacj
import { getServerSession } from "next-auth";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string  } },
) {
	  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  	const { id } = await params;
	const body = await request.json();
	const validation = createIssueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
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

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {

	const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

	  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
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
// function delay(arg0: number) {
// 	throw new Error("Function not implemented.");
// }

