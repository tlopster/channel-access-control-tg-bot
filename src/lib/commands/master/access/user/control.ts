import { UserCommand } from "../../../utils/core";
import { utilites } from "../../../../utils/core";
import DB from "../../../../DB/core";
import Qiwi from "../../../../QIWI/core";

interface IObjectPrice {
	time: number,
	price: number,
	notify: number[]
}

new UserCommand(/^доступ(?:\s(.*))?$/i, async (ctx) => {
	if(ctx.state.args[1]) {
		let num = ctx.state.args[1];
		if(Number(num)) {
			num = Number(num);
			if(num === 1 || DB.config.prices.limited[num - 2]) {
				const qiwi = Qiwi.master.getQIWI();
				const sum = num === 1 ? DB.config.prices.forever : DB.config.prices.limited[num - 2].price;

				const QIWISettings = {
					amount: Number(sum),
					currency: "RUB",
					billId: qiwi.generateId(),
					comment: "",
					customFields: {
						user: ctx.from.id,
						time: num === 1 ? 0 : DB.config.prices.limited[num - 2].time,
						notify: num === 1 ? "[]" : JSON.stringify(DB.config.prices.limited[num - 2].notify)
					}
				}
				let qiwiBill = await qiwi.createBill(QIWISettings.billId, QIWISettings)
				return ctx.reply("Ваша ссылка на оплату: " + qiwiBill.payUrl + "\n" + "\n" + "Товар приходит автоматически после оплаты.");
			} else {
				ctx.reply(`Неверный номер товара!`)
			}
		} else {
			ctx.reply(`Неверный номер товара!`)
		}
	} else {
		let list: string = "";
		DB.config.prices.limited.forEach((x: IObjectPrice) => {
			list += `\n${Number(DB.config.prices.limited.indexOf(x)) + 2}). ${utilites.displayTime(x.time)} - ${x.price}₽`
		});
		ctx.reply(`Цены:\n\n1). Навсегда - ${DB.config.prices.forever}₽${list}\n\nПокупка - "доступ [номер товара]"${ctx.state.user.access.be === true ? ctx.state.user.access.unlimit === true ? "\n\nОсталось времени: безлимит." : "\n\nОсталось времени: " + utilites.displayTime(ctx.state.user.access.time) : ""}`);
	}
})