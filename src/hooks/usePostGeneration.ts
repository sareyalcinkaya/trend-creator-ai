import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Trend, Platform, GeneratedPost } from '@/lib/constants';
import { toast } from 'sonner';

export const usePostGeneration = () => {
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePosts = async (
    trend: Trend,
    personality: string,
    platforms: Platform[],
    additionalContext: string
  ) => {
    if (!trend || !personality || platforms.length === 0) {
      toast.error('Please select a trend, personality, and at least one platform.');
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-posts', {
        body: { trend, personality, platforms, additionalContext },
      });

      if (error) throw error;

      if (data?.posts && Array.isArray(data.posts)) {
        setGeneratedPosts(data.posts);
        toast.success('Posts generated successfully!');
      }
    } catch (error) {
      console.error('Error generating posts:', error);
      toast.error('Failed to generate posts. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearPosts = () => {
    setGeneratedPosts([]);
  };

  return {
    generatedPosts,
    isGenerating,
    generatePosts,
    clearPosts,
  };
};
