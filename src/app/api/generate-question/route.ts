// pages/api/completion.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { getDataFromJson } from '@/utils/helpers';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const runtime = 'edge';
const MODEL_NAME = "gemini-1.0-pro";

// Build a prompt
function buildPrompt(title: string, about: string, keywords: string[],exclude: string[]) {
  return {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Generate question topic and content related to topic for a ${title} test. Use the given title, keywords, and about section to generate relevant content. Also given the excluded topics, give topics not including those in the excluded topics

Title: '${title}'

About: '${about}'

Keywords: [${keywords.map((kw) => `'${kw}'`).join(', ')}]

excluded topics: [${exclude.map((kw) => `'${kw}'`).join(', ')}]

I need you to provide a response in strict JSON format. Do not include any additional text or formatting other than the JSON data. The JSON output should be a valid object with the following structure:

[{
  "topic": "",
  "content": ""
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
    const { title, about, keywords,exclude } = await req.json();
    console.log({ title, about, keywords ,exclude})
  try {
    // Extract the prompt parameters from the request body

    // Build the prompt
    const prompt = buildPrompt(title, about, keywords,exclude);
    console.log(prompt);

    // Request the Google API for the response based on the prompt
    const response = await genAI
      .getGenerativeModel({ model: MODEL_NAME })
      .generateContentStream(prompt);

      const t = (await response.response).text()
      const data = await getDataFromJson(t);

      return new NextResponse(data, { status: 200 });
      
    //   // Convert the response into a friendly text-stream
    //   const stream = GoogleGenerativeAIStream(response);
    //   console.log(stream)
    // // Respond with the stream
    // return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error generating response:', error);

    // Retry the request up to 3 times
    for (let i = 0; i < 3; i++) {
      try {
        // Build the prompt
        const prompt = buildPrompt(title, about, keywords);

        // Request the Google API for the response based on the prompt
        const response = await genAI
          .getGenerativeModel({ model: 'gemini-1.5-pro-latest' })
          .generateContentStream(prompt);

        // Convert the response into a friendly text-stream
        const stream = GoogleGenerativeAIStream(response);

        // Respond with the stream
        return new StreamingTextResponse(stream);
      } catch (retryError) {
        console.error(`Retry attempt ${i + 1} failed:`, retryError);
        if (i === 2) {
          // If all 3 retries fail, return an error response
          return NextResponse.json(
            { error: 'Failed to generate response from AI' },
            { status: 500 }
          );
        }
      }
    }
  }
}