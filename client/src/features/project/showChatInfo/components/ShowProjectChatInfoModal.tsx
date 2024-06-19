"use client";

import {projectHelpers} from "#src/entities/project";
import {useProjectUserList} from "#src/entities/projectUser";
import {FetchMoreButton} from "#src/features/fetchMore";
import {ModalProps} from "#src/shared/modal";
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
import {FC, useEffect} from "react";

interface Props extends ModalProps {
	projectId: string;
}

const ShowProjectChatInfoModal: FC<Props> = ({onClose, projectId}) => {
	const {users, isFetching, hasMore, fetchFirstPage, fetchMore} =
		useProjectUserList(projectId);

	useEffect(() => {
		fetchFirstPage();
	}, [fetchFirstPage]);

	if (!projectId) {
		return null;
	}

	return (
		<Modal isOpen onClose={onClose}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">Project info</ModalHeader>
				<ModalBody>
					{!isFetching || hasMore ? (
						<>
							<h3>{projectHelpers.parseMemberCount(users.length)}</h3>
							<ul className="flex flex-col gap-2">
								{users.map(pu => {
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
						</>
					) : null}
					{isFetching && !hasMore ? <Spinner /> : null}
					{hasMore ? (
						<FetchMoreButton
							className="mt-2"
							isFetching={isFetching}
							onFetchMore={fetchMore}
						/>
					) : null}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export type {Props as ShowProjectChatInfoModalProps};
export default ShowProjectChatInfoModal;
