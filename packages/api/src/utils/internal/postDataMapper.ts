import { randomUUID } from "node:crypto";
export const createPostDataMapper = (input: {
    title: string;
    content: string;
    author_id: string;
}) => ({
    id: randomUUID(),
    ...input,
});