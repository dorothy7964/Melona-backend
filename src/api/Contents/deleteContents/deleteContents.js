import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        deleteContents: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { postId } = args;

            const filterOptions = {
                AND: [
                    { user: { id: user.id } },
                    { category: {
                            post: { id: postId }
                        }
                    }
                ]
            };

            try {
                const existingCntents = await prisma.$exists.contents(filterOptions);

                if (existingCntents){
                    const contents = await prisma.contentses({
                        where: filterOptions
                    });
                    
                    contents.forEach(
                        async content =>
                            await prisma.deleteContents({
                                id: content.id
                            })
                    );
                    return true;
                } else {
                    console.log("Contents 가 존재하지 않음");
                    return false;
                } 
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};