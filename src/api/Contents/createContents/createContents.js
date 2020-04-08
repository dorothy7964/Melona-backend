import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createContents: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { text, categoryId } = args;

            try {
                await prisma.createContents({
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    category: {
                        connect: {
                            id: categoryId
                        }
                    },
                    text
                });
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
};