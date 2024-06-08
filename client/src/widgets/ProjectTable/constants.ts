import {TableColumnData} from "#src/shared/ui";

const TableColumnKey = {
	NAME: "name",
	DESCRIPTION: "description",
	REPO_URL: "repoUrl",
	MEMBER_COUNT: "memberCount",
	ACTIONS: "actions"
};

const tableColumns: TableColumnData[] = [
	{key: TableColumnKey.NAME, text: "Name"},
	{key: TableColumnKey.DESCRIPTION, text: "Description"},
	{key: TableColumnKey.REPO_URL, text: "Url"},
	{key: TableColumnKey.MEMBER_COUNT, text: "Members"},
	{key: TableColumnKey.ACTIONS, text: "Actions"}
];

export {TableColumnKey, tableColumns};
