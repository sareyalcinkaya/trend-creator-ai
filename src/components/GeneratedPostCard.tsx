import { motion } from 'framer-motion';
import { Copy, Share2, Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { GeneratedPost, platforms } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface GeneratedPostCardProps {
  post: GeneratedPost;
  index: number;
}

const GeneratedPostCard = ({ post, index }: GeneratedPostCardProps) => {
  const platform = platforms.find(p => p.id === post.platform);
  const Icon = platform?.icon;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(post.content + '\n\n' + post.hashtags.join(' '));
    toast.success('Post copied to clipboard!');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      className="glass-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
          post.platform === 'linkedin' && 'bg-linkedin/20 text-linkedin',
          post.platform === 'twitter' && 'bg-twitter/20 text-twitter',
          post.platform === 'threads' && 'bg-foreground/10 text-foreground',
          post.platform === 'bluesky' && 'bg-bluesky/20 text-bluesky',
        )}>
          {Icon && <Icon className="w-4 h-4" />}
          {platform?.name}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Copy className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      {/* Post content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
      
      {/* Hashtags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.hashtags.map((tag, i) => (
          <span key={i} className="text-primary text-sm">
            {tag}
          </span>
        ))}
      </div>
      
      {/* Mock engagement preview */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs">—</span>
            </button>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">—</span>
            </button>
            <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
              <Repeat2 className="w-4 h-4" />
              <span className="text-xs">—</span>
            </button>
          </div>
          
          <span className="text-xs text-muted-foreground">
            Est. reach: <span className="text-foreground font-medium">{post.estimatedReach}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default GeneratedPostCard;
