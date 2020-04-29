import { prisma } from "../../../generated/prisma-client";

export default {
    Message: {
        chatRoom: ({ id }) => prisma.message({ id }).chatRoom(),
        from: ({ id }) => prisma.message({ id }).from(),
        to: ({ id }) => prisma.message({ id }).to(),
    }
};