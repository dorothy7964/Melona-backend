import { prisma } from "../../../generated/prisma-client";

export default {
    ContentsReq: {
        user: ({ id }) => prisma.contentsReq({ id }).user(),
        contents: ({ id }) => prisma.contentsReq({ id }).contents()
    }
};