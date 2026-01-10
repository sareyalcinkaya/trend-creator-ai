import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Real-time trend analysis across platforms</span>
          </motion.div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Turn <span className="gradient-text">Trends</span> Into
            <br />
            Your Voice
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Discover what's trending across LinkedIn, Twitter, Threads & Bluesky. 
            Generate personalized content that sounds like you.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => document.getElementById('trends')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 rounded-lg font-semibold overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent opacity-100 group-hover:opacity-90 transition-opacity" />
              <span className="relative z-10 text-primary-foreground">Explore Trends</span>
            </button>
            
            <button 
              onClick={() => document.getElementById('personality')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-lg font-semibold glass-card hover:bg-secondary/50 transition-colors"
            >
              Set Your Personality
            </button>
          </motion.div>
        </motion.div>
        
        {/* Floating platform icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-20 left-0 right-0 flex justify-center gap-8"
        >
          {['linkedin', 'twitter', 'threads', 'bluesky'].map((platform, i) => (
            <motion.div
              key={platform}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center"
            >
              <div className={`w-6 h-6 rounded-full bg-${platform === 'threads' ? 'foreground' : platform}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
