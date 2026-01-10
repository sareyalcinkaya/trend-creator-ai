import { motion } from 'framer-motion';
import { platforms, Platform } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PlatformSelectorProps {
  selected: Platform[];
  onToggle: (platform: Platform) => void;
}

const PlatformSelector = ({ selected, onToggle }: PlatformSelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {platforms.map((platform, index) => {
        const Icon = platform.icon;
        const isSelected = selected.includes(platform.id);
        
        return (
          <motion.button
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onToggle(platform.id)}
            className={cn(
              'relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300',
              'border',
              isSelected 
                ? 'glass-card border-primary/50 shadow-lg' 
                : 'bg-secondary/30 border-border hover:border-primary/30'
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="platform-glow"
                className="absolute inset-0 rounded-xl bg-primary/10"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            
            <Icon 
              className={cn(
                'w-5 h-5 relative z-10 transition-colors',
                isSelected ? 'text-primary' : 'text-muted-foreground'
              )} 
            />
            <span className={cn(
              'font-medium relative z-10 transition-colors',
              isSelected ? 'text-foreground' : 'text-muted-foreground'
            )}>
              {platform.name}
            </span>
            
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default PlatformSelector;
