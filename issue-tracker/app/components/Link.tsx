import { Link as RadixLink } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
	href: string;
	children: React.ReactNode;
}
const Links = ({ href, children }: Props) => {
	return (
		<Link href={href} passHref legacyBehavior>
			<RadixLink weight="medium" underline="hover">
				{children}
			</RadixLink>
		</Link>
	);
};

export default Link;
