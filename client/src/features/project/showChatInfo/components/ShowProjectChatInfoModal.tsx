"use client";

import {parseProjectMemberCount} from "#src/entities/project";
import {ProjectUserFromApi} from "#src/shared/apis";
import {ModalProps} from "#src/shared/modal";
import {useToast} from "#src/shared/toast";
import {StarIcon} from "@heroicons/react/16/solid";
import {
	Avatar,
	Badge,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spinner
} from "@nextui-org/react";
import {FC, useEffect, useState} from "react";
import {getProjectUsersByProjectId} from "../actions";

interface Props extends ModalProps {
	projectId: string;
}

const ShowProjectChatInfoModal: FC<Props> = ({onClose, projectId}) => {
	const {showToast} = useToast();
	const [projectUsers, setProjectUsers] = useState<ProjectUserFromApi[]>([]);
	const [projectUsersAreFetching, setProjectUsersAreFetching] = useState(false);

	useEffect(() => {
		const fetchProjectUsers = async () => {
			setProjectUsersAreFetching(true);
			try {
				const {data} = await getProjectUsersByProjectId(projectId);
				setProjectUsers(data);
			} catch (e) {
				showToast({
					variant: "error",
					message: e instanceof Error ? e.message : "Something went wrong"
				});
			} finally {
				setProjectUsersAreFetching(false);
			}
		};
		fetchProjectUsers();
	}, [projectId, showToast]);

	if (!projectId) {
		return null;
	}

	return (
		<Modal isOpen onClose={onClose}>
			<ModalContent>
				{projectUsersAreFetching ? (
					<ModalBody>
						<Spinner />
					</ModalBody>
				) : (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Project info
						</ModalHeader>
						<ModalBody>
							<h3>{parseProjectMemberCount(projectUsers.length)}</h3>
							<ul className="flex flex-col gap-2">
								{projectUsers.map(pu => {
									const avatarJsx = (
										<Avatar
											isBordered
											color="secondary"
											src={pu.user.avatar}
											name={pu.user.username}
										/>
									);
									return (
										<li key={pu.id}>
											<Card>
												<CardBody>
													<div className="flex gap-4 items-center">
														{pu.isOwner ? (
															<Badge
																isOneChar
																content={
																	<StarIcon className="w-[16px] h-[16px]" />
																}
																variant="solid"
																color="primary"
																shape="circle"
																placement="top-right"
																size="sm"
															>
																{avatarJsx}
															</Badge>
														) : (
															avatarJsx
														)}

														<div>
															<p className="font-bold">{pu.role.name}</p>
															<p>{pu.user.username}</p>
														</div>
													</div>
												</CardBody>
											</Card>
										</li>
									);
								})}
							</ul>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export type {Props as ShowProjectChatInfoModalProps};
export default ShowProjectChatInfoModal;
