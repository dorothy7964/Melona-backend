import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        deleteGroupRoom: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { groupRoomId } = args;
            
            try {
                const groupRoom = await prisma.groupRooms({
                    where: {
                        AND: [
                            { id: groupRoomId },
                            { founderUser: {
                                userName: user.userName
                            }}
                        ]
                    }
                });

                if (groupRoom.length === 0) {
                    return false;
                }

                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};