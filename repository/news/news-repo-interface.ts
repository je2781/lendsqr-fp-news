
export interface NewsRepoImpl {
  searchNews: (
    options: Record<"method" | "headers" | "url" | "params", any>
  ) => Promise<any[]>;
}
