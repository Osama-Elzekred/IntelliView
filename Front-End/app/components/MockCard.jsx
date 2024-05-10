'use client';

import { Card } from 'flowbite-react';
import { Rating } from 'flowbite-react';

export default function MockCard({
  icon,
  title,
  category,
  description,
  onClick,
  overallScore,
}) {
  return (
    <Card className="max-w-sm cursor-pointer bg-[#e9eced]" onClick={onClick}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="flex justify-end flex-row">
        <span className="flex bg-white rounded w-16 justify-center  items-center">
          <Rating>
            <Rating.Star />
          </Rating>
          <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
            {overallScore}
          </span>
        </span>
      </div>
      <span className={`text-2xl rounded-full p-3 mr-3 text-gray-800`}>
        <i className={`fas ${icon}`}></i>
      </span>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <h6 className="font-normal text-gray-700 dark:text-gray-400">
        {category}
      </h6>
      <p className="font-normal text-[#393a3a]  text-lg">{description}</p>
      {/* <span className="icon-star flex justify-end font-bold text-lg text-black">  {overallScore} </span> */}
    </Card>
  );
}
