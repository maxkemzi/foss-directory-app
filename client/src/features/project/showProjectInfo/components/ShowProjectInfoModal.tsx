"use client";

import {parseProjectContributorCount} from "#src/entities/project";
import {ProjectContributorFromApi} from "#src/shared/api";
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
import {getContributorsByProjectId} from "../actions";

interface Props extends ModalProps {
	projectId: string;
}

const ShowProjectInfoModal: FC<Props> = ({onClose, projectId}) => {
	const {showToast} = useToast();
	const [contributors, setContributors] = useState<ProjectContributorFromApi[]>(
		[]
	);
	const [contributorsAreFetching, setContributorsAreFetching] = useState(false);

	useEffect(() => {
		const fetchContributors = async () => {
			setContributorsAreFetching(true);
			try {
				const data = await getContributorsByProjectId(projectId);
				setContributors(data);
			} catch (e) {
				showToast({
					variant: "error",
					message: e instanceof Error ? e.message : "Something went wrong"
				});
			} finally {
				setContributorsAreFetching(false);
			}
		};
		fetchContributors();
	}, [projectId, showToast]);

	if (!projectId) {
		return null;
	}

	return (
		<Modal isOpen onClose={onClose}>
			<ModalContent>
				{contributorsAreFetching ? (
					<ModalBody>
						<Spinner />
					</ModalBody>
				) : (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Project info
						</ModalHeader>
						<ModalBody>
							<h3>{parseProjectContributorCount(contributors.length)}</h3>
							<ul className="flex flex-col gap-2">
								{contributors.map(c => {
									const avatarJsx = (
										<Avatar
											isBordered
											color="secondary"
											src={c.user.avatar}
											name={c.user.username}
										/>
									);
									return (
										<li key={c.id}>
											<Card>
												<CardBody>
													<div className="flex gap-4 items-center">
														{c.isOwner ? (
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
															<p className="font-bold">{c.role.name}</p>
															<p>{c.user.username}</p>
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

export type {Props as ShowProjectInfoModalProps};
export default ShowProjectInfoModal;
