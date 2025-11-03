export interface ICall {
  id: string;
  duration: number;
  callId: string;
  status: string;
  cost: number;
  startedAt: string;
  endedAt: string;
  createdAt: string;
  updatedAt: string;
  summary: string;
}

export interface ICallReport extends ICall {
  recordingUrl: string;
  transcript: string;
  assistantId: string;
  type: string;
  messages: IMessage[];
}

export interface IMessage {
  role: string;
  time: number;
  message: string;
  secondsFromStart: number;
}
