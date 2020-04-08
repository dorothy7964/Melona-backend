import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        redeleteComment: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { recommentId } = args;
            
            try {
                await prisma.deleteManyReComments({
                    AND: [
                        { id: recommentId },
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