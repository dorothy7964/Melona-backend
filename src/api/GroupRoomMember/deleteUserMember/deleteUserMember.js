import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        deleteUserMember: (_, args) => {
            const { groupMemberId, userNameArr } = args;
            
            try {
                userNameArr.forEach(
                    async userName =>
                        await prisma.updateGroupRoomMember({
                            data: {
                                participants: {
                                    disconnect: {
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