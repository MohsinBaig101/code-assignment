export interface IGetCommentQueryArgs {
    take: number;
    where: {
        postId: string;
        parentId: string | null;
        incrementalId?: {
            lte?: number;
        };
    };
    orderBy: {
        incrementalId: 'asc' | 'desc';
    };
    include: {
        _count: {
            select: {
                replies: boolean;
            };
        };
    };
};