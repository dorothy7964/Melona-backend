import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuyMe: (_, __) => {

           return prisma.posts({
                where: {
                    anotherPage: true
                },
                orderBy: "lastDate_DESC",
                orderBy: "createdAt_DESC"
            });
        }
    }
};