import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        editConfirmFile: async(_, args) => {
            const { contentId, confirmFile, anotherPage } = args;

            try {
                if (anotherPage) {
                    await prisma.updateManyContentsReqs({
                        data: {
                            confirmFile
                        },
                        where: {
                            id: contentId
                        }                 
                    });

                   return true;
                } else {
                    await prisma.updateContents({
                        data: {
                            confirmFile
                        },
                        where: {
                            id: contentId
                        } 
                    });

                    return true;
                }
            } catch (e) {
                console.log(e);
                return false;
            }
            
        }
    }
};