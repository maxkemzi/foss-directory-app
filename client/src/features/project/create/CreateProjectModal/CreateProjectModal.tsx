"use client";

import {Pathname} from "#src/shared/constants";
import {useAction} from "#src/shared/hooks";
import {ModalProps} from "#src/shared/modal";
import {useToast} from "#src/shared/toast";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FC} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {createProject} from "../actions";
import {VALIDATION_SCHEMA} from "../constants";
import {FormValues} from "../types";
import Fields from "./Fields/Fields";

type Props = ModalProps;

const CreateProjectModal: FC<Props> = ({onClose}) => {
	const router = useRouter();
	const {showToast} = useToast();

	const form = useForm<FormValues>({
		resolver: zodResolver(VALIDATION_SCHEMA),
		defaultValues: {
			name: "",
			description: "",
			repoUrl: "",
			role: "",
			tags: [],
			roles: []
		}
	});

	const {execute, isPending} = useAction(createProject, {
		onSuccess: data => {
			router.push(Pathname.YOUR_PROJECTS);
			showToast({variant: "success", message: data.success});
			onClose();
		},
		onError: data => {
			showToast({variant: "error", message: data.error});
		}
	});

	const onSubmit = (values: FormValues) => {
		execute(values);
	};

	return (
		<Modal isOpen onClose={onClose} scrollBehavior="inside">
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<ModalContent>
						<ModalHeader>Project Creation</ModalHeader>
						<ModalBody>
							<Fields onSubmit={onSubmit} />
						</ModalBody>
						<ModalFooter>
							<div className="flex gap-2 justify-end mt-6">
								<Button variant="light" onClick={onClose}>
									Close
								</Button>
								<Button color="primary" isDisabled={isPending} type="submit">
									Create
								</Button>
							</div>
						</ModalFooter>
					</ModalContent>
				</form>
			</FormProvider>
		</Modal>
	);
};

export type {Props as CreateProjectModalProps};
export default CreateProjectModal;
