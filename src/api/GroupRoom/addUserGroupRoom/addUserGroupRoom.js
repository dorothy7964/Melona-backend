import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        addUserGroupRoom: (_, args) => {
            const { groupRoomId, userName } = args;
            
            try {
                userName.forEach(
                    async userName =>
                        await prisma.updateGroupRoom({
                            data: {
                                participants: {
                                    connect: {
                                        userName
                                    }
                                }
                            },
                            where: {
                                id: groupRoomId
                            }
                        })
                )
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};