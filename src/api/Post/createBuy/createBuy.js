import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createBuy: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { location, lastDate, categoryText} = args;
            
            const post = await prisma.createPost({
                user: { connect: { id: user.id } },
                location,
                lastDate
            });

            categoryText.forEach(
                async text =>
                    await prisma.createCategory({
                        text,
                        post: {
                            connect: {
                                id: post.id
                            }
                        }
                    })
            );

            return post;
        }
    }
};