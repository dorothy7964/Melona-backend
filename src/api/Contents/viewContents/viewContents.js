import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        viewContents: (_, args) => {
            const { categoryId, userName } = args;

            try {
                return prisma.contentses({
                    where: {
                        AND: [
                            {category: {
                                    id: categoryId
                                }
                            },
                            {contentsReqs_some: {
                                    user: { userName }
                                }
                            }
                        ]
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
};