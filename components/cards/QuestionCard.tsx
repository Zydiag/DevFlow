import Link from 'next/link';
import React from 'react';
import RenderTag from '../shared/RenderTag';
import Metric from '../shared/Metric';
import { formatNumber, getTimeStamp } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteActions from '../shared/EditDeleteActions';

type Props = {
  clerkId?: string;
  _id: number;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; picture: string };
  upvotes: string[];
  views: number;
  answers: string;
  createdAt: Date;
};

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div>
          <span className=" subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteActions type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
        {/* if signed in edit button */}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` -asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor={true}
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatNumber(upvotes.length)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={answers.length}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatNumber(views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
