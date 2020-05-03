import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        addUserMember: (_, args) => {
            const { groupMemeberId, userName } = args;
            
            try {
                userName.forEach(
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
                                id: groupMemeberId
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