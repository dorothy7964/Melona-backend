import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editAvatar: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { avatar } = args;

           try {
                return prisma.updateUser({
                    where: { id: user.id },
                    data: { 
                        avatar
                    }
                });
           } catch (e) {
               console.log(e);
           }
        }
    }
};