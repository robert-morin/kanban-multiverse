import type { BoardColumnDefinition } from "./BoardColumnDefinition"

export type BoardDefinition = {
    id: number,
    name: string,
    columns: BoardColumnDefinition[]
}
