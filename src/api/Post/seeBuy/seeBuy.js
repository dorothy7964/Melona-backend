import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuy: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;

           return prisma.posts({
                where: {
                    anotherPage_not: true
                },
                orderBy: "lastDate_DESC"
            });
        }
    }
};