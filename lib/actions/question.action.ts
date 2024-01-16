'use server';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import { connectToDatabase } from '../mongoose';

export async function createQuestion(params: any) {
  try {
    // connect to db
    connectToDatabase();
    console.log('passed the connection');
    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      // tags,
      author,
      // path
    });
    console.log('question created', question);

    const tagDocuments = [];

    // create tag or get them if already exists
    for (const tagName of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tagName}$`, 'i') } },
        {
          $setOnInsert: { name: tagName },
          $push: { question: question.id },
        },
        {
          upsert: true,
          new: true,
        }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create an interaction record for the user ask-question action

    // increment author reputation +5
  } catch (error) {}
}
