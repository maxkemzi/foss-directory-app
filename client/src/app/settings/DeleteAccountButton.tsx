import {ModalVariant} from "#src/constants";
import {Button, Link} from "@nextui-org/react";

const DeleteAccountButton = () => {
	return (
		<Button
			as={Link}
			color="danger"
			href={`?modal=${ModalVariant.DELETE_ACCOUNT}`}
		>
			Delete Account
		</Button>
	);
};

export default DeleteAccountButton;
