import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        following: ({ id }) => prisma.user({ id }).following(),
        followers: ({ id }) => prisma.user({ id }).followers(),
        followingCount: ({ id }) =>
            prisma
            .usersConnection({ where: { followers_some: { id } } })
            .aggregate()
            .count(),
        followersCount: ({ id }) =>
            prisma
            .usersConnection({ where: { following_some: { id } } })
            .aggregate()
            .count(),
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [{
                        id: user.id
                    },{
                        following_some: {
                            id: parentId
                        }
                    
                    }]
                });
            } catch {
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
};