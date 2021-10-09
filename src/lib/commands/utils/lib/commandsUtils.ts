import { Telegraf } from "telegraf";

interface ICommandList {
    master: ICommand[]
}

interface ICommand {
    regexp: RegExp,
    access: number,
    process: TCommandProcess
}

type TCommandProcess = (
    ctx: any,
    tg: any
) => Promise<unknown> | Promise<void> | void;

class UserCommand {
    public regexp: RegExp;
    public access: number;
    public process: TCommandProcess;

    constructor(regexp: RegExp, process: TCommandProcess) {
        this.regexp = regexp;
        this.access = 0;
        this.process = process;

        manager.list.master.push(this);
    }
}

class AdminCommand {
    public regexp: RegExp;
    public access: number;
    public process: TCommandProcess;

    constructor(regexp: RegExp, process: TCommandProcess) {
        this.regexp = regexp;
        this.access = 1;
        this.process = process;

        manager.list.master.push(this);
    }
}

class CommandsManager {
    public list: ICommandList = { master: [] };

    public findCommand = {
        master: (text: string): ICommand | undefined => {
            return this.list.master.find((x) => x.regexp.test(text));
        }
    }
}

export { UserCommand, AdminCommand };

const manager = new CommandsManager();

export default manager;