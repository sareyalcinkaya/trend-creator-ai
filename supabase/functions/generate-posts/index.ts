import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const platformGuidelines: Record<string, string> = {
  linkedin: 'Professional tone, 1300 characters max, use line breaks for readability, include 3-5 relevant hashtags at the end',
  twitter: 'Concise and punchy, 280 characters max including hashtags, use 1-3 hashtags',
  threads: 'Conversational and authentic, up to 500 characters, minimal hashtags (1-2)',
  bluesky: 'Casual and community-focused, 300 characters max, use 1-2 relevant hashtags',
};

const personalityStyles: Record<string, string> = {
  professional: 'authoritative, data-driven, uses industry terminology, maintains credibility',
  witty: 'clever wordplay, subtle humor, engaging hooks, memorable punchlines',
  inspirational: 'uplifting, motivational, uses metaphors, calls to action',
  direct: 'bold statements, no fluff, provocative takes, straight to the point',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { trend, personality, platforms, additionalContext } = await req.json();

    const posts = await Promise.all(
      platforms.map(async (platform: string) => {
        const guidelines = platformGuidelines[platform] || platformGuidelines.twitter;
        const style = personalityStyles[personality] || personalityStyles.professional;

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
                content: `You are an expert social media content creator. Generate engaging posts optimized for each platform. Return JSON only, no markdown.`
              },
              {
                role: 'user',
                content: `Create a ${platform} post about this trending topic:
                
Topic: ${trend.title}
Hashtag: ${trend.hashtag}
Category: ${trend.category}

Platform guidelines: ${guidelines}
Writing style: ${style}
${additionalContext ? `Additional context from user: ${additionalContext}` : ''}

Return JSON with this exact structure:
{
  "platform": "${platform}",
  "content": "The main post content without hashtags",
  "hashtags": ["hashtag1", "hashtag2"],
  "estimatedReach": "10K-50K"
}

Make the content authentic, engaging, and optimized for the platform. The estimated reach should be realistic based on the trend's popularity.`
              }
            ],
            temperature: 0.9,
          }),
        });

        const data = await response.json();
        const content = data.choices[0].message.content;

        // Parse the JSON from the response
        let post;
        try {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            post = JSON.parse(jsonMatch[0]);
          } else {
            post = JSON.parse(content);
          }
        } catch (parseError) {
          console.error('Parse error for platform', platform, ':', parseError);
          // Fallback structure
          post = {
            platform,
            content: `Check out the latest on ${trend.title}! ${trend.hashtag}`,
            hashtags: [trend.hashtag.replace('#', '')],
            estimatedReach: '5K-15K'
          };
        }

        return post;
      })
    );

    return new Response(JSON.stringify({ posts }), {
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
