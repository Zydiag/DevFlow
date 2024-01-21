import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type MetricProps = {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textStyles?: string;
  href?: string;
  isAuthor?: boolean;
};

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  isAuthor,
}: MetricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`h-[16px] w-[16px] object-cover ${
          href ? 'rounded-full' : ''
        }`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`line-clamp-1 text-light-400  ${
            isAuthor ? 'max-sm:hidden' : ''
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }
  return <div className="flex-center flex-wrap gap-1 ">{metricContent}</div>;
};

export default Metric;
