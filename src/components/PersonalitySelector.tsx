import { motion } from 'framer-motion';
import { personalityTraits } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PersonalitySelectorProps {
  selected: string | null;
  onSelect: (trait: string) => void;
  additionalContext: string;
  onContextChange: (value: string) => void;
}

const PersonalitySelector = ({ 
  selected, 
  onSelect, 
  additionalContext, 
  onContextChange 
}: PersonalitySelectorProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {personalityTraits.map((trait, index) => {
          const Icon = trait.icon;
          const isSelected = selected === trait.id;
          
          return (
            <motion.button
              key={trait.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(trait.id)}
              className={cn(
                'relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300',
                'border',
                isSelected 
                  ? 'gradient-border glow-effect bg-card' 
                  : 'glass-card border-border hover:border-primary/30'
              )}
            >
              <div className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center transition-all',
                isSelected 
                  ? 'bg-gradient-to-br from-primary to-accent' 
                  : 'bg-secondary'
              )}>
                <Icon className={cn(
                  'w-7 h-7',
                  isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
                )} />
              </div>
              
              <span className={cn(
                'font-medium text-sm transition-colors',
                isSelected ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {trait.label}
              </span>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Additional context input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <label className="text-sm font-medium text-muted-foreground">
          Tell us more about your style (optional)
        </label>
        <textarea
          value={additionalContext}
          onChange={(e) => onContextChange(e.target.value)}
          placeholder="E.g., I'm a tech founder who loves using analogies. I often reference pop culture and keep things conversational..."
          className="w-full h-32 px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none text-foreground placeholder:text-muted-foreground/50"
        />
      </motion.div>
    </div>
  );
};

export default PersonalitySelector;
