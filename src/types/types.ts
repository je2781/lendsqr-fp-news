import {AxiosRequestConfig} from 'axios';

export type Article = Record<
  | "description"
  | "source_name"
  | "title"
  | "published_date"
  | "content"
  | "article_url"
  | "image_url"
  | "author",
  any
>;

export interface AxiosRequestConfigWithMetaData extends AxiosRequestConfig {
  meta: any;
  method: "GET" | "POST" | "PUT",
  url: string;
}
