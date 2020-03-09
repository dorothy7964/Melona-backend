import bcrypt from "bcrypt";

export const hashPassword = (password, saltRounds) => bcrypt.hash(password, saltRounds);
export const passwordMatch = (password, userPassword) => bcrypt.compare(password, userPassword);