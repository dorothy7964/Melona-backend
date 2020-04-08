import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        confirmCheckContentsReq: (_, args) => {
            const { contentId, userName } = args;

            try {
                return prisma.contentsReqs({
                    where:{
                        AND: [
                            { contents: {
                                id: contentId
                            }},
                            { user: {
                                userName
                            }}
                        ]
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
};