import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import PlatformSelector from '@/components/PlatformSelector';
import TrendCard from '@/components/TrendCard';
import PersonalitySelector from '@/components/PersonalitySelector';
import GeneratedPostCard from '@/components/GeneratedPostCard';
import { mockTrends, Platform, Trend, GeneratedPost } from '@/lib/constants';

const Index = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['linkedin', 'twitter']);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [personality, setPersonality] = useState<string | null>('professional');
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };
  
  const filteredTrends = mockTrends.filter(t => selectedPlatforms.includes(t.platform));
  
  const handleGenerate = async () => {
    if (!selectedTrend || !personality) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPosts: GeneratedPost[] = selectedPlatforms.map(platform => ({
      platform,
      content: getContentForPlatform(platform, selectedTrend, personality),
      hashtags: [selectedTrend.hashtag, '#Innovation', '#Future'],
      estimatedReach: `${Math.floor(Math.random() * 50 + 10)}K`,
    }));
    
    setGeneratedPosts(mockPosts);
    setIsGenerating(false);
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
              Real-time trends across your favorite platforms. Click on a trend to generate personalized content.
            </p>
          </motion.div>
          
          <div className="mb-10">
            <PlatformSelector 
              selected={selectedPlatforms} 
              onToggle={handlePlatformToggle} 
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTrends.map((trend, index) => (
                <TrendCard
                  key={trend.id}
                  trend={trend}
                  index={index}
                  onSelect={setSelectedTrend}
                  isSelected={selectedTrend?.id === trend.id}
                />
              ))}
            </AnimatePresence>
          </div>
          
          {filteredTrends.length === 0 && (
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
                    Generating...
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
            Built with AI to amplify your voice across social media.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Helper function to generate mock content
function getContentForPlatform(platform: Platform, trend: Trend, personality: string): string {
  const contents: Record<string, Record<Platform, string>> = {
    professional: {
      linkedin: `The rise of ${trend.title} is reshaping how we think about business.\n\nHere's what forward-thinking leaders need to know:\n\n1. Early adopters are seeing 3x faster results\n2. The integration challenges are real—but solvable\n3. The ROI potential is undeniable\n\nI've been diving deep into this space, and the opportunities are immense for those willing to adapt.`,
      twitter: `${trend.title} is having a moment—and for good reason.\n\nThe companies paying attention now will be the ones leading in 2025.\n\nHere's my take on why this matters 🧵`,
      threads: `Something interesting about ${trend.title}...\n\nI've noticed more conversations shifting toward this in my circles. The momentum is real.\n\nWhat's your experience been?`,
      bluesky: `The ${trend.title} wave is here.\n\nI'm genuinely excited about the implications for creative work and collaboration.\n\nAnyone else exploring this space? Would love to connect.`,
    },
    witty: {
      linkedin: `Everyone's talking about ${trend.title} like it's the new sliced bread.\n\nPlot twist: It might actually be better than sliced bread. 🍞\n\nHere's why I'm cautiously optimistic (and yes, I'm aware of the irony of posting about it on LinkedIn):`,
      twitter: `${trend.title} is trending and honestly? I'm here for the chaos.\n\nRemember when we thought [previous trend] was peak? Sweet summer child vibes. 😅`,
      threads: `Hot take: ${trend.title} is either the future or the most elaborate group project procrastination ever.\n\nNo middle ground. Pick your side.`,
      bluesky: `Joined the ${trend.title} conversation and my take is: ✨vibes✨\n\n(But also, there's actually some substance here if you look past the hype)`,
    },
    inspirational: {
      linkedin: `${trend.title} reminds us of something powerful:\n\nChange isn't coming—it's here.\n\nThe question isn't whether to adapt. It's whether you'll lead the change or follow it.\n\nEvery breakthrough starts with someone who saw possibility where others saw uncertainty.`,
      twitter: `${trend.title} is more than a trend.\n\nIt's a reminder that the future belongs to those bold enough to build it. ✨\n\nWhat will you create?`,
      threads: `There's something beautiful about moments like ${trend.title}.\n\nWe're all figuring it out together. And that's exactly where magic happens.`,
      bluesky: `${trend.title} represents what I love most about our collective creativity.\n\nWe keep finding new ways to connect, create, and evolve. That's worth celebrating.`,
    },
    direct: {
      linkedin: `${trend.title}. Let's cut through the noise.\n\nWhat it is: A fundamental shift in how we approach [topic].\nWhat it isn't: A silver bullet.\n\nThe reality? Those who move fast will win. Those who wait will catch up—maybe.`,
      twitter: `${trend.title}:\n\n✓ Real opportunity\n✗ Overhyped BS\n✓ Worth your attention\n✗ Worth your panic\n\nSimple as that.`,
      threads: `Everyone's overcomplicating ${trend.title}.\n\nThe core insight: [Thing] is changing. Adapt or don't. But don't pretend you weren't warned.`,
      bluesky: `${trend.title} in plain English:\n\nDo this → Get results.\nIgnore this → Get left behind.\n\nQuestions? DM me.`,
    },
  };
  
  return contents[personality]?.[platform] || contents.professional[platform];
}

export default Index;
