import { prisma } from "../../../generated/prisma-client";

export default {
    Comment: {
        user: ({ id }) => prisma.comment({ id }).user(),
        post: ({ id }) => prisma.comment({ id }).post(),
        recomments: ({ id }) => prisma.comment({ id }).recomments(),
        reCommentCount: parent =>
            prisma
            .reCommentsConnection({
                where: { comments: { id: parent.id } }
            })
            .aggregate()
            .count(),
    }
};