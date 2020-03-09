import { passwordMatch } from "../../../passwordMatch";

 export default {
    Mutation: {
        checkPassword: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { password } = args;

            try {
                const passwordConfirm = await passwordMatch(password, user.password);
                if (!passwordConfirm){
                    return false;
                } 
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
};