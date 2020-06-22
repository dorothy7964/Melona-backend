import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        falseApply: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { postId } = args;

            const filterOptions = {
                AND: [
                    { user: {id: user.id} },
                    { post: {id: postId} }
                ]
            };

            try {
                const existingApply = await prisma.$exists.apply({
                    AND: [
                        { user: {id: user.id} },
                        { post: {id: postId} }
                    ]
                });
                
                if (existingApply) {
                    await prisma.deleteManyApplies(filterOptions);
                } else {
                   return false;
                }
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
};