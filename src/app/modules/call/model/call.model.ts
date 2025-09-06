export interface ICallReport {
  id: string;
  assistantId: string;
  type: string;
  startedAt: string;
  endedAt: string;
  transcript: string;
  recordingUrl: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  orgId: string;
  cost: number;
  webCallUrl: string;
  status: string;
  endedReason: string;
  messages: ICallMessage[];
  stereoRecordingUrl: string;
  costBreakdown: ICallCostBreakdown;
  analysis: ICallAnalysis;
  artifact: ICallArtifact;
  costs: ICallCost[];
  monitor: {
    listenUrl: string;
    controlUrl: string;
  };
  transport: {
    assistantVideoEnabled: boolean;
  };
}

export interface ICallMessage {
  role: string;
  time: number;
  message: string;
  secondsFromStart: number;
}

export interface ICallCost {
  cost: number;
  type: string;
  minutes?: number;
  transcriber?: {
    model: string;
    provider: string;
  };
  model?: {
    model: string;
    provider: string;
  };
  promptTokens?: number;
  completionTokens?: number;
  voice?: {
    model: string;
    voiceId: string;
    provider: string;
  };
  characters?: number;
  subType?: string;
  analysisType?: string;
}

export interface ICallCostBreakdown {
  stt: number;
  llm: number;
  tts: number;
  vapi: number;
  total: number;
  llmPromptTokens: number;
  llmCompletionTokens: number;
  ttsCharacters: number;
  analysisCostBreakdown: {
    summary: number;
    structuredData: number;
    successEvaluation: number;
    summaryPromptTokens: number;
    summaryCompletionTokens: number;
    structuredDataPromptTokens: number;
    successEvaluationPromptTokens: number;
    structuredDataCompletionTokens: number;
    successEvaluationCompletionTokens: number;
  };
  knowledgeBaseCost: number;
  voicemailDetectionCost: number;
}

export interface ICallAnalysis {
  summary: string;
  structuredData: {
    callOutcome: string;
    callSentiment: string;
    followUpStatus: string;
    keyInformation: {
      capturedInfo: string;
    };
    decisionTracking: {
      interestLevel: string;
    };
    objectiveAchievement: string;
  };
  successEvaluation: string;
}

export interface ICallArtifact {
  recordingUrl: string;
  stereoRecordingUrl: string;
  messages: ICallMessage[];
  messagesOpenAIFormatted: {
    content: string;
    role: string;
  }[];
  transcript: string;
}

export interface ICallReportLists {
  type: string;
  callStatus: string;
  from: string;
  to: string;
  callDuration: string;
  cost: number;
  createdAt: string;
  callOutcome: string;
  callSentiment: string;
  disconnectionReason: string;
  followUpStatus: string;
  objectiveAchievement: string;
  _id: string;
  keyInformation: string;
}
