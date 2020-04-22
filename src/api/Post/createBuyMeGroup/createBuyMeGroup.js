import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createBuyMeGroup: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { groupRoomId, location, lastDate, categoryText, contentText } = args;
            
            try {
                const post = await prisma.createPost({
                    user: { connect: { id: user.id } },
                    anotherPage: true,
                    location,
                    lastDate,
                    groupRoom: groupRoomId
                });

                const category = await prisma.createCategory({
                    text: categoryText,
                    post: {
                        connect: {
                            id: post.id
                        }
                    }
                });

                return prisma.createContents({
                    category: {
                        connect: {
                            id: category.id
                        }
                    },
                    text: contentText
                })
            } catch (e) {
                console.log(e);
            }
        }
    }
};