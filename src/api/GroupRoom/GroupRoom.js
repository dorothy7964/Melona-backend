import { prisma } from "../../../generated/prisma-client";

export default {
    GroupRoom: {
        groupRoomMember: ({ id }) => prisma.groupRoom({ id }).groupRoomMember(),
        founderUser: ({ id }) => prisma.groupRoom({ id }).founderUser(),
    }
};