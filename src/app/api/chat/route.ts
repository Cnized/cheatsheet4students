import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await fetch(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<|system|>You are a helpful AI assistant. Provide accurate and relevant information.
<|user|>${message}
<|assistant|>`,
          parameters: {
            max_new_tokens: 1000,
            temperature: 0.7,
            top_p: 0.95,
            repetition_penalty: 1.15
          }
        }),
      }
    );

    const data = await response.json();
    let answer = data[0].generated_text;
    
    // Clean up the response
    answer = answer.split('<|assistant|>').pop() || answer;
    answer = answer.split('<|user|>')[0] || answer;
    answer = answer.trim();

    return NextResponse.json({ message: answer });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}