import {ApiResponseWithPagination, ProjectMessageFromApi} from "../../types";

type FetchProjectMessagesResponseData = ProjectMessageFromApi[];
type FetchProjectMessagesResponse =
	ApiResponseWithPagination<FetchProjectMessagesResponseData>;

export type {FetchProjectMessagesResponse};
