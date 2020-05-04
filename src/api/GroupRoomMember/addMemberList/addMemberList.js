import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        addMemberList: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { userNameArr } = args;
            
            const following = await prisma.user({ 
                id: user.id 
            }).following();

            const followingUser = await prisma.users({
                where: {
                    id_in: [...following.map(user => user.id)]
                }
            });

            let resultUser = [];
            followingUser.map(user => (
                resultUser.push(user.userName)
            ));
            
            // 그룹 인원과 친구 목록에서 중복 된 유저 제거
            for( let i = 0; i < userNameArr.length; i ++ ) {
                for( let j = 0; j < resultUser.length; j ++ ) {
                    if (userNameArr[i] === resultUser[j]) {
                        let pos = resultUser.indexOf(resultUser[j]);
                        resultUser.splice(pos, 1);
                    }
                }
            }

            return prisma.users({
                where: {
                    userName_in: resultUser
                }
            });
        }
    }
};