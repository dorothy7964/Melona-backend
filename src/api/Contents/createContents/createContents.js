import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createContents: async(_, args) => {
            const { postId, categoryText, contentText } = args;
            
            const category = await prisma.createCategory({
                post: {
                    connect: {
                        id: postId
                    }
                },
                text: categoryText
            });
            return await prisma.createContents({
                category: {
                    connect: {
                        id: category.id
                    }
                },
                text: contentText
            });
        }
    }
};