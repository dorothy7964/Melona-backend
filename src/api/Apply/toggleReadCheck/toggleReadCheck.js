import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleReadCheck: async (_, args) => {
            const { applyId } = args;

            try {
                const apply = await prisma.$exists.apply({
                    AND: [
                        { id: applyId },
                        { readCheck: true }
                    ]
                });

                if (apply) {
                    await prisma.updateApply({
                        data: {
                            readCheck: false,
                            applyWait: false
                        },
                        where: {
                            id: applyId
                        }
                    });
                } else {
                    await prisma.updateApply({
                        data: {
                            readCheck: true,
                            applyWait: false
                        },
                        where: {
                            id: applyId
                        }
                    });
                }
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
};