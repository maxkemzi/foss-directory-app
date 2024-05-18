import {Pathname} from "#src/constants";
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
import {leaveProject} from "./actions";
import {FormState} from "./types";

const LeaveProjectModal: FC<CustomModalProps> = ({isOpen}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const projectId = searchParams.get("project-id");
	const [state, formAction] = useFormState<FormState>(leaveProject, {
		success: false,
		data: {projectId}
	});

	const onClose = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("modal");
		params.delete("project-id");

		router.replace(`${pathname}?${params.toString()}`);
	}, [pathname, router, searchParams]);

	useEffect(() => {
		if (state.success) {
			onClose();
			router.push(Pathname.CHATS);
		}
	}, [onClose, router, state.success]);

	if (!projectId) {
		return null;
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				{handleClose => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Leave project
						</ModalHeader>
						<ModalBody>
							<p>
								<span className="font-bold">Important</span>: if you are the
								project owner, the project will be deleted permanently! Are you
								sure you want to leave the project?
							</p>
						</ModalBody>
						<ModalFooter>
							<Button onPress={handleClose}>Cancel</Button>
							<form action={formAction}>
								<Button type="submit" color="danger">
									Leave
								</Button>
							</form>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default LeaveProjectModal;
