import { prisma } from '../../../../generated/prisma-client';
import { hashPassword } from "../../../passwordMatch";

export default {
    Mutation: {
        createAccount: async(_, args) => {
            const { email, userName, password, avatar } = args;
            
            const ExistUserName = await prisma.$exists.user({
                userName
            });
            const ExistEmail = await prisma.$exists.user({
                email
            });

            if (ExistUserName) {
                throw Error("이미 있는 이름 입니다.");
            } else if (ExistEmail) {
                throw Error("이미 있는 이메일 입니다.");
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