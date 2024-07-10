vi.mock("#src/config", () => ({
	env: {
		PORT: 5000,
		POSTGRES_HOST: "postgres",
		POSTGRES_USER: "postgres",
		POSTGRES_PASSWORD: "password",
		POSTGRES_DATABASE: "foss_directory",
		POSTGRES_PORT: 5432,
		JWT_ACCESS_SECRET: "access",
		JWT_REFRESH_SECRET: "refresh",
		JWT_CSRF_SECRET: "csrf",
		JWT_EMAIL_SECRET: "email",
		ENCRYPTION_KEY:
			"23313013748128608529c4d6c0aed8a76ea6753f36721fd4e93b9208ebb8fee3",
		ENCRYPTION_IV: "9a92ebc974e960ec542b18b7f771a6fa",
		GITHUB_CLIENT_ID: "github_client_id",
		GITHUB_CLIENT_SECRET: "github_client_secret",
		PUBLIC_CLIENT_URL: "http://localhost:3000",
		PUBLIC_SERVER_URL: "http://localhost:5000",
		SMTP_HOST: "smtp_host",
		SMTP_PORT: 587,
		SMPT_USER: "smtp_user",
		SMTP_PASSWORD: "smtp_password"
	}
}));
