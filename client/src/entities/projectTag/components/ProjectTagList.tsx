import {Children, FC, ReactNode} from "react";

interface Props {
	children?: ReactNode;
}

const ProjectTagList: FC<Props> = ({children}) => {
	const childrenArray = Children.toArray(children);

	const middleIndex = Math.ceil(childrenArray.length / 2);
	const firstRow = childrenArray.slice(0, middleIndex);
	const secondRow = childrenArray.slice(middleIndex);

	const renderRow = (row: ReactNode[]) => (
		<ul className="flex gap-x-2">{row.map(child => child)}</ul>
	);

	return (
		<div className="flex flex-col gap-y-3 overflow-x-auto">
			{renderRow(firstRow)}
			{secondRow.length !== 0 ? renderRow(secondRow) : null}
		</div>
	);
};

export default ProjectTagList;
