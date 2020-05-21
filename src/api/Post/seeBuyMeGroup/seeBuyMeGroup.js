import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuyMeGroup: (_, args) => {
            const { groupRoomId } = args;

            return prisma.posts({
                where: {
                    anotherPage: true,
                    groupRoom: groupRoomId
                },
                orderBy: "lastDate_DESC"
            });
        }
    }
};