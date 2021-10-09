import express from "express";
import bodyParser from "body-parser";

type TRequestProcess = (
    req: any,
    res: any
) => Promise<unknown> | Promise<void> | void;

interface IRequestList {
	requestType: "post" | "get" | "put",
	url: string,
	process: TRequestProcess
}

class Express {

	public app = express();

	public async start(port: number): Promise<any> {
		this.app.listen(port, () => {
			return true;
		});
	}
};

const expressDefault = new Express();

expressDefault.app.use(bodyParser.json())
expressDefault.app.use(bodyParser.urlencoded({ extended: true }));

export default expressDefault;