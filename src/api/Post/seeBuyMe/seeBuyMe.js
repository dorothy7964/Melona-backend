import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuyMe: (_, __) => {

            return prisma.posts({
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