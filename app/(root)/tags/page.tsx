import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { TagFilters } from '@/constants/filters';
import { getAllTags } from '@/lib/actions/tag.action';
import { SearchParamsProps } from '@/types';
import Link from 'next/link';
import React from 'react';

const Tags = async ({ searchParams }: SearchParamsProps) => {
  const { tags, isNext } = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds..."
          otherClasses="flex-1 w-full"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          // containerClasses="hidden max-md:flex"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5 ">
                  <p className="paragraph-semibold text-dark300_light900 ">
                    {tag.name}
                  </p>
                </div>
                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{' '}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags yet. Create one to get started!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </>
  );
};

export default Tags;
