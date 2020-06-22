import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        trueApply: async (_, args, { request, isAuthenticated }) => {
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
                    return true;
                } else {
                    const apply = await prisma.createApply({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    });
                    await prisma.updateApply({
                        data: { 
                            apply: true,
                            applyWait: true
                        },
                        where: { id: apply.id }
                    });
                }
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
};