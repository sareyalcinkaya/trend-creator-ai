import { Linkedin, Twitter, Hash, Cloud, TrendingUp, Sparkles, Users, Zap } from 'lucide-react';

export type Platform = 'linkedin' | 'twitter' | 'threads' | 'bluesky';

export interface Trend {
  id: string;
  title: string;
  hashtag: string;
  engagement: string;
  growth: string;
  platform: Platform;
  category: string;
}

export interface GeneratedPost {
  platform: Platform;
  content: string;
  hashtags: string[];
  estimatedReach: string;
}

export const platforms = [
  { id: 'linkedin' as Platform, name: 'LinkedIn', icon: Linkedin, color: 'linkedin' },
  { id: 'twitter' as Platform, name: 'Twitter/X', icon: Twitter, color: 'twitter' },
  { id: 'threads' as Platform, name: 'Threads', icon: Hash, color: 'threads' },
  { id: 'bluesky' as Platform, name: 'Bluesky', icon: Cloud, color: 'bluesky' },
];

export const mockTrends: Trend[] = [
  {
    id: '1',
    title: 'AI in Enterprise',
    hashtag: '#AITransformation',
    engagement: '2.4M',
    growth: '+156%',
    platform: 'linkedin',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Remote Work Evolution',
    hashtag: '#FutureOfWork',
    engagement: '1.8M',
    growth: '+89%',
    platform: 'twitter',
    category: 'Business',
  },
  {
    id: '3',
    title: 'Sustainable Tech',
    hashtag: '#GreenTech',
    engagement: '945K',
    growth: '+67%',
    platform: 'threads',
    category: 'Environment',
  },
  {
    id: '4',
    title: 'Creator Economy',
    hashtag: '#CreatorFirst',
    engagement: '1.2M',
    growth: '+124%',
    platform: 'bluesky',
    category: 'Social',
  },
  {
    id: '5',
    title: 'Web3 Renaissance',
    hashtag: '#Web3',
    engagement: '3.1M',
    growth: '+203%',
    platform: 'twitter',
    category: 'Technology',
  },
  {
    id: '6',
    title: 'Leadership in Crisis',
    hashtag: '#LeadershipMatters',
    engagement: '678K',
    growth: '+45%',
    platform: 'linkedin',
    category: 'Business',
  },
];

export const personalityTraits = [
  { id: 'professional', label: 'Professional', icon: Users },
  { id: 'witty', label: 'Witty & Humorous', icon: Sparkles },
  { id: 'inspirational', label: 'Inspirational', icon: TrendingUp },
  { id: 'direct', label: 'Direct & Bold', icon: Zap },
];
