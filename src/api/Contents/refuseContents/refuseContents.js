import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        refuseContents: async(_, args) => {
            const { userName, postId } = args;

            const filterOptions = {
                AND: [
                    { user: { userName }},
                    { category: {
                            post: { id: postId }
                        }
                    }
                ]
            };
            try {
                const contents = await prisma.contentses({
                    where: filterOptions
                });

                contents.forEach(
                    async content =>
                        await prisma.updateContents({
                            data: {
                                check: false
                            },
                            where: {
                                id: content.id
                            }
                        })
                );

                return true;
            } catch(e){
                console.log(e);
                return false;
            }
        }
    }
};