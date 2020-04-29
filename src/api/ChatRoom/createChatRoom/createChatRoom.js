import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createChatRoom: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { userName } = args;

            const now = new Date();
            if (userName === user.userName) { 
                throw Error("self User"); 
            }
            
            const seeRooms = await prisma.chatRooms({
                where: {
                    AND: [
                        { participants_some: { userName } },
                        { participants_some: { userName: user.userName} },
                    ]
                }
            });

            const existsRoom = seeRooms[0];
            if (existsRoom === undefined) {
                return prisma.createChatRoom({
                        participants: {
                            connect: [{ userName }, { userName: user.userName }]
                        },
                        lastMsgTime: now.toISOString(),
                    });
            } else {
                return prisma.chatRoom({ id: existsRoom.id });
            }
        } 
    }
};