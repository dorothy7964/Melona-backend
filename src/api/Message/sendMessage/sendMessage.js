import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { chatRoomId, message, userName } = args;

            let room;
            if (chatRoomId === undefined) {
                if (userName === user.userName) { throw Error("self User") }
                const seeRooms = await prisma.chatRooms({
                    where: {
                        AND: [
                            { participants_some: { userName }},
                            { participants_some: { userName: user.userName }},
                        ]
                    }
                });
                
                const existsRoom = seeRooms[0];
                if (existsRoom === undefined) {
                    room = await prisma.createChatRoom({
                        participants: {
                            connect: [{ userName }, { userName: user.userName}]
                        }
                    });
                } else {
                    room = await prisma.chatRoom({ id: existsRoom.id });
                }
            } else {
                room = await prisma.chatRoom({ id: chatRoomId })
            }

            if (!room) { throw Error("Room not found"); }

            const participants = await prisma.chatRoom({ id: room.id }).participants();
            const getTo = participants.find(
                participant => participant.userName !== user.userName
            ); 
                
            const result =  await prisma.createMessage({
                text: message,
                from: {
                    connect: {
                        userName: user.userName
                    }
                },
                to: {
                    connect: {
                        userName: chatRoomId ? getTo.userName : userName
                    }
                },
                chatRoom: {
                    connect: {
                        id: room.id
                    }
                }
            });
            
            // lastMsgTime, lastMessage
            const now = new Date();
            const update = prisma.updateManyChatRooms({
                where:  { id: room.id },
                data: { 
                    lastMsgTime: now.toISOString(),
                    lastMessage: message
                }
            });
            update.then(res => console.log("res",res));

            return result;
        }
    }
};