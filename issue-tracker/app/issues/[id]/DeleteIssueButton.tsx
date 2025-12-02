"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

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
							<Button variant="solid" color="red" onClick={async () => {
								await axios.delete(`/api/issues/${issueId}`)
								router.push('/issues')
								router.refresh()
							}}>
								Dlete Issue
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	);
};

export default DeleteIssueButton;
