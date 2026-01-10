import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import PlatformSelector from '@/components/PlatformSelector';
import TrendCard from '@/components/TrendCard';
import PersonalitySelector from '@/components/PersonalitySelector';
import GeneratedPostCard from '@/components/GeneratedPostCard';
import { Platform, Trend } from '@/lib/constants';
import { useTrends } from '@/hooks/useTrends';
import { usePostGeneration } from '@/hooks/usePostGeneration';

const Index = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['linkedin', 'twitter']);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [personality, setPersonality] = useState<string | null>('professional');
  const [additionalContext, setAdditionalContext] = useState('');
  
  const { trends, isLoading: isTrendsLoading, fetchTrends } = useTrends();
  const { generatedPosts, isGenerating, generatePosts } = usePostGeneration();
  
  // Fetch trends on initial load and when platforms change
  useEffect(() => {
    fetchTrends(selectedPlatforms);
  }, []);
  
  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev => {
      const newPlatforms = prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform];
      return newPlatforms;
    });
    setSelectedTrend(null);
  };
  
  const filteredTrends = trends.filter(t => selectedPlatforms.includes(t.platform));
  
  const handleRefreshTrends = () => {
    fetchTrends(selectedPlatforms);
    setSelectedTrend(null);
  };
  
  const handleGenerate = async () => {
    if (!selectedTrend || !personality) return;
    await generatePosts(selectedTrend, personality, selectedPlatforms, additionalContext);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Trends Section */}
      <section id="trends" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What's <span className="gradient-text">Trending</span> Now
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              AI-powered trends across your favorite platforms. Click on a trend to generate personalized content.
            </p>
          </motion.div>
          
          <div className="mb-10 flex flex-col items-center gap-4">
            <PlatformSelector 
              selected={selectedPlatforms} 
              onToggle={handlePlatformToggle} 
            />
            <button
              onClick={handleRefreshTrends}
              disabled={isTrendsLoading || selectedPlatforms.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:bg-accent/10 transition-colors disabled:opacity-50"
            >
              {isTrendsLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Fetching Trends...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Refresh Trends
                </>
              )}
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {isTrendsLoading ? (
                // Loading skeleton
                [...Array(6)].map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-6 rounded-2xl animate-pulse"
                  >
                    <div className="h-4 bg-muted rounded w-24 mb-4" />
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </motion.div>
                ))
              ) : (
                filteredTrends.map((trend, index) => (
                  <TrendCard
                    key={trend.id}
                    trend={trend}
                    index={index}
                    onSelect={setSelectedTrend}
                    isSelected={selectedTrend?.id === trend.id}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
          
          {!isTrendsLoading && filteredTrends.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground">Select at least one platform to see trends.</p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Personality Section */}
      <section id="personality" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.02] to-background pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Define Your <span className="gradient-text">Voice</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              How should your posts sound? Pick a personality trait that matches your brand.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <PersonalitySelector
              selected={personality}
              onSelect={setPersonality}
              additionalContext={additionalContext}
              onContextChange={setAdditionalContext}
            />
          </div>
        </div>
      </section>
      
      {/* Generate Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Generate <span className="gradient-text">Your Posts</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {selectedTrend 
                ? `Creating content for "${selectedTrend.title}" with your ${personality || 'selected'} personality.`
                : 'Select a trend above to generate personalized posts.'}
            </p>
            
            <button
              onClick={handleGenerate}
              disabled={!selectedTrend || !personality || isGenerating}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent opacity-100 group-hover:opacity-90 group-disabled:opacity-50 transition-opacity" />
              <span className="relative z-10 text-primary-foreground flex items-center gap-2">
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating with AI...
                  </>
                ) : generatedPosts.length > 0 ? (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Regenerate Posts
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Posts
                  </>
                )}
              </span>
            </button>
          </motion.div>
          
          {/* Generated Posts */}
          <AnimatePresence>
            {generatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
              >
                {generatedPosts.map((post, index) => (
                  <GeneratedPostCard key={post.platform} post={post} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Powered by AI to amplify your voice across social media.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
