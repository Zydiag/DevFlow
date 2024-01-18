'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.action';
import Tag from '@/database/tag.model';

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

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get all tags');
  }
}
