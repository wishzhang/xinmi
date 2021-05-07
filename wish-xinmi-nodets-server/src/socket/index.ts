import contactSocket = require("./contact-socket");
import messageSocket = require("./message-socket");
import userService = require("../service/user-service");

const hashSocketId: any = {};
let io: any = {};

const emit = async (
    emitName: string,
    obj: { originUserId: string, targetUserId: string, data: any }
) => {
    const targetUser = await userService.getOneUser(obj.targetUserId);
    const originUser = await userService.getOneUser(obj.originUserId);

    console.log(`${originUser.username}向${targetUser.username}发送消息：` + JSON.stringify(obj.data));

    const socketId = hashSocketId[targetUser.username];
    if (socketId) {
        const s = io.to(socketId);
        s.emit(emitName, obj.data);
    }
};

export = {
    init: (server: any) => {
        const options = {
            cors: {
                "origin": /.*/ig,
                "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
                credentials: true,
            }
        };

        io = require("socket.io")(server, options);

        io.on("connection", (socket: any) => {

            socket.on("sessionOff", (obj: any) => {
                console.log(`下线：${obj.account}`);
                delete hashSocketId[obj.account];
            });

            socket.on("sessionOn", (obj: any) => {
                console.log(`上线：${obj.account}`);
                hashSocketId[obj.account] = socket.id;
            });
        });
    },
    ...contactSocket(emit),
    ...messageSocket(emit),
}
