import Image from 'next/image';
import Link from 'next/link';
import RenderTag from './RenderTag';

const hotQuestions = [
  { _id: '1', question: 'how to make a project with react?' },
  { _id: '2', question: 'how to make a project with react?' },
  { _id: '3', question: 'how to make a project with react?' },
  { _id: '4', question: 'how to make a project with react?' },
  { _id: '5', question: 'how to make a project with react?' },
];

const popularTags = [
  {
    _id: '1',
    name: 'react',
    totalQuestions: 5,
  },
  {
    _id: '2',
    name: 'nextjs',
    totalQuestions: 5,
  },
  {
    _id: '3',
    name: 'nodejs',
    totalQuestions: 5,
  },
  {
    _id: '4',
    name: 'javascript',
    totalQuestions: 5,
  },
];
const RightSideBar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen  w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden max-sm:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.question}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="arrow"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16 ">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default RightSideBar;
