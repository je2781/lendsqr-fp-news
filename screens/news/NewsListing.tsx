import React, { useEffect, useState } from "react";
import newsRepo from "../../repository/news/news-repo";
import { options } from "../../constants/base-api";

export default function NewsListing() {
  const [articlesArr, setArticlesArr] = useState<Array<object>>([]);

  useEffect(() => {
    async function retrieveNewsArticles() {
      const articles = await newsRepo.searchNews(options);
      for(const article of articles){
          setArticlesArr((prevState: any) => prevState.push({
            clean_url: article['clean_url'],
            title: article['title'],
            published_date: article['published_date'],
            topic: article['topic']
          }));
      }
    }

    retrieveNewsArticles();
  }, []);
  return <></>;
}
