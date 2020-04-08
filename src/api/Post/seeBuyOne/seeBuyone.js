import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeBuyOne: (_, args) => {
            const { postId } = args;

           return prisma.post({
                id: postId    
            });
        }
    }
};