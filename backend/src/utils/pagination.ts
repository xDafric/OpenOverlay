import { and, asc, desc, eq, gt, lt, or } from "drizzle-orm";
import type { PgColumn, PgSelect, PgTable } from "drizzle-orm/pg-core";
import z from "zod";

export const paginationParams = z.object({
  page_size: z.coerce.number().min(1),
  cursor: z.base64().optional(),
  sort_direction: z.enum(["asc", "desc"]).optional(),
  sort_field: z.string().optional(),
});
export type PaginationInput = z.infer<typeof paginationParams>;

export type PaginationResult<T> = {
  data: T[];
  pagination: {
    cursor: string | null;
    hasNextPage: boolean;
  };
};

export const withCursorPagination = async <T extends PgSelect, R>({
  query,
  idField,
  sortableFields,
  pageSize,
  cursor,
  sortField,
  sortDirection = "asc",
}: {
  query: T;
  idField: PgColumn;
  sortableFields: PgColumn[];
  pageSize: number;
  cursor?: string | null | undefined;
  sortField?: string | undefined;
  sortDirection?: "asc" | "desc" | undefined;
}) => {
  const orderByFields = [idField];
  let cursorObject: any;
  let sortColumn: PgColumn | null = null;

  if (sortField) {
    const column = sortableFields.find((field) => field.name == sortField);
    if (!column) {
      throw new Error("Invalid sort field");
    }
    sortColumn = column;
    orderByFields.unshift(sortColumn);
  }

  if (cursor) {
    cursorObject = decodeCursor(cursor);

    if (
      (sortField && !Object.keys(cursorObject).includes(sortField)) ||
      !cursorObject.id
    ) {
      throw new Error("Invalid cursor");
    }
  }

  const result = await query
    .where(
      cursor && sortField && sortColumn
        ? or(
            sortDirection === "asc"
              ? gt(sortColumn, cursorObject[sortField])
              : lt(sortColumn, cursorObject[sortField]),
            and(
              eq(sortColumn, cursorObject[sortField]),
              sortDirection === "asc"
                ? gt(idField, cursorObject[idField.name])
                : lt(idField, cursorObject[idField.name]),
            ),
          )
        : cursor
          ? sortDirection === "asc"
            ? gt(idField, cursorObject[idField.name])
            : lt(idField, cursorObject[idField.name])
          : undefined,
    )
    .limit(pageSize + 1)
    .orderBy(
      ...orderByFields.map((field) =>
        sortDirection === "asc" ? asc(field) : desc(field),
      ),
    );

  let hasNextPage: boolean = false;
  let nextCursor: string | null = null;
  let data: any = result;

  if (result.length > pageSize) {
    hasNextPage = true;

    const cursorRow = result.at(-2);
    if (cursorRow) {
      const cursorData = { [idField.name]: cursorRow[idField.name] };
      if (sortField) {
        cursorData[sortField] = cursorRow[sortField];
      }
      nextCursor = encodeCursor(cursorData);
    }
    data = result.slice(0, -1);
  }
  return {
    data: data,
    pagination: {
      cursor: nextCursor,
      hasNextPage,
    },
  };
};

const encodeCursor = (values: Record<string, any>) => {
  return Buffer.from(JSON.stringify(values)).toString("base64");
};

const decodeCursor = (cursor: string) => {
  return JSON.parse(Buffer.from(cursor, "base64").toString());
};
