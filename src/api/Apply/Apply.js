import { prisma } from "../../../generated/prisma-client";

export default {
    Apply: {
        user: ({ id }) => prisma.apply({ id }).user(),
        post: ({ id }) => prisma.apply({ id }).post()
    }
};