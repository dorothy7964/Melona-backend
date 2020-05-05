import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        searchPostGroup: (_, args) => {
            const { groupRoomId, term } = args;
            
            return prisma.posts({
                where: {
                    anotherPage: false,
                    groupRoom: groupRoomId,
                    OR: [
                        { user: {
                            userName_starts_with: term
                        }},
                        { categorys_some: { 
                            text_starts_with: term
                        }},
                        { location_starts_with: term },
                        { lastDate_starts_with: term }
                    ]
                },
                orderBy: "lastDate_DESC"
            });
        }
    }
};