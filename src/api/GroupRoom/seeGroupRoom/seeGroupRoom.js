import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeGroupRoom: (_, args) => {
            const { groupRoomId } = args;
            
            try {
                return prisma.groupRoom({
                    id: groupRoomId
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
};