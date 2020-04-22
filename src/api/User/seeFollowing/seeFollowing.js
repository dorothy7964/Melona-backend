import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFollowing: async(_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            
            const following = await prisma.user({ 
                id: user.id 
            }).following();

            return prisma.users({
                where: {
                    id_in: [...following.map(user => user.id)]
                }
            });
        }
    }
};