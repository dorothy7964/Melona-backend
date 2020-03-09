import bcrypt from "bcrypt";

export const passwordMatch = (password, userPassword) => bcrypt.compare(password, userPassword);