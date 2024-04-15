// pages/api/completion.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getDataFromJson } from '@/utils/helpers';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const runtime = 'edge';
const MODEL_NAME = "gemini-1.0-pro";

// Build a prompt
function buildPrompt(text:string,referenceText:string,title:string,content:string) {
  return {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `You are a question answer evaluator and has to provide the relevance percentage in scale of 100. Use the provided  question title , content and the reference Answer for that question to generate relevance percent of the userAnswer in scale of 100 (just the number e.g: 80 )

Question Title : '${title}'
Question Content : '${content}'
Reference Answer : '${referenceText}'

userAnswer: '${text}'


I need you to provide a response in strict JSON format. Do not include any additional text or formatting other than the JSON data. The JSON output should be a valid object with the following structure:

json'''{
  "relevance": number, // (eg: 85)
}'''

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
    const { text,referenceText,title,content } = await req.json();
    // console.log({ text,referenceText,title,content})
  try {
    // Extract the prompt parameters from the request body

    // Build the prompt
    const prompt = buildPrompt(text,referenceText,title,content);
    //console.log(prompt);

    // Request the Google API for the response based on the prompt
    const response = await genAI
      .getGenerativeModel({ model: MODEL_NAME })
      .generateContentStream(prompt);

      const t = (await response.response).text()
      let data = t;
      if(t.startsWith("`")){
        data = await getDataFromJson(t);
      } 
      // data give {...}

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
    //     const prompt = buildPrompt(text,referenceText,title,content);

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