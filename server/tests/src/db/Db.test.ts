import {Db, NotificationChannel} from "#src/db";
import {Notification, Pool, PoolClient} from "pg";
import {Mock} from "vitest";

vi.mock("pg", () => {
	const pool = {connect: vi.fn()};

	return {Pool: vi.fn(() => pool)};
});

vi.mock("#src/config", () => ({
	env: {
		POSTGRES_HOST: "localhost",
		POSTGRES_USER: "user",
		POSTGRES_PASSWORD: "password",
		POSTGRES_DATABASE: "database",
		POSTGRES_PORT: 5432
	}
}));

let pool: Pool;
let client: PoolClient;

beforeEach(async () => {
	pool = new Pool();
	client = {
		on: vi.fn(),
		query: vi.fn(),
		release: vi.fn()
	} as unknown as PoolClient;
	(pool.connect as Mock).mockResolvedValue(client);
});

afterEach(async () => {
	vi.clearAllMocks();
});

describe("getClient", () => {
	it("should call connect on pool and return the client", async () => {
		const result = await Db.getClient();
		expect(pool.connect).toHaveBeenCalled();
		expect(result).toBe(client);
	});
});

describe("listenNotifications", () => {
	it("should set up notification listeners on the client and call the correct callback", async () => {
		const onProjectMessageInsert = vi.fn();
		const notificationPayload = "123";

		await Db.listenNotifications(client, {onProjectMessageInsert});

		const channels = Object.values(NotificationChannel);
		channels.forEach(c => {
			expect(client.query).toHaveBeenCalledWith(`LISTEN ${c};`);
		});

		const notification: Notification = {
			channel: NotificationChannel.PROJECT_MESSAGE_INSERT,
			payload: notificationPayload,
			processId: 0
		};
		(client.on as Mock).mock.calls[0][1](notification);

		expect(onProjectMessageInsert).toHaveBeenCalledWith(notificationPayload);
	});

	it("should not call any callback if payload is missing", async () => {
		const onProjectMessageInsert = vi.fn();

		await Db.listenNotifications(client, {onProjectMessageInsert});

		const notification: Notification = {
			channel: NotificationChannel.PROJECT_MESSAGE_INSERT,
			processId: 0
		};
		(client.on as Mock).mock.calls[0][1](notification);

		expect(onProjectMessageInsert).not.toHaveBeenCalled();
	});

	it("should not call onProjectMessageInsert if channel doesn't match", async () => {
		const onProjectMessageInsert = vi.fn();

		await Db.listenNotifications(client, {onProjectMessageInsert});

		const notification: Notification = {
			channel: "someOtherChannel",
			payload: "123",
			processId: 0
		};
		(client.on as Mock).mock.calls[0][1](notification);

		expect(onProjectMessageInsert).not.toHaveBeenCalled();
	});
});
