import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        categoryContentsSelf: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { categoryId, anotherPage } = args;

            if (!anotherPage) {
                try {
                    return prisma.contentses({
                        where: {
                            AND: [
                                { category: { id: categoryId } },
                                {  user: { id: user.id } },
                                { confirmCheck: true }
                            ]
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    return prisma.contentses({
                        where: {
                            AND: [
                                { category: { id: categoryId } },
                                { contentsReqs_some: {
                                    user: {
                                        id: user.id
                                    }  
                                }},
                                { contentsReqs_some: {
                                    confirmCheck: true
                                }}
                            ]
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
};