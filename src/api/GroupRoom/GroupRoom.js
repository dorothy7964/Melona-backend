import { prisma } from "../../../generated/prisma-client";

export default {
    GroupRoom: {
        participants: ({ id }) => prisma.groupRoom({ id }).participants()
    }
};