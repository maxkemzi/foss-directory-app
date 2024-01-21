import {
	Button,
	Link,
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
							projects.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={handleClose}>
							Close
						</Button>
						<Button
							as={Link}
							href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
							color="primary"
						>
							Connect
						</Button>
					</ModalFooter>
				</>
			)}
		</ModalContent>
	</Modal>
);

export default GithubModal;
