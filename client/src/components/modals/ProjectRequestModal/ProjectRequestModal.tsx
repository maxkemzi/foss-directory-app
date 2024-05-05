import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FC, useCallback, useEffect} from "react";
import {useFormState} from "react-dom";
import {CustomModalProps} from "../types";
import {requestRole} from "./actions";
import {FormState} from "./types";

const ProjectRequestModal: FC<CustomModalProps> = ({isOpen}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const projectRoleId = searchParams.get("project-role-id");
	const [state, formAction] = useFormState<FormState>(requestRole, {
		success: false,
		data: {projectRoleId: projectRoleId ? Number(projectRoleId) : null}
	});

	const onClose = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("modal");
		params.delete("project-role-id");

		router.replace(`${pathname}?${params.toString()}`);
	}, [pathname, router, searchParams]);

	useEffect(() => {
		if (state.success) {
			onClose();
		}
	}, [onClose, state.success]);

	if (!projectRoleId) {
		return null;
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				{handleClose => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Role request
						</ModalHeader>
						<ModalBody>
							<p>Are you sure you want to request role?</p>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={handleClose}>
								Cancel
							</Button>
							<form action={formAction}>
								<Button type="submit" color="primary">
									Request
								</Button>
							</form>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ProjectRequestModal;
