import fetchApiWithAuth from "./fetchApiWithAuth";

type Response = {success: boolean};

const requestAccountDeletion = async (): Promise<Response> => {
	const response = await fetchApiWithAuth("/users/account", {
		method: "DELETE",
		cache: "no-store"
	});
	return response.json();
};

export default requestAccountDeletion;
