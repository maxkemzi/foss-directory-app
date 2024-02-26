"use client";

import {Pathname} from "#src/constants";
import {Link, NavbarContent, NavbarItem} from "@nextui-org/react";
import {usePathname} from "next/navigation";

const NavbarCenter = () => {
	const pathname = usePathname();

	return (
		<NavbarContent className="hidden sm:flex gap-4" justify="center">
			<NavbarItem isActive={pathname === Pathname.HOME}>
				<Link color="foreground" href={Pathname.HOME}>
					Home
				</Link>
			</NavbarItem>
			<NavbarItem isActive={pathname === Pathname.PROJECTS}>
				<Link color="foreground" href={Pathname.PROJECTS}>
					Projects
				</Link>
			</NavbarItem>
		</NavbarContent>
	);
};

export default NavbarCenter;
