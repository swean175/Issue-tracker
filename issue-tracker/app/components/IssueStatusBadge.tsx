import type { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
	Status,
	{ label: string; color: "red" | "green" | "blue" }
> = {
	OPEN: { label: "Open", color: "green" },
	IN_PROGRESS: { label: "In Progress", color: "blue" },
	CLOSED: { label: "Closed", color: "red" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
	return (
		<Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
	);
};

export default IssueStatusBadge;
