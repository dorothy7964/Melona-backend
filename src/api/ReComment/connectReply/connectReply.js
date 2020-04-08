import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        connectReply: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { commentId, text } = args;

            try {
                await prisma.createReComment({
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    comments: {
                        connect: {
                            id: commentId
                        }
                    },
                    text
                });
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
};