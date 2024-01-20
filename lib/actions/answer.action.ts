'use server';

import Answer from '@/database/answer.model';
import { connectToDatabase } from '../mongoose';
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from './shared.action';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';
import Interaction from '@/database/interaction.model';

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;
    const answer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: {
        answers: answer._id,
      },
    });

    // TODO: add interaction

    revalidatePath(path);
    return answer;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create answer');
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId, sortBy, page = 1, pageSize = 20 } = params;
    const skipAmount = (page - 1) * pageSize;
    let sortOptions = {};
    switch (sortBy) {
      case 'highestUpvotes':
        sortOptions = { upvotes: -1 };
        break;
      case 'lowestUpvotes':
        sortOptions = { upvotes: 1 };
        break;
      case 'recent':
        sortOptions = { createdAt: -1 };
        break;
      case 'old':
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    // const {questionId, page = 1, pageSize = 20, sortBy} = params;
    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name picture')
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);
    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const isNext = totalAnswers > skipAmount + answers.length;
    return { answers, isNext };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get answers');
  }
}

export async function upVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) throw new Error('Question not found');
    // increment author reputation
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to upvote question');
  }
}

export async function downVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) throw new Error('Question not found');
    // increment author reputation
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to upvote question');
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();
    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    if (!answer) throw new Error('answer not found');

    await Answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error('something went wrong');
  }
}
