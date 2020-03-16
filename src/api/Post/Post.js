import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        user: ({ id }) => prisma.post({ id }).user(),
        categorys: ({ id }) => prisma.post({ id }).categorys(),
        comments: ({ id }) => prisma.post({ id }).comments(),
        applys: ({ id }) => prisma.post({ id }).applys(),
        friendRooms: ({ id }) => prisma.post({ id }).friendRooms()
    }
};