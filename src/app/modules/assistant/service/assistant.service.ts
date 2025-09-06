import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAssistant, IAssistantList } from '../model/assistant.model';
@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  getAssistantById(id: string): Observable<IAssistant> {
    id = id;
    return of<IAssistant>({
      _id: '687077b967147df8dc46bcdf',
      assistantId: '099fcd13-76b0-4fac-8025-9cf446f8ec73',
      user: '67aa3e99b22c7966a461a0ab',
      assistantModel: 'chatgpt-4o-latest',
      assistantName: 'tt',
      created_at: new Date('2025-07-11T02:32:25.669Z'),
      updated_at: new Date('2025-08-24T11:05:48.373Z'),
      __v: 0,
      voice: {
        model: 'eleven_turbo_v2',
        style: 0,
        voiceId: 'FGY2WhTYpPnrIDTdsKH5',
        provider: '11labs',
        stability: 0.5,
        similarityBoost: 0.75,
        useSpeakerBoost: false,
      },
      model: {
        model: 'chatgpt-4o-latest',
        toolIds: [],
        messages: [
          {
            role: 'system',
            content:
              '.....  {{"now" | date: "%b %d, %Y, %I:%M %p", America/New_York}}',
          },
        ],
        provider: 'openai',
        temperature: 0.6,
      },
      firstMessage: 'Hello! How can I assist you today?',
      voicemailMessage: 'this is voice mail message',
      endCallFunctionEnabled: false,
      endCallMessage: 'Thank you , Have a great day!',
      transcriber: {
        model: 'nova-2-general',
        keywords: [],
        language: 'en',
        provider: 'deepgram',
      },
      silenceTimeoutSeconds: 60,
      clientMessages: ['status-update', 'tool-calls', 'tool-calls-result'],
      serverMessages: [
        'status-update',
        'end-of-call-report',
        'hang',
        'tool-calls',
        'transfer-destination-request',
      ],
      maxDurationSeconds: 157,
      backgroundSound: 'off',
      firstMessageMode: 'assistant-speaks-first',
      analysisPlan: {
        summaryPlan: {
          enabled: true,
          messages: [
            {
              content:
                'Summarize the provided call transcript in a concise, universally applicable format, ensuring the summary is brief and to the point. Include the following:\n1. *Purpose of the Call:* Clearly state the objective in 2–3 sentences.\n2. *Key Points Discussed:* Highlight the most critical topics or exchanges in 2–3 bullet points.\n3. *Agreed Actions:* Summarize commitments or next steps in 1–2 bullet points.\n4. *Tone and Sentiment:* Briefly describe the overall mood (e.g., positive, neutral, or negative).\n5. *Follow-up Requirements:* State if follow-up is needed and what it entails (if applicable).\nEnsure the summary is professional, easy to read, and no longer than 6–7 sentences.',
              role: 'system',
            },
            {
              content: 'Here is the transcript:\n\n{{transcript}}\n\n',
              role: 'user',
            },
          ],
          timeoutSeconds: 60,
        },
        structuredDataPlan: {
          enabled: true,
          schema: {
            type: 'object',
            required: [
              'callOutcome',
              'callSentiment',
              'objectiveAchievement',
              'followUpStatus',
            ],
            properties: {
              callOutcome: {
                type: 'string',
                enum: [
                  'meeting_booked',
                  'not_interested',
                  'wrong_person_picked',
                  'person_is_busy',
                  'user_requested_callback_later',
                  'interested_but_not_now',
                  'escalated',
                  'do_not_call',
                  'call_completed_normally',
                  'other',
                ],
              },
              callSentiment: {
                type: 'string',
                enum: ['positive', 'neutral', 'negative'],
              },
              followUpStatus: {
                type: 'string',
                enum: ['urgent_follow_up', 'timely_follow_up', 'no_followup'],
              },
              keyInformation: {
                type: 'object',
                properties: {
                  capturedInfo: {
                    description: 'Brief summary of key information captured',
                    type: 'string',
                  },
                },
              },
              decisionTracking: {
                type: 'object',
                properties: {
                  interestLevel: {
                    type: 'string',
                    enum: ['high', 'medium', 'low'],
                  },
                },
              },
              objectiveAchievement: {
                type: 'string',
                enum: ['achieved', 'partially_achieved', 'not_achieved'],
              },
            },
          },
          messages: [
            {
              content:
                'Extract the following data from the call transcript:\n\n1. Call Outcome\n2. Call Sentiment\n3. Objective Achievement\n4. Follow-up Requirements\n5. Key Information Captured\n\nSchema: {{schema}}',
              role: 'system',
            },
            {
              content: 'Here is the transcript:\n\n{{transcript}}\n\n',
              role: 'user',
            },
          ],
          timeoutSeconds: 60,
        },
        successEvaluationPlan: {
          enabled: true,
          rubric: 'Matrix',
          messages: [
            {
              content:
                'You are an expert call evaluator. Analyze the provided call transcript and generate a clear, actionable evaluation using the following framework:\n\n## Call Overview\n- Primary Objective Achievement: [Achieved/Partially Achieved/Not Achieved]\n- Key Discussion Points: [Main topics/concerns discussed]\n- Customer Interest Level: [High/Medium/Low]\n- Follow-up Required: [Yes/No]\n\nCall Impact:\n- Decision Stage: [Initial Interest/Considering/Ready to Proceed/Not Interested]\n- Information Quality: [Complete/Partial/Insufficient]\n- Relationship Building: [Strong/Moderate/Weak]\n\n## Core Evaluation Criteria\nRate each criterion: Excellent, Good, Average, Fair, Poor\n\n1. Opening Effectiveness (Rating: _)\n   - Professional introduction\n   - Clear purpose statement\n   - Initial rapport building\n   Examples from call:\n   Areas for improvement:\n\n2. Customer Engagement (Rating: _)\n   - Question quality\n   - Active listening\n   - Response adaptation\n   Examples from call:\n   Areas for improvement:\n\n3. Solution Delivery (Rating: _)\n   - Clear explanation\n   - Value communication\n   - Needs alignment\n   Examples from call:\n   Areas for improvement:\n\n4. Call Management (Rating: _)\n   - Conversation flow\n   - Time management\n   - Objection handling\n   Examples from call:\n   Areas for improvement:\n\n5. Closing Effectiveness (Rating: _)\n   - Clear next steps\n   - Commitment securing\n   - Professional wrap-up\n   Examples from call:\n   Areas for improvement:\n\n## Success Metrics\nOverall Performance: [Calculate based on majority rating]\nExample: Good (3 criteria rated Good, 2 rated Excellent)\n\n## Key Takeaways\nTop 3 Strengths:\n1. [Specific strength with example]\n2. [Specific strength with example]\n3. [Specific strength with example]\n\nPriority Improvements:\n1. [Specific improvement area with recommendation]\n2. [Specific improvement area with recommendation]\n\n## Recommended Actions\n[3-4 bullet points of specific, actionable next steps]\n\n---\nRating Definitions:\n- Excellent: Consistently exceeds expectations with outstanding performance\n- Good: Meets all requirements effectively with some standout moments\n- Average: Meets basic requirements with room for improvement\n- Fair: Falls short of requirements in several areas\n- Poor: Significant improvement needed in most areas\n\nEvaluation Guidelines:\n1. Focus on objective observations from the transcript\n2. Provide specific examples for each criterion\n3. Keep feedback constructive and actionable\n4. Consider industry context while maintaining universal applicability\n5. Ensure recommendations are practical and implementable',
              role: 'system',
            },
            {
              content: 'Here is the transcript:\n\n{{transcript}}\n\n',
              role: 'user',
            },
          ],
          timeoutSeconds: 60,
        },
      },
      voicemailDetection: {
        enabled: false,
        provider: 'twilio',
        voicemailDetectionTypes: [
          'fax',
          'machine_end_beep',
          'machine_end_other',
          'machine_end_silence',
          'machine_start',
          'unknown',
        ],
      },
      backgroundDenoisingEnabled: false,
      artifactPlan: {
        recordingEnabled: true,
      },
      messagePlan: {
        idleMessages: [
          "I'm still here. Do you have any questions?",
          'Are you still there?',
          'Is there anything else you need help with?',
          'Feel free to ask me any questions.',
          'How can I assist you further?',
          "Let me know if there's anything you need.",
          "I'm still here if you need assistance.",
          "I'm ready to help whenever you are.",
          "Is there something specific you're looking for?",
          "I'm here to help with any questions you have.",
          'Would you like me to explain anything in more detail?',
          "Take your time, I'm here to assist.",
          "Please let me know your thoughts when you're ready.",
          'I can rephrase or clarify anything if needed.',
          'Would you like me to wait while you consider?',
        ],
        idleMessageMaxSpokenCount: 3,
        // idleTimeoutSeconds: 9,
      },
      monitorPlan: {
        listenEnabled: true,
        controlEnabled: true,
      },
      server: {
        url: 'my-backend-url',
      },
      isServerUrlSecretSet: false,
    });
  }
  getAssistants() {
    return of<IAssistantList[]>([
      {
        id: '1',
        assistant_name: 'Assistant 1',
        model: 'assistant1',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: '2',
        assistant_name: 'Assistant 2',
        model: 'assistant2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }
}
