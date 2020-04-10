import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        togglePostedRes: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { tab } = args;

            if (tab === "daddy") {
                return prisma.posts({
                    where: {
                       AND: [
                            { user: {
                               id: user.id
                            }},
                            { anotherPage: false }
                       ]
                    },
                    orderBy: "lastDate_DESC"
                });
            } else {
                return prisma.posts({
                    where: {
                       AND: [
                            { user: {
                               id: user.id
                            }},
                            { anotherPage: true }
                       ]
                    },
                    orderBy: "lastDate_DESC"
                });
            }
        }
    }
};

            