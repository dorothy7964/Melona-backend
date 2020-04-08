import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeComment: async (_, args) => {
            const { postId } = args;
            
            return prisma.comments({
                where: {
                   post: { id: postId }
                }
            });
        }
    }
};