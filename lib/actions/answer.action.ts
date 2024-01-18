'use server';

import Answer from '@/database/answer.model';
import { connectToDatabase } from '../mongoose';
import { CreateAnswerParams, GetAnswersParams } from './shared.action';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';

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
    const { questionId } = params;
    // const {questionId, page = 1, pageSize = 20, sortBy} = params;
    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name picture')
      .sort({ createdAt: -1 });
    return { answers };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get answers');
  }
}
