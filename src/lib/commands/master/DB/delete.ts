import { AdminCommand } from "../../utils/core";

new AdminCommand(/^delete$/i, async (ctx) => {
	ctx.state.user.delete();
	ctx.state.userDeleted = true;
	return ctx.reply(`Вы удалены из базы!`)
})