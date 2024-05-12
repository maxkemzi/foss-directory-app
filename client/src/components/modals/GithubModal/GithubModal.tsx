import {redirectToGithubConnectionUrl} from "#src/actions/integrations";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {FC} from "react";
import {CustomModalProps} from "../types";

const GithubModal: FC<CustomModalProps> = ({isOpen, onClose}) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<ModalContent>
			{handleClose => (
				<>
					<ModalHeader className="flex flex-col gap-1">
						Github Connection
					</ModalHeader>
					<ModalBody>
						<p>
							You need to connect your Github account in order to create
							projects. You can do it later in the settings.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={handleClose}>
							Close
						</Button>
						<form action={redirectToGithubConnectionUrl}>
							<Button type="submit" color="primary">
								Connect
							</Button>
						</form>
					</ModalFooter>
				</>
			)}
		</ModalContent>
	</Modal>
);

export default GithubModal;
