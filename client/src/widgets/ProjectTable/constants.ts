import {TableColumnData} from "#src/shared/ui";

const TableColumnKey = {
	NAME: "name",
	DESCRIPTION: "description",
	REPO_URL: "repoUrl",
	USER_COUNT: "userCount",
	ACTIONS: "actions"
};

const tableColumns: TableColumnData[] = [
	{key: TableColumnKey.NAME, text: "Name"},
	{key: TableColumnKey.DESCRIPTION, text: "Description"},
	{key: TableColumnKey.REPO_URL, text: "Url"},
	{key: TableColumnKey.USER_COUNT, text: "Users"},
	{key: TableColumnKey.ACTIONS, text: "Actions"}
];

export {TableColumnKey, tableColumns};
