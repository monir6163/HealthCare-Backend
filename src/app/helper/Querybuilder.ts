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
}
