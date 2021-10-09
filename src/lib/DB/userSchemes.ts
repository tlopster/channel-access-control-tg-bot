import { createSchema, Type } from "ts-mongoose";

const entityTypes = [ "user", "bill" ];

const user = createSchema(
	{
		id: Type.number({ required: true, unique: true }),
		admin: Type.number({ required: true }),
		access: Type.object({ required: true }).of({
			be: Type.boolean({ required: true }),
			notify: Type.array({ required: true }).of(Type.number()),
			time: Type.number({ required: true }),
			unlimit: Type.boolean({ required: true })
		})
	},
	{
		versionKey: false,
		minimize: false,
	},
);

const bill = createSchema(
	{
		value: Type.string({ required: true, unique: true }),
	},
	{
		versionKey: false,
		minimize: false,
	},
);

export default { user, bill };
