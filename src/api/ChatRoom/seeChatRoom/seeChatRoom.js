import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeChatRoom: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { id } = args;

            const canSee = await prisma.$exists.chatRoom({
                participants_some: {
                    id: user.id
                }
            });

            if (canSee) {
                return prisma.chatRoom({ id });
            } else {
                throw Error("You can't see this");
            }
        }
    }
};