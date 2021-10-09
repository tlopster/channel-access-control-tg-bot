import { typedModel } from "ts-mongoose";
import mongoose, { ConnectOptions } from "mongoose";

import config from "../../DB/config.json";

import userSchemes from "./userSchemes";

mongoose.Schema.Types.String.checkRequired((text) => text !== null);

const mongoDbAddress = `mongodb+srv://${config.MongoDB.address}/`;

const buildConnectionConfig = (dbName: string): ConnectOptions => {
	return {
		auth: {
			username: config.MongoDB.login,
			password: config.MongoDB.password,
		},
		authSource: "admin",
		dbName
	};
};

abstract class DB {
	abstract connection: unknown;
	abstract models: unknown;
	abstract schemes: unknown;
}

class UserDB extends DB {
	public connection = mongoose.createConnection(
		mongoDbAddress,
		buildConnectionConfig(config.MongoDB.name),
	);

	public models = {
		bill: typedModel(
			"bill",
			userSchemes.bill,
			"orderBills",
			undefined,
			undefined,
			this.connection,
		),
		user: typedModel(
			"user",
			userSchemes.user,
			"orderUsers",
			undefined,
			undefined,
			this.connection,
		)
	};

	public schemes = userSchemes;
}

class CoreDB {
	public readonly config = Object.freeze(config);

	public master = new UserDB();
}

const DataBase = new CoreDB();

export default DataBase;
