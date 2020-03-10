import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        searchUser: async(_, args) => {
            const { term } = args;

            if (term.length > 0) {
                const users = await prisma.users({
                    where: {
                        OR: [
                            { userName_contains: args.term },
                            { email_contains: args.term }
                        ]
                    }
                });
                return users;
            } else {
                throw Error("Please enter a character to Serch");
            }
        }
    }
};