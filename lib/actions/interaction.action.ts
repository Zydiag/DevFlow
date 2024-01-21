'use server';

import Question from '@/database/question.model';
import { connectToDatabase } from '../mongoose';
import { ViewQuestionParams } from './shared.action';
import Interaction from '@/database/interaction.model';

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, userId } = params;
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: 'view',
        question: questionId,
      });

      if (existingInteraction) return console.info('already viewed');

      // Create Interaction
      await Interaction.create({
        user: userId,
        action: 'view',
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to view question');
  }
}
