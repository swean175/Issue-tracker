"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

	const [error, setError] = React.useState<true | false>(false);

	const deleteIssue =async () => {
		try {
			await axios.delete(`/api/issues/${issueId}`)
			router.push('/issues')
					router.refresh()
		} catch (error) {
			console.error("Failed to delete issue:", error);
			setError( true)
			return;
		}
		

	}

	const router = useRouter()
	return (
		<div>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red">Delete</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content maxWidth="450px">
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description size="2">
						Are you sure you want deleter this issue?
					</AlertDialog.Description>

					<Flex gap="3" mt="4" justify="end">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button variant="solid" color="red" onClick={deleteIssue}>
								Dlete Issue
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description size="2">
						{error && "Failed to delete issue. Please try again."}
					</AlertDialog.Description>
					<Button variant="soft" color="gray" mt="2" onClick={()=>setError(false)}>Ok</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	);
};

export default DeleteIssueButton;
