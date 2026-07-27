export async function callGeminiAI(prompt: string, systemInstruction: string = ''): Promise<string | null> {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gemini_start'));
  }
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, systemInstruction })
    });

    const data = await res.json();
    if (data.success && data.text) {
      return data.text;
    }
    console.warn('Gemini API Error:', data.error);
    return null;
  } catch (err) {
    console.error('Failed calling Gemini API endpoint:', err);
    return null;
  } finally {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gemini_end'));
    }
  }
}
