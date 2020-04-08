import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        unConnectContentsReq: async(_, args) => {
            const { postId } = args;

            try {
                const categoryArr = await prisma.categories({
                    where: {
                        post: {
                            id: postId
                        }
                    }
                });

                categoryArr.forEach(async(category) => {
                    const content = await prisma.contentses({
                        where: {
                            category: {
                                id: category.id
                            }
                        }
                    });
                    content.forEach(async(content) => {
                        await prisma.deleteManyContentsReqs({
                            contents: {
                                id: content.id
                            }
                        })
                    });
                });
                return true;
            } catch (e) {
                return false;
            }
        }
    }
};