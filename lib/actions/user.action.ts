'use server';
import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from './shared.action';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';

export async function getUserById(params: GetUserByIdParams) {
  try {
    // connect to Db
    connectToDatabase();

    const { userId } = params;
    const user = User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get user');
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create user');
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create user');
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error('User not found');
    }
    // delete user

    // get question ids
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   '_id'
    // );

    // delete user questions
    await Question.deleteMany({ author: user._id });
    // delete user answer
    // TODO: delete every , answer, comments created by this user

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create user');
  }
}
