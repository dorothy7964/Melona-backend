import { prisma } from "../../../generated/prisma-client";

export default {
    Contents: {
        user: ({ id }) => prisma.contents({ id }).user(),
        post: ({ id }) => prisma.contents({ id }).post(),
        category: ({ id }) => prisma.contents({ id }).category(),
        contentsReqs: ({ id }) => prisma.contents({ id }).contentsReqs()
    }
};