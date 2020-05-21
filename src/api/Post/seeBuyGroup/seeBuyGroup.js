import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuyGroup: (_, args) => {
            const { groupRoomId, items, pageNumber } = args;

            return prisma.posts({
                first: items,
                skip: pageNumber,
                where: {
                    anotherPage_not: true,
                    groupRoom: groupRoomId
                },
                orderBy: "lastDate_DESC"
            });
        }
    }
};