export interface ITopic {
  id?: number
  name: string
  description: string
  subjectId: number
}

export interface ISubject {
  id?: number,
  name: string,
  description: string
  topics: ITopic[]
}
