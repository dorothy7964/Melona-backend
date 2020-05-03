import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        editGroupRoom: async(_, args) => {
            const { groupRoomId, coverPhoto, roomName } = args;
            
            try {
                await prisma.updateGroupRoom({
                    data: {
                        coverPhoto,
                        roomName
                    },
                    where: {
                        id: groupRoomId
                    }
                });

                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};