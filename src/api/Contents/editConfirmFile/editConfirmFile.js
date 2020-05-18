import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        editConfirmFile: (_, args) => {
            const { contentId, confirmFile } = args;

            return prisma.updateContents({
                data: {
                    confirmFile
                },
                where: {
                    id: contentId
                } 
            });
        }
    }
};