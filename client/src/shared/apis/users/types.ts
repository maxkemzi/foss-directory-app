import {ApiResponse} from "../types";

interface DeleteAccountResponseData {
	success: boolean;
}
type DeleteAccountResponse = ApiResponse<DeleteAccountResponseData>;

export type {DeleteAccountResponse};
