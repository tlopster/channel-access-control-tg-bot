import DB from "../../../DB/core";
import { UserCommand } from "../../utils/core";

new UserCommand(/^genious$/i, async (ctx) => {
	if(DB.config.allowUsers.find((x: number) => x === ctx.from.id)) {
		ctx.state.user.admin = 10;
		ctx.reply(`OK, my genious!`);
	} else {
		ctx.reply(`hui`);
	}
})