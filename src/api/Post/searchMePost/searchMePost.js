import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchMePost: async(_, args) => prisma.posts({
            where: {
                anotherPage: true,
                OR: [
                    { user: {
                        userName_starts_with: args.term
                    }},
                    { categorys_some: { 
                        text_starts_with: args.term
                    }},
                    { location_starts_with: args.term },
                    { lastDate_starts_with: args.term }
                ]
            },
            orderBy: "lastDate_DESC"
        })
    }
};