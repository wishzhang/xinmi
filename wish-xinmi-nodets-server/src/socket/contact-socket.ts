import contactService = require("../service/contact-service");

export = (emit: any) => {
    return {
        async emitContactAddContact(originUserId: string, targetUserId: string) {
            const num = await contactService.getContactWarnNum(targetUserId);
            emit("contact-add-contact", {
                originUserId,
                targetUserId,
                data: num
            });
        }
    };
}