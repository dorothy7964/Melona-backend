import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { userName, avatar } = args;
            const { user } = request;
            const exists = await prisma.$exists.user({
                userName
            });
            if (exists) {
                throw Error("이미 존재하는 이름 입니다.");
            }
            
            return prisma.updateUser({
                where: { id: user.id },
                data: { 
                    userName, 
                    avatar
                }
            });
        }
    }
};