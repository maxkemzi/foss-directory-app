"use client";

import {Route} from "#src/constants";
import {Link} from "@nextui-org/link";
import {NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {usePathname} from "next/navigation";

const NavbarCenter = () => {
	const pathname = usePathname();

	return (
		<NavbarContent className="hidden sm:flex gap-4" justify="center">
			<NavbarItem isActive={pathname === Route.HOME}>
				<Link color="foreground" href={Route.HOME}>
					Home
				</Link>
			</NavbarItem>
			<NavbarItem isActive={pathname === Route.PROJECTS}>
				<Link color="foreground" href={Route.PROJECTS}>
					Projects
				</Link>
			</NavbarItem>
		</NavbarContent>
	);
};

export default NavbarCenter;
