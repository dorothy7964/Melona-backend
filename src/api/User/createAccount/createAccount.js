import { prisma } from '../../../../generated/prisma-client';
import { hashPassword } from "../../../passwordMatch";

export default {
    Mutation: {
        createAccount: async(_, args) => {
            const { email, userName, password, avatar } = args;
            const exists = await prisma.$exists.user({
                OR: [ { userName }, { email } ]
            });
            if (exists) {
                throw Error("This userName / email is already taken");
            }
            try {
                const hsPassword = await hashPassword(password, 5)
                await prisma.createUser({
                    email, 
                    userName, 
                    password: hsPassword, 
                    avatar
                });
                return true;   
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
};