import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        allGroupRoom: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            
            return prisma.groupRooms({
                where: {
                    participants_some: {
                        userName: user.userName
                    }
                },
                orderBy: "createdAt_DESC"
            })
        }
    }
};