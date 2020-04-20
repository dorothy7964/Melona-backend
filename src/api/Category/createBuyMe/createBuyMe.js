import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        createBuyMe: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { location, lastDate, categoryText } = args;
            
            try {
                const post = await prisma.createPost({
                    user: { connect: { id: user.id } },
                    anotherPage: true,
                    location,
                    lastDate
                });

                return await prisma.createCategory({
                    text: categoryText,
                    post: {
                        connect: {
                            id: post.id
                        }
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
    }
};