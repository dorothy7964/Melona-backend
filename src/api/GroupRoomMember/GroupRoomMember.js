import { prisma } from "../../../generated/prisma-client";

export default {
    GroupRoomMember: {
        participants: ({ id }) => prisma.groupRoomMember({ id }).participants(),
        groupRoom: ({ id }) => prisma.groupRoomMember({ id }).groupRoom(),
    }
};