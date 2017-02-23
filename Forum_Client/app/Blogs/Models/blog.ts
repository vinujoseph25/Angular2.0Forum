import { Comment } from './comment';

export class Blog {
  constructor(
    public id: Date,
    public title: string,
    public createdDate: string,
    public content: string,
    public comments: Comment[],
    public countOfComments: number,
    public likes: number,
    public disLikes: number
  ) { }
}