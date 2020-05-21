import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        progressNum: async(_, args) => {
            const { contentId, anotherPage, stepNum } = args;

            try {
                if (anotherPage){
                    await prisma.updateContentsReq({
                        data: {
                            confirmProgress: stepNum
                        },
                        where: {
                            id: contentId
                        }
                    });
    
                    return true;
                } else {
                    await prisma.updateContents({
                        data: {
                            confirmProgress: stepNum
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