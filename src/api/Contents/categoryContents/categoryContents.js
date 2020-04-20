import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        categoryContents: (_, args) => {
            const { categoryId, userName, anotherPage } = args;

            if (!anotherPage){
                try {
                    return prisma.contentses({
                        where: {
                           AND: [
                               { category: { id: categoryId } },
                               {  user: { userName } },
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
                                { category: {
                                    id: categoryId
                                }},
                                { contentsReqs_some: {
                                    user: {
                                        userName
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