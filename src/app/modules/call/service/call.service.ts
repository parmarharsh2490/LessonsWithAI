import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICallReport, ICallReportLists } from '../model/call.model';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  constructor(private http: HttpClient) {
    this.http.get;
  }

  getCallReport(callId: string): Observable<ICallReport> {
    callId = callId;
    return of({
      id: 'cdc139ab-9b34-456d-aa96-66883d752c78',
      assistantId: '3ad1ea02-35a0-4b1e-8e06-24a5a497fb51',
      type: 'webCall',
      startedAt: '2025-03-16T06:15:39.581Z',
      endedAt: '2025-03-16T06:15:46.901Z',
      transcript:
        'AI: Hello. How can I assist you today?\nUser: Hey. Can you tell me the current date?\n',
      recordingUrl:
        'https://storage.vapi.ai/cdc139ab-9b34-456d-aa96-66883d752c78-1742105749413-860d3931-da22-4e52-81cb-82b89113ebd2-mono.wav',
      summary:
        '# Call Summary\n\n**Purpose of the Call:**\nThe caller contacted the service to inquire about the current date. The interaction was extremely brief, with only a single question posed.\n\n**Key Points Discussed:**\n* The caller requested information about the current date\n* No additional context or follow-up questions were provided\n\n**Agreed Actions:**\n* None specified\n\n**Tone and Sentiment:**\nThe tone was neutral and straightforward, with the caller making a simple informational request.\n\n**Follow-up Requirements:**\nNo follow-up is required as this was a basic informational query.',
      createdAt: '2025-03-16T06:15:30.997Z',
      updatedAt: '2025-03-16T06:16:02.427Z',
      orgId: '0774fd23-9a6b-4b02-8995-c60b48d6c44a',
      cost: 0.038,
      webCallUrl: 'https://vapi.daily.co/B7nm7MCDhxAeeEbsiUBc',
      status: 'ended',
      endedReason: 'customer-ended-call',
      messages: [
        {
          role: 'system',
          time: 1742105731355,
          message: '',
          secondsFromStart: 0,
        },
        {
          role: 'bot',
          time: 1742105733442,
          source: '',
          endTime: 1742105735292,
          message: 'Hello. How can I assist you today?',
          duration: 1850,
          secondsFromStart: 1.8399999,
        },
        {
          role: 'user',
          time: 1742105735982,
          endTime: 1742105737512,
          message: 'Hey. Can you tell me the current date?',
          duration: 1530,
          secondsFromStart: 4.38,
        },
      ],
      stereoRecordingUrl:
        'https://storage.vapi.ai/cdc139ab-9b34-456d-aa96-66883d752c78-1742105749420-c939665a-506e-464b-8c63-8b248b51ebb7-stereo.wav',
      costBreakdown: {
        stt: 0.005,
        llm: 0.0011,
        tts: 0.0069,
        vapi: 0.0061,
        total: 0.038,
        llmPromptTokens: 22,
        llmCompletionTokens: 29,
        ttsCharacters: 138,
        analysisCostBreakdown: {
          summary: 0.0026,
          structuredData: 0.0033,
          successEvaluation: 0.0129,
          summaryPromptTokens: 222,
          summaryCompletionTokens: 129,
          structuredDataPromptTokens: 505,
          successEvaluationPromptTokens: 655,
          structuredDataCompletionTokens: 122,
          successEvaluationCompletionTokens: 731,
        },
        knowledgeBaseCost: 0,
        voicemailDetectionCost: 0,
      },
      analysis: {
        summary:
          '# Call Summary\n\n**Purpose of the Call:**\nThe caller contacted the service to inquire about the current date. The interaction was extremely brief, with only a single question posed.\n\n**Key Points Discussed:**\n* The caller requested information about the current date\n* No additional context or follow-up questions were provided\n\n**Agreed Actions:**\n* None specified\n\n**Tone and Sentiment:**\nThe tone was neutral and straightforward, with the caller making a simple informational request.\n\n**Follow-up Requirements:**\nNo follow-up is required as this was a basic informational query.',
        structuredData: {
          callOutcome: 'call_completed_normally',
          callSentiment: 'neutral',
          followUpStatus: 'no_followup',
          keyInformation: {
            capturedInfo:
              'The user asked for the current date, but no substantive information was exchanged in this very brief interaction.',
          },
          decisionTracking: {
            interestLevel: 'low',
          },
          objectiveAchievement: 'not_achieved',
        },
        successEvaluation:
          "# Call Evaluation\n\n## Call Overview\n- Primary Objective Achievement: Not Achieved\n- Key Discussion Points: Request for current date\n- Customer Interest Level: Low\n- Follow-up Required: No\n\nCall Impact:\n- Decision Stage: Initial Interest\n- Information Quality: Insufficient\n- Relationship Building: Weak\n\n## Core Evaluation Criteria\n\n1. Opening Effectiveness (Rating: Average)\n   - Professional introduction\n   - Clear purpose statement\n   - Initial rapport building\n   Examples from call: The agent opened with a standard greeting \"Hello. How can I assist you today?\" which was professional but generic.\n   Areas for improvement: Personalize the greeting and establish identity/role to build initial credibility.\n\n2. Customer Engagement (Rating: Poor)\n   - Question quality\n   - Active listening\n   - Response adaptation\n   Examples from call: No follow-up questions were asked to understand why the caller needed the date or if there were underlying needs.\n   Areas for improvement: Ask clarifying questions to understand the context of the date request and explore potential additional needs.\n\n3. Solution Delivery (Rating: Poor)\n   - Clear explanation\n   - Value communication\n   - Needs alignment\n   Examples from call: No solution was provided to the customer's simple request for the current date.\n   Areas for improvement: Promptly provide the requested information (current date) and offer additional relevant information if appropriate.\n\n4. Call Management (Rating: Poor)\n   - Conversation flow\n   - Time management\n   - Objection handling\n   Examples from call: The conversation stalled after the customer's initial question with no response.\n   Areas for improvement: Maintain conversation momentum by responding promptly to basic requests before moving to more complex matters.\n\n5. Closing Effectiveness (Rating: Poor)\n   - Clear next steps\n   - Commitment securing\n   - Professional wrap-up\n   Examples from call: No closing occurred as the conversation did not progress past the initial question.\n   Areas for improvement: Even for simple inquiries, confirm if the information provided meets the customer's needs and offer additional assistance.\n\n## Success Metrics\nOverall Performance: Poor (4 criteria rated Poor, 1 rated Average)\n\n## Key Takeaways\nTop 3 Strengths:\n1. Professional initial greeting established a baseline for customer service\n2. Simple, clear opening question invited customer engagement\n3. No interruptions or talking over the customer\n\nPriority Improvements:\n1. Basic information fulfillment - respond to direct questions promptly, even simple ones like providing the current date\n2. Proactive engagement - follow up with questions to understand context and identify additional needs\n3. Conversation management - ensure no dead ends in the conversation flow\n\n## Recommended Actions\n- Implement a protocol for immediately addressing basic informational requests before moving to deeper engagement\n- Develop a set of follow-up questions for common simple requests to uncover potential underlying needs\n- Practice conversation recovery techniques for when interactions stall\n- Create a simple checklist to ensure all customer inquiries receive a response, regardless of complexity\n\n---\n\nNote: This evaluation is based on an extremely brief interaction where the agent failed to provide a response to a simple question about the current date. The brevity of the exchange severely limits the ability to evaluate many aspects of call handling, but highlights the fundamental importance of providing requested information promptly.",
      },
      artifact: {
        recordingUrl:
          'https://storage.vapi.ai/cdc139ab-9b34-456d-aa96-66883d752c78-1742105749413-860d3931-da22-4e52-81cb-82b89113ebd2-mono.wav',
        stereoRecordingUrl:
          'https://storage.vapi.ai/cdc139ab-9b34-456d-aa96-66883d752c78-1742105749420-c939665a-506e-464b-8c63-8b248b51ebb7-stereo.wav',
        messages: [
          {
            role: 'system',
            time: 1742105731355,
            message: '',
            secondsFromStart: 0,
          },
          {
            role: 'bot',
            time: 1742105733442,
            source: '',
            endTime: 1742105735292,
            message: 'Hello. How can I assist you today?',
            duration: 1850,
            secondsFromStart: 1.8399999,
          },
          {
            role: 'user',
            time: 1742105735982,
            endTime: 1742105737512,
            message: 'Hey. Can you tell me the current date?',
            duration: 1530,
            secondsFromStart: 4.38,
          },
        ],
        messagesOpenAIFormatted: [
          {
            content: '',
            role: 'system',
          },
          {
            content: 'Hello. How can I assist you today?',
            role: 'assistant',
          },
          {
            content: 'Hey. Can you tell me the current date?',
            role: 'user',
          },
        ],
        transcript:
          'AI: Hello. How can I assist you today?\nUser: Hey. Can you tell me the current date?\n',
      },
      costs: [
        {
          cost: 0.00501482,
          type: 'transcriber',
          minutes: 0.3787333333333333,
          transcriber: {
            model: 'nova-2-general',
            provider: 'deepgram',
          },
        },
        {
          cost: 0.00109,
          type: 'model',
          model: {
            model: 'gpt-4',
            provider: 'openai',
          },
          promptTokens: 22,
          completionTokens: 29,
        },
        {
          cost: 0.0069,
          type: 'voice',
          voice: {
            model: 'eleven_turbo_v2',
            voiceId: 'EXAVITQu4vr4xnSDxMaL',
            provider: '11labs',
          },
          characters: 138,
        },
        {
          cost: 0.0061,
          type: 'vapi',
          minutes: 0.122,
          subType: 'normal',
        },
        {
          cost: 0.002601,
          type: 'analysis',
          model: {
            model: 'claude-3-7-sonnet-20250219',
            provider: 'anthropic',
          },
          analysisType: 'summary',
          promptTokens: 222,
          completionTokens: 129,
        },
        {
          cost: 0.003345,
          type: 'analysis',
          model: {
            model: 'claude-3-7-sonnet-20250219',
            provider: 'anthropic',
          },
          analysisType: 'structuredData',
          promptTokens: 505,
          completionTokens: 122,
        },
        {
          cost: 0.01293,
          type: 'analysis',
          model: {
            model: 'claude-3-7-sonnet-20250219',
            provider: 'anthropic',
          },
          analysisType: 'successEvaluation',
          promptTokens: 655,
          completionTokens: 731,
        },
        {
          cost: 0,
          type: 'knowledge-base',
          model: {
            model: 'gemini-1.5-flash',
            provider: 'google',
          },
          promptTokens: 0,
          completionTokens: 0,
        },
      ],
      monitor: {
        listenUrl:
          'wss://phone-call-websocket.aws-us-west-2-backend-production3.vapi.ai/cdc139ab-9b34-456d-aa96-66883d752c78/listen',
        controlUrl:
          'https://phone-call-websocket.aws-us-west-2-backend-production3.vapi.ai/cdc139ab-9b34-456d-aa96-66883d752c78/control',
      },
      transport: {
        assistantVideoEnabled: false,
      },
    });
  }

  getCallHistoryLists(): Observable<ICallReportLists[]> {
    return of([
      {
        type: 'web_call',
        callStatus: 'ended',
        from: 'NA',
        to: 'NA',
        callDuration: '00:50',
        cost: 0.1117,
        createdAt: '06-03-2025 22:04',
        callOutcome: 'Meeting Booked',
        callSentiment: 'Positive',
        disconnectionReason: 'Failed',
        followUpStatus: 'No Followup',
        objectiveAchievement: 'Achieved',
        _id: '8b8137cf-7d33-461f-9414-4ebe8e4e1fb4',
        keyInformation: 'NA',
      },
      {
        type: 'batch_call',
        callStatus: 'ended',
        from: '+12183062189',
        to: '+919313248405',
        callDuration: '00:42',
        cost: 0.0782,
        createdAt: '02-03-2025 18:24',
        callOutcome: 'Call Completed Normally',
        callSentiment: 'Neutral',
        disconnectionReason: 'Failed',
        followUpStatus: 'Timely Follow Up',
        objectiveAchievement: 'Not Achieved',
        _id: '8d0eaa7e-2808-490c-92e5-40e985955f6d',
        keyInformation: 'NA',
      },
    ]);
  }
}
