import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { Trend, platforms } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface TrendCardProps {
  trend: Trend;
  index: number;
  onSelect: (trend: Trend) => void;
  isSelected: boolean;
}

const TrendCard = ({ trend, index, onSelect, isSelected }: TrendCardProps) => {
  const platform = platforms.find(p => p.id === trend.platform);
  const Icon = platform?.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(trend)}
      className={cn(
        'relative p-6 rounded-2xl cursor-pointer transition-all duration-300',
        'border',
        isSelected 
          ? 'gradient-border glow-effect' 
          : 'glass-card border-border hover:border-primary/30'
      )}
    >
      {/* Platform badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium',
          trend.platform === 'linkedin' && 'bg-linkedin/20 text-linkedin',
          trend.platform === 'twitter' && 'bg-twitter/20 text-twitter',
          trend.platform === 'threads' && 'bg-foreground/10 text-foreground',
          trend.platform === 'bluesky' && 'bg-bluesky/20 text-bluesky',
        )}>
          {Icon && <Icon className="w-3 h-3" />}
          {platform?.name}
        </div>
        
        <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          {trend.growth}
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 font-display">{trend.title}</h3>
      <p className="text-primary font-medium mb-4">{trend.hashtag}</p>
      
      {/* Stats */}
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          <span className="text-foreground font-semibold">{trend.engagement}</span> engagements
        </div>
        
        <span className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
          {trend.category}
        </span>
      </div>
      
      {/* Hover arrow */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute top-6 right-6"
      >
        <ArrowUpRight className="w-5 h-5 text-primary" />
      </motion.div>
    </motion.div>
  );
};

export default TrendCard;
