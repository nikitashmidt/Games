"use client";
import React, { useEffect, useState } from 'react';
import type { IData } from '@/app/types';
import { useParams } from 'next/navigation'
import Image from 'next/image';

import styles from "./styles.module.css";

export default function Page() {
  const [data, setData] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useParams()

  useEffect(() => {
    async function getData() {
      const request = await fetch("https://nextjs-test-pi-hazel-56.vercel.app/data/games.json");
      const response: IData[] = await request.json();

      const result = response.filter(item => item.provider === params.provider && item.seo_title === params.seo_title)
      setData(result)
      setIsLoading(false);
    }

    getData()
  }, [])

  return (
    <div className={styles.main}>
      {data.map(({title, identifier, provider, categories}) => {
        return (
          <React.Fragment key={identifier}>
            <h1>Название игры —  {title}</h1> <br />
            <span>Провайдер —  {provider}</span>
            <p className={styles.description}>Список категорий игры:</p>
            <ul className={styles.list}>
              {categories.map(item => {
                return <li key={item}>{ item}</li>
              })}
            </ul>
            <div className={styles.textGame}>Обложка игры: </div>
            <Image className={styles.img} width={300} height={300} alt="image"
              src={`https://d2norla3tyc4cn.cloudfront.net/i/s3/${identifier}.webp`} />
          </React.Fragment>
        )
      })}
      {isLoading && "Загрузка"}
      {data.length === 0 && !isLoading && "Not Found Data"}
    </div>
  );
}
