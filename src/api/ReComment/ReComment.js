import { prisma } from "../../../generated/prisma-client";

export default {
    ReComment: {
        user: ({ id }) => prisma.reComment({ id }).user()
    }
};