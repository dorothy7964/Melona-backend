import { prisma } from "../../../generated/prisma-client";

export default {
    ChatRoom: {
        participants: ({ id }) => prisma.chatRoom({ id }).participants(),
        messages: ({ id }) => prisma.chatRoom({ id }).messages(),
        unReadMsgCounter: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
              return prisma
                .messagesConnection({
                    where: {
                        AND: [
                            { chatRoom: { id: parentId } },
                            { to: { id: user.id } },
                            { readMessage: false }
                        ]
                    }
                })
              .aggregate()
              .count()
            } catch {
                return 0;
            }
        }
    }
};