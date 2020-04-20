import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        progressApplyMe: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { postId } = args;

            try {
                const apply = await prisma.applies({
                    where: {
                        AND: [
                            { post: {
                                id: postId
                            }},
                            { user: {
                                id: user.id
                            }}
                        ]
                    }
                });

                await prisma.updateApply({
                    data: {
                        progress: true
                    },
                    where: {
                        id: apply[0].id
                    }
                });
                
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
};