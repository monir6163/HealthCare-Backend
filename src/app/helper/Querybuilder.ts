import {
  IQueryBuilderConfig,
  IQueryParams,
  PrismaCountArgs,
  PrismaFindManyArgs,
  PrismaModelDelgate,
} from "./query.interface";

export class QueryBuilder<
  T,
  TWhereInput = Record<string, unknown>,
  TIncluder = Record<string, unknown>,
> {
  private query: PrismaFindManyArgs;
  private countQuery: PrismaCountArgs;
  private page: number = 1;
  private limit: number = 10;
  private skip: number = 0;
  private sortBy: string = "createdAt";
  private sortOrder: "asc" | "desc" = "desc";
  private selectFields: Record<string, boolean | undefined>;

  constructor(
    private model: PrismaModelDelgate,
    private queryParams: IQueryParams,
    private config: IQueryBuilderConfig,
  ) {
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: 10,
    };
    this.countQuery = {
      where: {},
    };
  }
  search(): this {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;

    if (searchTerm && searchableFields && searchableFields.length > 0) {
      const searchConditions: Record<string, unknown>[] = searchableFields.map(
        (field) => {
          if (field.includes(".")) {
            const parts = field.split(".");
            const obj: Record<string, unknown> = {};
            let current = obj;
            for (let i = 0; i < parts.length - 1; i++) {
              current[parts[i]] = {};
              current = current[parts[i]] as Record<string, unknown>;
            }
            current[parts[parts.length - 1]] = {
              contains: searchTerm,
              mode: "insensitive",
            };
            return obj;
          } else {
            return { [field]: { contains: searchTerm, mode: "insensitive" } };
          }
        },
      );
      const whereCondition = this.query.where as Record<string, unknown>;
      whereCondition.OR = searchConditions;

      const countWhereCondition = this.countQuery.where as Record<
        string,
        unknown
      >;
      countWhereCondition.OR = searchConditions;
    }
    return this;
  }
}
