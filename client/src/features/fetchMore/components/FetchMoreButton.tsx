import {Button, Spinner} from "@nextui-org/react";
import classNames from "classnames";
import {FC} from "react";

interface Props {
	className?: string;
	isFetching?: boolean;
	onFetchMore?: (...args: any[]) => any;
}

const FetchMoreButton: FC<Props> = ({className, isFetching, onFetchMore}) => {
	return (
		<div className={classNames("flex justify-center", className)}>
			{isFetching ? (
				<Spinner />
			) : (
				<Button color="primary" variant="flat" onClick={onFetchMore}>
					Fetch More
				</Button>
			)}
		</div>
	);
};

export default FetchMoreButton;
