"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Box, Container, DropdownMenu, Flex, Avatar, Text } from "@radix-ui/themes";

const NavBar = () => {
	const currentPath = usePathname();
	const { status, data: session } = useSession();

	const links = [
		{
			label: "Dashboard",
			href: "/",
		},
		{
			label: "Issues",
			href: "/issues/list",
		},
	];

	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container >	
			<Flex justify='between' align="center">
				<Flex align="center" gap="4">
						<Link href="/">
				<AiFillBug size={30} />
			</Link>
			<ul className="flex space-x-6 ">
				{links.map((link) => (
					<li key={link.href}>
						<Link
							className={classNames({
								"text-zinc-900": currentPath === link.href,
								"text-zinc-500": currentPath !== link.href,
								"hover:text-zinc-800": true,
							})}
							href={link.href}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
				</Flex>
					<Box>
				{status === "authenticated" &&
				//  <Link href="/api/auth/signout">Log Out</Link>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger >
						<Avatar className="cursor-pointer" src={session.user?.image || undefined} fallback="?" size="2" radius="full" alt={session.user?.name || undefined} />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label><Text size="2">{session.user?.email}</Text></DropdownMenu.Label>
						<DropdownMenu.Item>
							<Link href="/api/auth/signout">Log Out</Link>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>}
				{status === "unauthenticated" && <Link href="/api/auth/signin">Log In</Link>}
			</Box>
			</Flex>
		
		</Container>
		</nav>
	);
};

export default NavBar;
