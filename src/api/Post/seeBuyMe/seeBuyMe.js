import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuyMe: (_, args) => {
            const { items, pageNumber } = args;

            return prisma.posts({
                first: items,
                skip: pageNumber,
                where: {
                    AND: [
                        { anotherPage: true },
                        { groupRoom: "none" }
                    ]
                },
                orderBy: "lastDate_DESC"
            });
        }
    }
};