import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        groupRooms: ({ id }) => prisma.user({ id }).groupRooms(),
        groupRoomMember: ({ id }) => prisma.user({ id }).groupRoomMember(),
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
        isFollowing: (parent, _, { request }) => {
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