import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuy: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;

           return prisma.posts({
                where: {
                    user: {
                        OR: [
                            { id_not_in: user.id },
                            { id_in: user.id }
                        ]
                    }
                },
                orderBy: "createdAt_DESC"
            });
        }
    }
};