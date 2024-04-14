// pages/api/completion.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { getDataFromJson } from '@/utils/helpers';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const runtime = 'edge';
const MODEL_NAME = "gemini-1.0-pro";

// Build a prompt
function buildPrompt(title: string, about: string, topic: string, content: string) {
  return {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Generate a  general question title, content and referenceAnswer - that can be answerable through speech, for a question with topic & content which is for a test with testtitle and testabout. Use the given questiontopic, questioncontent and testtitle and testabout section to generate relevant content.

            TestTitle: '${title}'
            
            TestAbout: '${about}'
            
            Questiontopic:"${topic}",
            
            questioncontent:"${content}"
            
            I need you to provide a response in strict JSON format. Do not include any additional text or formatting other than the JSON data. The JSON output should be a valid object with the following structure:
            
            [{
              "title": "general question related to the above question topic that can be answerable through speech",
              "content": "something like - what is your opinion on this/ tell some examples/ some general content related to the above question topic and subquestion title that can be answerable by speech",
              "referenceAnswer":"what would be the refernce answer(in form of text) to compare i.e ideal answer one can speak"
              }]
            
            Please respond with the JSON data only, without any other text.`,
          },
        ],
      },
    ],
  };
}

const generation_config = {
  "temperature": 0,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

export async function POST(req: Request) {
  const { title, about, topic, content } = await req.json();
  console.log({ title, about, topic, content })
  try {
    // Extract the prompt parameters from the request body

    // Build the prompt
    const prompt = buildPrompt(title, about, topic, content);
    //onsole.log(prompt);

    // Request the Google API for the response based on the prompt
    const response = await genAI
      .getGenerativeModel({ model: MODEL_NAME })
      .generateContentStream(prompt);

    const t = (await response.response).text()
    const data = await getDataFromJson(t);
    console.log(data)

    return new NextResponse(data, { status: 200 });

    //   // Convert the response into a friendly text-stream
    //   const stream = GoogleGenerativeAIStream(response);
    //   console.log(stream)
    // // Respond with the stream
    // return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error generating response:', error);

    // Retry the request up to 3 times
    // for (let i = 0; i < 2; i++) {
    //   try {
    //     // Build the prompt
    //     const prompt = buildPrompt(title, about, keywords,exclude);

    //     // Request the Google API for the response based on the prompt
    //     const response = await genAI
    //       .getGenerativeModel({ model: 'gemini-1.5-pro-latest' })
    //       .generateContentStream(prompt);

    //     // Convert the response into a friendly text-stream
    //     const stream = GoogleGenerativeAIStream(response);

    //     // Respond with the stream
    //     return new StreamingTextResponse(stream);
    //   } catch (retryError) {
    //     console.error(`Retry attempt ${i + 1} failed:`, retryError);
    //     if (i === 2) {
    //       // If all 3 retries fail, return an error response
    //     }
    //   }
    // }
    return NextResponse.json(
      { error: 'Failed to generate response from AI' },
      { status: 500 }
    );
  }
}