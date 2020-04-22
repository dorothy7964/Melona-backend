import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleFollow: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { userName } = args;
            
            try {
                const existingFollow = await prisma.$exists.user({
                    AND: [
                        { userName: user.userName} ,
                        { following_some: { userName } }
                    ]
                });
                if (existingFollow) {
                    await prisma.updateUser({
                        where: { userName: user.userName },
                        data: {
                            following: {
                                disconnect: {
                                    userName
                                }
                            }
                        }
                    });
                } else {
                    await prisma.updateUser({
                        where: { userName: user.userName },
                        data: {
                            following: {
                                connect: {
                                    userName
                                }
                            }
                        }
                    });
                }
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
};