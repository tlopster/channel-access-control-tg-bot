/* eslint-disable require-jsdoc */
class UtilsError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = "RusAnonym Utils Error";
    }

    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }

    // eslint-disable-next-line jsdoc/require-example
    /**
     * @description Возвращает содержимое ошибки в JSON
     * @returns {Object} JSON состав ошибки
     */
    public toJSON(): Pick<this, keyof this> {
        const json = {} as Pick<this, keyof this>;

        for (const key of Object.getOwnPropertyNames(this)) {
            json[key as keyof this] = this[key as keyof this];
        }

        return json;
    }
}

export default UtilsError;
