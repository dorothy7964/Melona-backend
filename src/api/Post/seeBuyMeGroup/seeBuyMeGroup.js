import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuyMeGroup: (_, args) => {
            const { groupRoomId, items, pageNumber } = args;

            return prisma.posts({
                first: items,
                skip: pageNumber,
                where: {
                    anotherPage: true,
                    groupRoom: groupRoomId
                },
                orderBy: "lastDate_DESC"
            });
        }
    }
};