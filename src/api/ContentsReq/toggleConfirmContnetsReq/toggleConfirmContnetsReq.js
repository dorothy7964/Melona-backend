import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        toggleConfirmContnetsReq: async(_, args) => {
            const { contentReqId } = args;
       
            try {
                const confirmCheck = await prisma.$exists.contentsReq({
                    AND: [
                        { id: contentReqId},
                        { confirmCheck: true }
                    ]
                });

                if (confirmCheck){
                    await prisma.updateContentsReq({
                        data: {
                            confirmCheck: false
                        },
                        where: {
                            id: contentReqId
                        }
                    });
                } else {
                    await prisma.updateContentsReq({
                        data: {
                            confirmCheck: true
                        },
                        where: {
                            id: contentReqId
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