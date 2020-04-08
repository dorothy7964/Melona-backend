import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        toggleContnetsReq: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { contentId } = args;

            const filterOptions = {
                AND: [
                    { contents: {
                        id: contentId
                    }},
                    { user: {
                        id: user.id
                    }}
                ]
            };

            try {
                const existsContentReq = await prisma.$exists.contentsReq(filterOptions);
                // contentsReq 의 id 가 존재 하는지
                if (existsContentReq){
                    const contentsReq = await prisma.contentsReqs({
                        where: filterOptions
                    });
                    // contentsReq 의 check Toggle
                    if(contentsReq[0].check === true) {
                        await prisma.updateContentsReq({
                            data: {
                                check: false
                            },
                            where: {
                                id: contentsReq[0].id
                            }
                        });
                    } else {
                        await prisma.updateContentsReq({
                            data: {
                                check: true
                            },
                            where: {
                                id: contentsReq[0].id
                            }
                        });
                    }
                } else {
                    await prisma.createContentsReq({
                        contents: {
                            connect: {
                                id: contentId,
                            }
                        },
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        check: true
                    });
                }
                return true;
            } catch (e) {
                return false;
            }
        }
    }
};