import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuy: (_, __) => {

            return prisma.posts({
                where: {
                    anotherPage_not: true
                },
                orderBy: "lastDate_DESC"
            });
        }
    }
};