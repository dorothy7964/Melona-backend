import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../generateToken";
import { passwordMatch } from "../../../passwordMatch";

 export default {
    Mutation: {
        confirmPassword: async (_, args) => {
            const { email, password } = args;
            const user = await prisma.user({ email });
            if (!user){
                throw Error("유저가 없습니다.");
            }
            const passwordConfirm = await passwordMatch(password, user.password);
            if (!passwordConfirm){
                throw Error("비밀번호가 틀립니다.");
            }

            return generateToken(user.id);
        }
    }
};