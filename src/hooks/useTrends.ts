import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Trend, Platform, mockTrends } from '@/lib/constants';
import { toast } from 'sonner';

export const useTrends = () => {
  const [trends, setTrends] = useState<Trend[]>(mockTrends);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchTrends = useCallback(async (platforms: Platform[]) => {
    if (platforms.length === 0) {
      setTrends([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-trends', {
        body: { platforms },
      });

      if (error) throw error;

      if (data?.trends && Array.isArray(data.trends)) {
        // Filter trends to only include selected platforms
        const filteredTrends = data.trends.filter((t: Trend) => 
          platforms.includes(t.platform)
        );
        setTrends(filteredTrends);
        setLastFetched(new Date());
        toast.success('Trends refreshed!');
      }
    } catch (error) {
      console.error('Error fetching trends:', error);
      toast.error('Failed to fetch trends. Using cached data.');
      // Fall back to mock trends filtered by platform
      setTrends(mockTrends.filter(t => platforms.includes(t.platform)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    trends,
    isLoading,
    lastFetched,
    fetchTrends,
  };
};
