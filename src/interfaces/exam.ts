export interface ITopic {
  id?: number
  name: string
  description: string
  subjectId: number,
  questionsCount?: number,
}

export interface ISubject {
  id?: number,
  name: string,
  description: string,
  topicsCount?: number,
}
export interface IOption {
  description: string,
  isCorrect: boolean
}

export type IQuestionType = "trueOrFalse" | "fillInTheBlanks" | "multipleChoice" | "subjective"

export type IQuestionLevel =  "easy" | "medium" | "hard"

export interface IAnswer {
  type: IQuestionType,
  description: string,
  options: IOption[],
  explanation: string,
}

export interface IQuestionAndAnswer {
  questionNumber?:number,
  questionId?: number,
  topicId: number,
  complexity: IQuestionLevel,
  question: string,
  answer: IAnswer,
}
export interface IQuestionBankTopic {
  id: number,
  name: string,
  totalQuestions: number,
  easyQuestionsCount: number,
  mediumQuestionsCount: number,
  hardQuestionsCount: number,
}
export interface ISelectedQuestionBankTopic extends IQuestionBankTopic {
  selectedTotalQuestions: number
  selectedEasyQuestionsCount: number
  selectedMediumQuestionsCount: number
  selectedHardQuestionsCount: number
}
export interface IQuestionBank {
  id: number,
  name: string,
  topics: ISelectedQuestionBankTopic[],
}

export interface ITestDetailsForm {
  testName: string
  testDescription: string
  totalQuestions: number
  questionBankTopics: ISelectedQuestionBankTopic[],
}

export interface ITestEvaluationForm {
  totalQuestions: number,
  totalMarks: number,
  passPercentage: number,
  negativeMarks: number,
}

export interface ITestSettingsForm extends ITestEvaluationForm {
  testDateAvailability: "specific" | "always",
  testTimeAvailability: "specific" | "always",
  testDurationAvailability: "specific" | "always",
  testStartDate: string,
  testEndDate:string,
  testStartTime: string,
  testEndTime: string,
  testDuration: number,
  resultFormat: string,
  testDeclaration: string,
}

export interface IPromoCode {
  id: number,
  code: string,
  offer: number
}

export type IPricingType = "private" | "open"

export interface ITestPricingForm {
  testType: IPricingType,
  price: number,
  promoCodes: IPromoCode[]
}

export interface ICreateTestData {
  testDetails:ITestDetailsForm,
  testSettings:ITestSettingsForm,
  pricing:ITestPricingForm,
}

export interface ICreateTopic {
  id: number,
  name: string,
  description: string,
}

export interface ICreateSubjectTopic {
  name: string,
  description: string,
  topics: ICreateTopic[],
}

export interface IEditSubjectTopic extends ICreateSubjectTopic {
  id: number,
}