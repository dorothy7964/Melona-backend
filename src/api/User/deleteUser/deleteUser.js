import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deleteUser: async(_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            
            try {
                await prisma.deleteUser({
                    id: user.id
                });
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        } 
    }
};
