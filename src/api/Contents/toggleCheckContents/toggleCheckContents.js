import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        toggleCheckContents : async(_, args) => {
            const { contentId } = args;

            try {
                const content = await prisma.$exists.contents({
                    AND: [
                        { id: contentId },
                        { check: true }
                    ]
                });

                if (content) {
                    await prisma.updateContents({
                        data: {
                            check: false
                        },
                        where: {
                            id: contentId
                        }
                    });
                } else {
                    await prisma.updateContents({
                        data: {
                            check: true
                        },
                        where: {
                            id: contentId
                        }
                    });
                }
                return true;
            } catch (e) {
                return false;
            }
        }
    }
};