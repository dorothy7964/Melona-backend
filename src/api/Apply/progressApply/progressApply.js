import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        progressApply: async (_, args) => {
            const { postId, userName } = args;

            try {
                const apply = await prisma.applies({
                    where: {
                        AND: [
                            { post: {
                                id: postId
                            }},
                            { user: {
                                userName
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