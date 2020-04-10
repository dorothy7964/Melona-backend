import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        deletePost: async(_, args) => {
            const { postId } = args;
            
            try {
               await prisma.deletePost({
                   id: postId
               });
               return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};