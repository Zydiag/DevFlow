'use server';
import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';

export async function getUserById(params: any) {
  try {
    // connect to Db
    connectToDatabase();

    const { userId } = params;
    const user = User.findOne({ clerkId: userId });

    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get user');
  }
}
