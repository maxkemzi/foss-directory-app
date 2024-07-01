"use client";

import {Pathname} from "#src/shared/constants";
import {Bars2Icon, XMarkIcon} from "@heroicons/react/24/solid";
import {
	Button,
	Link,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Navbar as NextUiNavbar
} from "@nextui-org/react";
import classNames from "classnames";
import {SessionFromApi} from "foss-directory-shared";
import {usePathname} from "next/navigation";
import {FC, useState} from "react";
import {navbarItems} from "../../constants";
import UserDropdown from "./UserDropdown";

interface Props {
	isAbsolute?: boolean;
	session: SessionFromApi | null;
}

const Navbar: FC<Props> = ({isAbsolute, session}) => {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const renderMenuIcon = (isOpen: boolean) =>
		isOpen ? (
			<XMarkIcon className="w-[24px] h-[24px]" />
		) : (
			<Bars2Icon className="w-[24px] h-[24px]" />
		);

	return (
		<NextUiNavbar
			maxWidth="full"
			isBordered
			onMenuOpenChange={setIsMenuOpen}
			classNames={{
				base: classNames({"absolute top-0 left-0": isAbsolute}),
				wrapper: "max-w-[1440px]"
			}}
		>
			<NavbarContent>
				<NavbarMenuToggle
					icon={renderMenuIcon}
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="md:hidden"
				/>
				<NavbarBrand>
					<Link href={Pathname.HOME}>
						<p className="font-bold text-foreground">FOSSFINDER</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{navbarItems.map(ni => (
					<NavbarItem key={ni.id} isActive={pathname === ni.pathname}>
						<Link color="foreground" href={ni.pathname}>
							{ni.name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarContent justify="end">
				{session ? (
					<UserDropdown user={session.user} />
				) : (
					<>
						<NavbarItem className="hidden lg:flex">
							<Link href={Pathname.LOGIN}>Log In</Link>
						</NavbarItem>
						<NavbarItem>
							<Button
								as={Link}
								color="primary"
								href={Pathname.SIGNUP}
								variant="flat"
							>
								Sign Up
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>

			<NavbarMenu>
				{navbarItems.map(ni => (
					<NavbarMenuItem key={ni.id} isActive={pathname === ni.pathname}>
						<Link color="foreground" href={ni.pathname}>
							{ni.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</NextUiNavbar>
	);
};

export default Navbar;
