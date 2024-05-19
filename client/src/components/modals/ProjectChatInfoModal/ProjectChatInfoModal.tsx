import {parseContributorCount} from "#src/helpers";
import {ProjectContributorFromApi} from "#src/types/apis";
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
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FC, useCallback, useEffect, useState} from "react";
import {CustomModalProps} from "../types";
import {getContributorsByProjectId} from "./actions";

const ProjectChatInfoModal: FC<CustomModalProps> = ({isOpen}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const projectId = searchParams.get("project-id");
	const [contributors, setContributors] = useState<ProjectContributorFromApi[]>(
		[]
	);
	const [contributorsAreFetching, setContributorsAreFetching] = useState(false);

	const onClose = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("modal");
		params.delete("project-id");

		router.replace(`${pathname}?${params.toString()}`);
	}, [pathname, router, searchParams]);

	useEffect(() => {
		const fetchContributors = async () => {
			if (!projectId) {
				return;
			}

			setContributorsAreFetching(true);
			setContributors(await getContributorsByProjectId(projectId));
			setContributorsAreFetching(false);
		};
		fetchContributors();
	}, [projectId]);

	if (!projectId) {
		return null;
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
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
							<h3>{parseContributorCount(contributors.length)}</h3>
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

export default ProjectChatInfoModal;
