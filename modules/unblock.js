const { MessageType } = require("@adiwajshing/baileys");
const Reply =require("../lib/db.js").unblock;

module.exports = {
    name: "unblock",
    description: Reply.DESCRIPTION,
    extendedDescription: Reply.EXTENDED_DESCRIPTION,
    demo: {isEnabled: false},
    async handle(client, chat, BotsApp, args) {
        var JID = "";
        var jidNumber;
    
        if (args.length > 0) {
            if (isNaN(args[0]) || args[0][0] === "+") {
                if (args[0][0] === "@" || args[0][0] === "+") {
                    jidNumber = args[0].substring(1, args[0].length + 1);
                } else {
    
                    client.sendMessage(
                        BotsApp.chatId,
                        Reply.NUMBER_SYNTAX_ERROR, MessageType.text
                    );
                    return;
                }
            } else {
                jidNumber = args[0];
            }
            if (jidNumber.length < 10 || jidNumber.length > 13) {
                client.sendMessage(
                    BotsApp.chatId,
                    Reply.NUMBER_SYNTAX_ERROR,
                    MessageType.text
                );
                return;
            } else if (jidNumber.length === 10) {
                jidNumber = "91" + jidNumber;
            }
            JID = jidNumber + "@s.whatsapp.net";
        } else if (!BotsApp.isGroup) {
            JID = BotsApp.chatId;
            jidNumber = JID.substring(0, JID.indexOf("@"));
        } else {
            if (BotsApp.isReply) {
                JID =
                    chat.message.extendedTextMessage
                    .contextInfo.participant;
    
                jidNumber = JID.substring(0, JID.indexOf("@"));
            } else {
                client.sendMessage(
                    BotsApp.chatId,
                    Reply.MESSAGE_NOT_TAGGED,
                    MessageType.text
                );
                return;
            }
        }
    
        client.blockUser(JID, "remove");
        console.log(
            "Command to remove " +
            " " +
            jidNumber +
            " from blockList successfully executed"
        );
    
        client.sendMessage(
            BotsApp.chatId,
            "```" + jidNumber + " has been unblocked successfully.```",
            MessageType.text
        );
    },
};