import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",  // Using GPT-2 - very stable
      {
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_new_tokens: 250,
            return_full_text: false
          }
        })
      }
    );

    const result = await response.json();
    return NextResponse.json({ message: result[0].generated_text });
    
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'AI service temporarily unavailable' }, { status: 500 });
  }
}