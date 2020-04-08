import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeApply: (_, args) => {
            const { applyId } = args;

            return prisma.applies({
                where: {
                    id: applyId
                }
            });
        }
    }
};