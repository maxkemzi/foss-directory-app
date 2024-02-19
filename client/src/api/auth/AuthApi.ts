import ApiFetcher from "../ApiFetcher";
import {
	LoginBody,
	LoginResponse,
	LogoutResponse,
	RefreshResponse,
	SignupBody,
	SignupResponse
} from "../types";

class AuthApi {
	private static fetcher = new ApiFetcher("/auth");

	static async logIn(body: LoginBody): Promise<LoginResponse> {
		const response = await this.fetcher.fetch("/login", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body),
			cache: "no-store"
		});
		return response.json();
	}

	static async signUp(body: SignupBody): Promise<SignupResponse> {
		const response = await this.fetcher.fetch("/signup", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body),
			cache: "no-store"
		});
		return response.json();
	}

	static async refresh(refreshToken: string): Promise<RefreshResponse> {
		const response = await this.fetcher.fetch("/refresh", {
			method: "POST",
			headers: {Cookie: `refreshToken=${refreshToken}`},
			cache: "no-store"
		});
		return response.json();
	}

	static async logOut(refreshToken: string): Promise<LogoutResponse> {
		const response = await this.fetcher.fetch("/logout", {
			method: "POST",
			headers: {Cookie: `refreshToken=${refreshToken}`},
			cache: "no-store"
		});
		return response.json();
	}
}

export default AuthApi;
