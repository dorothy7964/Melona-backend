import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        toggleViewApply: async(_, args) => {
            const { postId } = args;
            
            try {
                const post = await prisma.$exists.post({
                    AND: [
                        { id: postId },
                        { viewApply: true }
                    ]
                });

                if (post) {
                    await prisma.updatePost({
                        data: {
                            viewApply: false
                        },
                        where: {
                            id: postId
                        }
                    });
                } else {
                    await prisma.updatePost({
                        data: {
                            viewApply: true
                        },
                        where: {
                            id: postId
                        }
                    });
                }
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};