import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        editPhotoGroupRoom: async(_, args) => {
            const { groupRoomId, coverPhoto } = args;
            
            try {
                await prisma.updateGroupRoom({
                    data: {
                        coverPhoto
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