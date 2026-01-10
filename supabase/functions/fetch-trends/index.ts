import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { platforms } = await req.json();
    
    const platformList = platforms.length > 0 ? platforms.join(', ') : 'LinkedIn, Twitter/X, Threads, Bluesky';
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content: `You are a social media trend analyst. Generate 6 realistic trending topics that are currently popular on social media platforms. Return JSON only, no markdown.`
          },
          {
            role: 'user',
            content: `Generate 6 trending topics for these platforms: ${platformList}. 
            
Return a JSON array with this exact structure:
[
  {
    "id": "unique-id",
    "title": "Trend Title",
    "hashtag": "#Hashtag",
    "engagement": "1.2M",
    "growth": "+89%",
    "platform": "linkedin|twitter|threads|bluesky",
    "category": "Technology|Business|Entertainment|Social|Environment|Health"
  }
]

Make the trends realistic, current, and varied across categories. Include a mix of tech, business, social, and cultural topics. The engagement should be realistic numbers (K or M). Growth should be between +20% and +300%.`
          }
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON from the response
    let trends;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        trends = JSON.parse(jsonMatch[0]);
      } else {
        trends = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Raw content:', content);
      throw new Error('Failed to parse AI response');
    }

    return new Response(JSON.stringify({ trends }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
