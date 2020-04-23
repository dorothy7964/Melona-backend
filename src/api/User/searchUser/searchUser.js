import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        searchUser: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { term } = args;

            if (term.length > 0) {
                const containUser = await prisma.users({
                    where: {
                        OR: [
                            { userName_contains: term },
                            { email_contains: term }
                        ]
                    }
                });

                const users = containUser.filter(containUser => (
                    containUser.userName !== user.userName
                ));

                return users;
            } else {
                throw Error("Please enter a character to Serch");
            }
        }
    }
};