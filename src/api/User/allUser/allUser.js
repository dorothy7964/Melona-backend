import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        allUser: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;

            return prisma.users({
               where: {
                   OR: [
                       { id_not_in: user.id },
                       { id_in: user.id }
                   ]
               },
                orderBy: "createdAt_DESC"
            });
        }
    }
};