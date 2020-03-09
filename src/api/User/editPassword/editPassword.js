import { prisma } from "../../../../generated/prisma-client";
import { hashPassword } from "../../../passwordMatch";

export default {
    Mutation: {
        editPassword: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { password } = args;
            const { user } = request;
            
            try {
                const hsPassword = await hashPassword(password, 5)
                await prisma.updateUser({
                    data: { password: hsPassword }, 
                    where: { id: user.id } 
                });
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
            
        }
    }
};