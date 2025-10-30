import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";

interface Props {
	href: string;
	children: string;
}
const Link = ({ href, children }: Props) => {
	return (
		<NextLink href={href} passHref legacyBehavior>
			<RadixLink weight="medium" underline="hover">
				{children}
			</RadixLink>
		</NextLink>
	);
};

export default Link;
