import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        user: ({ id }) => prisma.post({ id }).user(),
        categorys: ({ id }) => prisma.post({ id }).categorys(),
        contents: ({ id }) => prisma.post({ id }).contents(),
        comments: ({ id }) => prisma.post({ id }).comments(),
        comments: ({ id }) => prisma.post({ id }).comments(),
        applys: ({ id }) => prisma.post({ id }).applys(),
        isApply: (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.apply({
                AND: [
                    {
                       user: {
                          id: user.id
                       }
                    },
                    {
                        post: {
                            id
                        }
                    }
                ]
            });
        },
        applysRead: (parent) => {
            const { id } = parent;
            return prisma.applies({
                where: {
                    AND: [
                        {
                            readCheck: true
                        },
                        {
                            post: {
                                id
                            }
                        }
                    ]
                }
            });
        },
        isApplyWait: (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.apply({
                AND: [
                    {
                       user: {
                          id: user.id
                       }
                    },
                    {
                        post: {
                            id
                        }
                    },
                    {
                        applyWait: true
                    }
                ]
            });
        },
        isApplyReadCheck: (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.apply({
                AND: [
                    {
                       user: {
                          id: user.id
                       }
                    },
                    {
                        post: {
                            id
                        }
                    },
                    {
                        readCheck: true
                    }
                ]
            });
        },
        applysCount: parent =>
            prisma
            .appliesConnection({
                where: { post: { id: parent.id } }
            })
            .aggregate()
            .count(),
        applysReadCount: parent =>
            prisma
            .appliesConnection({
                where: {
                    AND: [
                        {post: { id: parent.id }},
                        { readCheck: true }
                    ]
                }
            })
            .aggregate()
            .count(),
        isProgress: (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.apply({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id
                        }
                    },
                    {
                        progress: true
                    }
                ]
            });
        },
        commentCount: parent =>
            prisma
            .commentsConnection({
                where: { post: { id: parent.id } }
            })
            .aggregate()
            .count(),
    }
};