import {ProjectMessageFromApi} from "#src/shared/api";
import {StarIcon} from "@heroicons/react/16/solid";
import {Avatar as NextUiAvatar, Badge} from "@nextui-org/react";
import {FC} from "react";

interface Props {
	isOwner?: boolean;
	sender: ProjectMessageFromApi["sender"];
}

const Avatar: FC<Props> = ({isOwner, sender}) => {
	const avatar = (
		<NextUiAvatar
			isBordered
			size="sm"
			color="secondary"
			name={sender?.user.username || "Unknown"}
		/>
	);

	if (isOwner) {
		return (
			<Badge
				isOneChar
				content={<StarIcon className="w-[16px] h-[16px]" />}
				variant="solid"
				color="primary"
				shape="circle"
				placement="top-right"
				size="sm"
			>
				{avatar}
			</Badge>
		);
	}

	return avatar;
};

export default Avatar;
