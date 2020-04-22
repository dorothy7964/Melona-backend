import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createBuyGroup: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { groupRoomId, location, lastDate, categoryText } = args;
            
            try {
                const post = await prisma.createPost({
                    user: { connect: { id: user.id } },
                    location,
                    lastDate,
                    groupRoom: groupRoomId
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
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};