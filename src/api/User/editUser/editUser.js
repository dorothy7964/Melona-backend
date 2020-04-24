import { prisma } from "../../../../generated/prisma-client";
import { hashPassword } from "../../../passwordMatch";

export default {
    Mutation: {
        editUser: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { userName, email } = args;

           try {
                return prisma.updateUser({
                    where: { id: user.id },
                    data: { 
                        userName, 
                        email,
                    }
                });
           } catch (e) {
               console.log(e);
           }
        }
    }
};