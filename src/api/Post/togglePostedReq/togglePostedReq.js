import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        togglePostedReq: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { tab } = args;

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
                            { groupRoom: "none" }
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
                            { groupRoom: "none" }
                       ]
                    },
                    orderBy: "lastDate_DESC"
                });
            }
        }
    }
};

            