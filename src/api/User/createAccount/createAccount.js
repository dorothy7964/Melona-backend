import { prisma } from '../../../../generated/prisma-client';
import bcrypt from "bcrypt";

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
                const hashePassword = await bcrypt.hash(password, 5);
                await prisma.createUser({
                    email, 
                    userName, 
                    password: hashePassword, 
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