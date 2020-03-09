import { prisma } from '../../../../generated/prisma-client';
import { generatorSecret, sendSecretMail } from '../../../utils';
import { hashPassword } from "../../../passwordMatch";

export default {
    Mutation: {
        requestSecret: async(_, args) => {
            const { email } = args;
            const user = await prisma.user({ email });
            if (!user){
                throw Error("유저가 없습니다.");
            }

            const loginSecret = generatorSecret();
            try {
                sendSecretMail(email, loginSecret);
                const hsPassword = await hashPassword(loginSecret, 5)
                await prisma.updateUser({ 
                    data: { password: hsPassword }, 
                    where: { email } 
                });
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};