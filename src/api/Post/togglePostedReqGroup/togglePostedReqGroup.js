import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        togglePostedReqGroup: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { groupRoomId, tab } = args;

            if (tab === "daddy") {
                return prisma.posts({
                    where: {
                       AND: [
                            { applys_some: {
                                user: {
                                    id: user.id
                                }
                            }},
                            { anotherPage: false },
                            { groupRoom: groupRoomId }
                       ]
                    },
                    orderBy: "lastDate_DESC"
                });
            } else {
                return prisma.posts({
                    where: {
                       AND: [
                            { applys_some: {
                                user: {
                                    id: user.id
                                }
                            }},
                            { anotherPage: true },
                            { groupRoom: groupRoomId }
                       ]
                    },
                    orderBy: "lastDate_DESC"
                });
            }
        }
    }
};

            