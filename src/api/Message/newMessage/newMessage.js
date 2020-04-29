import { prisma } from "../../../../generated/prisma-client";

export default {
    Subscription: {
        newMessage: {
            subscribe: (_, args) => {
                const { chatRoomId } = args;
                
                return prisma.$subscribe
                    .message({
                        AND: [
                            { mutation_in: "CREATED" },
                            {
                                node: {
                                    chatRoom: { id: chatRoomId }
                                }
                            }
                        ]
                    })
                    .node();
            },
            resolve: (payload, args, context) => {
                return payload;
            }
        }
    }
};