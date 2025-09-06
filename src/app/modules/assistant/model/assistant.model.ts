import { IModel } from './model.model';

export interface IAssistantList {
  id: string;
  assistant_name: string;
  model: string;
  created_at: Date;
  updated_at: Date;
}

export interface IAssistant {
  _id: string;
  assistantId: string;
  user: string;
  assistantModel: string;
  assistantName: string;
  created_at: Date;
  updated_at: Date;
  __v: number;
  voice: {
    model: string;
    style: number;
    voiceId: string;
    provider: string;
    stability: number;
    similarityBoost: number;
    useSpeakerBoost: boolean;
  };
  model: {
    model: IModel['id'];
    toolIds: string[];
    messages: {
      role: string;
      content: string;
    }[];
    provider: string;
    temperature: number;
  };
  firstMessage: string;
  voicemailMessage: string;
  endCallFunctionEnabled: boolean;
  endCallMessage: string;
  transcriber: {
    model: string;
    keywords: string[];
    language: string;
    provider: string;
  };
  silenceTimeoutSeconds: number;
  clientMessages: string[];
  serverMessages: string[];
  maxDurationSeconds: number;
  backgroundSound: string;
  firstMessageMode: string;
  analysisPlan: {
    summaryPlan: {
      enabled: boolean;
      messages: {
        content: string;
        role: string;
      }[];
      timeoutSeconds: number;
    };
    structuredDataPlan: {
      enabled: boolean;
      schema: {
        type: string;
        required: string[];
        properties: {
          callOutcome: {
            type: string;
            enum: string[];
          };
          callSentiment: {
            type: string;
            enum: string[];
          };
          followUpStatus: {
            type: string;
            enum: string[];
          };
          keyInformation: {
            type: string;
            properties: {
              capturedInfo: {
                description: string;
                type: string;
              };
            };
          };
          decisionTracking: {
            type: string;
            properties: {
              interestLevel: {
                type: string;
                enum: string[];
              };
            };
          };
          objectiveAchievement: {
            type: string;
            enum: string[];
          };
        };
      };
      messages: {
        content: string;
        role: string;
      }[];
      timeoutSeconds: number;
    };
    successEvaluationPlan: {
      enabled: boolean;
      rubric: string;
      messages: {
        content: string;
        role: string;
      }[];
      timeoutSeconds: number;
    };
  };
  voicemailDetection: {
    enabled: boolean;
    provider: string;
    voicemailDetectionTypes: string[];
  };
  backgroundDenoisingEnabled: boolean;
  artifactPlan: {
    recordingEnabled: boolean;
  };
  messagePlan: {
    idleMessages: string[];
    idleMessageMaxSpokenCount: number;
  };
  monitorPlan: {
    listenEnabled: boolean;
    controlEnabled: boolean;
  };
  server: {
    url: string;
  };
  isServerUrlSecretSet: boolean;
}
