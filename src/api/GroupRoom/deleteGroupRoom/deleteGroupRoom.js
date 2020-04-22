import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        deleteGroupRoom: async(_, args) => {
            const { groupRoomId } = args;
            
            try {
                await prisma.deleteGroupRoom({
                    id: groupRoomId
                });

                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};