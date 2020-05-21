import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        togglePostedRes: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { tab, items, pageNumber } = args;

            if (tab === "daddy") {
                return prisma.posts({
                    first: items,
                    skip: pageNumber,
                    where: {
                       AND: [
                            { user: {
                               id: user.id
                            }},
                            { anotherPage: false },
                            { groupRoom: "none" }
                       ]
                    },
                    orderBy: "lastDate_DESC"
                });
            } else {
                return prisma.posts({
                    first: items,
                    skip: pageNumber,
                    where: {
                       AND: [
                            { user: {
                               id: user.id
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

            