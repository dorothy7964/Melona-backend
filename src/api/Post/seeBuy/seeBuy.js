import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuy: (_, __) => {

            return prisma.posts({
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