import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        addUserMember: (_, args) => {
            const { groupMemberId, userNameArr } = args;
            
            try {
                userNameArr.forEach(
                    async userName =>
                        await prisma.updateGroupRoomMember({
                            data: {
                                participants: {
                                    connect: {
                                        userName
                                    }
                                }
                            },
                            where: {
                                id: groupMemberId
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