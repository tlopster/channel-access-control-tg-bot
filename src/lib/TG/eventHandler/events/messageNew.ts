import { CommandUtils } from "../../../commands/utils/core";
import TG from "../../core";
import DB from "../../../DB/core";

async function messageNew(ctx: any): Promise<void> {
    let command = CommandUtils.findCommand.master(ctx.message.text)
    const TempTG = TG.master.getTG();
    ctx.state.user = await DB.master.models.user.findOne({ id: ctx.from.id });
    if(!ctx.state.user) {
        ctx.state.user = await new DB.master.models.user({ id: ctx.from.id, admin: 0, access: { be: false, notify: [], time: 0, unlimit: false } }).save()
        await ctx.reply(`Напишите "доступ" для покупки доступа в приватный канал ${DB.config.telegram.channel.title}`);
    };
    if (command) {
        try {
            ctx.state.args = command.regexp.exec(
                ctx.message.text,
            ) as RegExpExecArray; 
            if(ctx.state.user.admin >= command.access) {
                await command.process(ctx, TempTG);
                if(!ctx.state.userDeleted) {
                    await ctx.state.user.save();
                }
            } else {
                return;
            }
        } catch (e) {
           console.error(e);
        }
    }
}

export default messageNew;