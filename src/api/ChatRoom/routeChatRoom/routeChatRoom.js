import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        routeChatRoom: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { userName } = args;

            try {
                const chat = await prisma.chatRooms({
                    where: {
                        participants_every: {
                            userName_in: [
                                userName,
                                user.userName
                            ]
                        }
                    }
                });

                const chatRoom = await prisma.chatRoom({
                    id: chat[0].id
                });

                return chatRoom.id;
            } catch (e) {
                return "none";
            }
        }
    }
};