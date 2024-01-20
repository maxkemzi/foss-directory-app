import {Container} from "#src/components/ui";
import {Route} from "#src/constants";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button
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
	const isAuth = Boolean(cookieStore.get("isAuth")?.value);
	const user = cookieStore.get("user")?.value;
	const parsedUser = user ? JSON.parse(user) : null;

	return (
		<header
			className={classNames("border-b border-divider", {
				"absolute top-0 left-0 right-0": isAbsolute
			})}
		>
			<Container>
				<Navbar maxWidth="full">
					<NavbarBrand>
						<p className="font-bold text-inherit">FOSSFINDER</p>
					</NavbarBrand>
					<NavbarCenter />
					<NavbarContent justify="end">
						{isAuth ? (
							<UserDropdown user={parsedUser} />
						) : (
							<>
								<NavbarItem className="hidden lg:flex">
									<Link href={Route.LOGIN}>Log In</Link>
								</NavbarItem>
								<NavbarItem>
									<Button
										as={Link}
										color="primary"
										href={Route.SIGNUP}
										variant="flat"
									>
										Sign Up
									</Button>
								</NavbarItem>
							</>
						)}
					</NavbarContent>
				</Navbar>
			</Container>
		</header>
	);
};

export default Header;
