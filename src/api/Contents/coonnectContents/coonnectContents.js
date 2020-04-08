import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        coonnectContents: async(_, args) => {
            const { postId, categoryText, ContentText } = args;
            
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
                text: ContentText
            });
        }
    }
};