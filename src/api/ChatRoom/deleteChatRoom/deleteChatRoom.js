import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deleteChatRoom: (_, args) => {
            const { chatRoomId } = args;

            return prisma.deleteChatRoom({
                id: chatRoomId
            });
        } 
    }
};