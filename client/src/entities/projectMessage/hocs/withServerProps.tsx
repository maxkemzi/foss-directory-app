import {FC} from "react";
import {ProjectMessageCardProps} from "../types";

const withServerProps = (
	Component: FC<ProjectMessageCardProps & {formattedDate: string}>
) => {
	const UpdatedComponent = (props: ProjectMessageCardProps) => {
		const {message} = props;

		const date = new Date(message.createdAt);
		const formattedDate = new Intl.DateTimeFormat("en", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		}).format(date);

		// eslint-disable-next-line react/jsx-props-no-spreading
		return <Component {...props} formattedDate={formattedDate} />;
	};

	return UpdatedComponent;
};

export default withServerProps;
