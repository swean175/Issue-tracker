"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
	const currentPath = usePathname();

	const links = [
		{
			label: "Dashboard",
			href: "/",
		},
		{
			label: "Issues",
			href: "/issues",
		},
	];

	return (
		<nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
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
		</nav>
	);
};

export default NavBar;
