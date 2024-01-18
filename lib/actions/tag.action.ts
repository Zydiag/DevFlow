'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { GetTopInteractedTagsParams } from './shared.action';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    // find interactions for the user and groups by tag

    // interactions

    return [
      { _id: '1', name: 'react', totalQuestions: 5 },
      { _id: '2', name: 'nextjs', totalQuestions: 5 },
      { _id: '3', name: 'nodejs', totalQuestions: 5 },
    ];
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get top interacted tags');
  }
}
