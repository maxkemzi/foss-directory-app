import {UserFromApi} from "#src/api";
import {Pathname} from "#src/constants";
import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from "@nextui-org/react";
import classNames from "classnames";
import {cookies} from "next/headers";
import {FC} from "react";
import NavbarCenter from "./NavbarCenter";
import UserDropdown from "./UserDropdown";

interface Props {
	isAbsolute?: boolean;
}

const Header: FC<Props> = ({isAbsolute}) => {
	const cookieStore = cookies();
	const user = cookieStore.get("user")?.value;
	const parsedUser = user ? (JSON.parse(user) as UserFromApi) : null;

	return (
		<Navbar
			maxWidth="full"
			isBordered
			classNames={{
				base: classNames({"absolute top-0 left-0": isAbsolute}),
				wrapper: "max-w-[1440px]"
			}}
		>
			<NavbarBrand>
				<p className="font-bold text-inherit">FOSSFINDER</p>
			</NavbarBrand>
			<NavbarCenter />
			<NavbarContent justify="end">
				{parsedUser ? (
					<UserDropdown user={parsedUser} />
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
		</Navbar>
	);
};

export default Header;
