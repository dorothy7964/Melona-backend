import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deleteComment: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { commentId } = args;
            
            try {
                await prisma.deleteManyComments({
                    AND: [
                        { id: commentId },
                        { user: {
                            id: user.id
                        }}
                    ]
                });
                return true;
            } catch (error) {
                console.log(e);
                return false;
           } 
        }
    }
};