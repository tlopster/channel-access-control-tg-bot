import Express from "../../express/core";
import { QiwiUtils } from "../../utils/core";
import Qiwi from "../../QIWI/core";
import DB from "../../DB/core";

Express.app.post("/qiwi.event", async (req, res) => {
	const qiwi = Qiwi.master.getQIWI();
	const closeConnection = async () => {
		res.status(200).send(`OK`);
		res.end();
	}; 
	const check = true; // qiwi.checkNotificationSignature(req.headers['x-api-signature-sha256'], req.body, DB.config.qiwi.options.token);
	if(check === true) {
		if(req.body.bill.customFields.user && req.body.bill.billId) {
			await QiwiUtils.givePayment(Number(req.body.bill.customFields.user), Number(req.body.bill.customFields.time), { billId: req.body.bill.billId, notify: req.body.bill.customFields.notify ? JSON.parse(req.body.bill.customFields.notify) : [] }).catch( () => {null});
			await closeConnection();
		} else {
			await closeConnection();
		}
	} else {
		await closeConnection();
	}
})