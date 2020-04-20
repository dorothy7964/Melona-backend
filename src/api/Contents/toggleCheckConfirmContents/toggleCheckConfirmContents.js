import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        toggleCheckConfirmContents : async(_, args) => {
            const { contentId } = args;

            try {
                const content = await prisma.$exists.contents({
                    AND: [
                        { id: contentId },
                        { confirmCheck: true }
                    ]
                });

                if (content) {
                    await prisma.updateContents({
                        data: {
                            confirmCheck: false
                        },
                        where: {
                            id: contentId
                        }
                    });
                } else {
                    await prisma.updateContents({
                        data: {
                            confirmCheck: true
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