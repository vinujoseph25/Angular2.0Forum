export class Comment {
  constructor(
    public id: Date,
    public createdDate: string,
    public content: string,
    public likes: number,
    public disLikes: number
  ) { }
}