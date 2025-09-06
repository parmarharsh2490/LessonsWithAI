import { Injectable, signal } from '@angular/core';
import { IAssistant } from '../model/assistant.model';

@Injectable({
  providedIn: 'root',
})
export class AssistantDataService {
  intialAssistant: IAssistant = {
    _id: '',
    assistantId: '',
    user: '',
    assistantModel: '',
    assistantName: '',
    created_at: new Date(),
    updated_at: new Date(),
    __v: 0,
    voice: {
      model: '',
      style: 0,
      voiceId: 'Xb7hH8MSUJpSbSDYk0k2',
      provider: '',
      stability: 0,
      similarityBoost: 0,
      useSpeakerBoost: false,
    },
    model: {
      model: 'gpt-3.5-turbo',
      toolIds: [],
      messages: [],
      provider: '',
      temperature: 0,
    },
    firstMessage: '',
    voicemailMessage: '',
    endCallFunctionEnabled: false,
    endCallMessage: '',
    transcriber: {
      model: '',
      keywords: [],
      language: '',
      provider: '',
    },
    silenceTimeoutSeconds: 0,
    clientMessages: [],
    serverMessages: [],
    maxDurationSeconds: 0,
    backgroundSound: '',
    firstMessageMode: '',
    analysisPlan: {
      summaryPlan: {
        enabled: false,
        messages: [],
        timeoutSeconds: 0,
      },
      structuredDataPlan: {
        enabled: false,
        schema: {
          type: '',
          required: [],
          properties: {
            callOutcome: {
              type: '',
              enum: [],
            },
            callSentiment: {
              type: '',
              enum: [],
            },
            followUpStatus: {
              type: '',
              enum: [],
            },
            keyInformation: {
              type: '',
              properties: {
                capturedInfo: {
                  type: '',
                  description: '',
                },
              },
            },
            decisionTracking: {
              type: '',
              properties: {
                interestLevel: {
                  type: '',
                  enum: [],
                },
              },
            },
            objectiveAchievement: {
              type: '',
              enum: [],
            },
          },
        },
        messages: [],
        timeoutSeconds: 0,
      },
      successEvaluationPlan: {
        enabled: false,
        rubric: '',
        messages: [],
        timeoutSeconds: 0,
      },
    },
    voicemailDetection: {
      enabled: false,
      provider: '',
      voicemailDetectionTypes: [],
    },
    backgroundDenoisingEnabled: false,
    artifactPlan: {
      recordingEnabled: false,
    },
    messagePlan: {
      idleMessages: [],
      idleMessageMaxSpokenCount: 0,
    },
    monitorPlan: {
      listenEnabled: false,
      controlEnabled: false,
    },
    server: {
      url: '',
    },
    isServerUrlSecretSet: false,
  };
  assistant = signal<IAssistant>(this.intialAssistant);

  updateAssistant(assistant: IAssistant) {
    this.assistant.set(assistant);
  }
}
