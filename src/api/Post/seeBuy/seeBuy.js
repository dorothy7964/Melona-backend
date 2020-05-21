import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuy: (_, args) => {
            const { items, pageNumber } = args;

            return prisma.posts({
                first: items,
                skip: pageNumber,
                where: {
                    AND: [
                        { anotherPage_not: true },
                        { groupRoom: "none" }
                    ]
                },
                orderBy: "lastDate_DESC"
            });
        }
    }
};