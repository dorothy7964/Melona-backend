import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuyGroup: (_, args) => {
            const { groupRoomId } = args;

            return prisma.posts({
                where: {
                    anotherPage_not: true,
                    groupRoom: groupRoomId
                },
                orderBy: "lastDate_DESC"
            });
        }
    }
};