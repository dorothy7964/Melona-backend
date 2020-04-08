import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        applyContents: (_, args) => {
            const { categoryId, userName } = args;

            return prisma.contentses({
               where: {
                   AND: [
                       { category: { id: categoryId } },
                       { user: { userName } }
                   ]
               } 
            });
        }
    }
};