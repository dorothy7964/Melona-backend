import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            
            return prisma.users({
                where: {
                    id_not_in: [user.id]
                },
                orderBy: "createdAt_DESC"
            });
        }
    }
};