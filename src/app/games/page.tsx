"use client";
import React, { useEffect, useState } from 'react';
import type { IData } from '@/app/types';
import Image from 'next/image';

import styles from "./styles.module.css";
import Link from 'next/link';

export default function Page() {
  const [data, setData] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      const request = await fetch("https://nextjs-test-pi-hazel-56.vercel.app/data/games.json");
      const response: IData[] = await request.json();
      setData(response)
      setIsLoading(false);
    }

    getData()

  }, [])

  return (
    <div className={styles.main}>
      {data.map(({title, identifier, provider, categories, seo_title}) => {
        return (
          <React.Fragment key={identifier}>
            <Link href={`/games/${provider}/${seo_title}`}><h1>Название игры —  {title}</h1> <br /></Link>
            <p className={styles.description}>Список категорий игры:</p>
            <ul className={styles.list}>
              {categories.map(item => {
                return <li key={item}>{ item}</li>
              })}
            </ul>
            <div className={styles.textGame}>Обложка игры: </div>
            <Link href={`/games/${provider}/${seo_title}`}>
             <Image className={styles.img} width={300} height={300} alt="image"
                src={`https://d2norla3tyc4cn.cloudfront.net/i/s3/${identifier}.webp`} />
            </Link>
          </React.Fragment>
        )
      })}
      {isLoading && "Загрузка"}
      {data.length === 0 && !isLoading && "Not Found Data"}
    </div>
  );
}
