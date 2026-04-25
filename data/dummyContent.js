// Dummy content shown inside the fake apps.
// Each post has a riskType which decides what the Checker pop-up will say.
// riskType values: "reliable", "bias", "low_evidence", "misleading"
// We use plain English so non-CS students can read this file easily.

export const instagramPosts = [
  {
    id: 'ig1',
    user: 'wellness_daily_id',
    avatar: '🌿',
    image: '🥤',
    caption:
      'Viral video claims a new herbal drink can cure serious disease overnight. Doctors are "shocked"!',
    likes: '24,512',
    comments: 1820,
    riskType: 'misleading',
    contentCategory: 'health',
  },
  {
    id: 'ig2',
    user: 'sarah.travels',
    avatar: '🌅',
    image: '🏖️',
    caption: 'Sunset in Bali — taking a break from screens this week. ✨',
    likes: '1,204',
    comments: 38,
    riskType: 'reliable',
    contentCategory: 'lifestyle',
  },
  {
    id: 'ig3',
    user: 'politik_now',
    avatar: '📣',
    image: '🏛️',
    caption:
      'Opinion: Government policy is destroying our future! Share if you agree — they don\'t want you to see this.',
    likes: '8,930',
    comments: 612,
    riskType: 'bias',
    contentCategory: 'political',
  },
];

export const whatsappMessages = [
  {
    id: 'wa1',
    sender: 'Mom',
    avatar: '👩',
    text: 'Good morning everyone! Don\'t forget lunch on Sunday 🍲',
    time: '08:12',
    forwarded: false,
    isMine: false,
    riskType: 'reliable',
    contentCategory: 'family',
  },
  {
    id: 'wa2',
    sender: 'Uncle Budi',
    avatar: '👨',
    text:
      'Forwarded many times: Government will give free money to every citizen if you click this link today! Hurry, only valid 24 hours 👉 bit.ly/free-money-id',
    time: '08:45',
    forwarded: true,
    isMine: false,
    riskType: 'misleading',
    contentCategory: 'scam',
  },
  {
    id: 'wa3',
    sender: 'Sister',
    avatar: '👧',
    text: 'Mom, I\'ll bring the cake 🎂',
    time: '09:02',
    forwarded: false,
    isMine: false,
    riskType: 'reliable',
    contentCategory: 'family',
  },
  {
    id: 'wa4',
    sender: 'You',
    avatar: '🙂',
    text: 'See you all on Sunday!',
    time: '09:05',
    forwarded: false,
    isMine: true,
    riskType: 'reliable',
    contentCategory: 'family',
  },
];

export const twitterPosts = [
  {
    id: 'tw1',
    user: 'ViralUpdates24',
    handle: '@viralupdates24',
    avatar: '🔥',
    text:
      'BREAKING: Famous public figure confirmed dead, according to viral accounts. Details unclear. RT to spread!',
    likes: '12.4K',
    retweets: '8.1K',
    riskType: 'low_evidence',
    contentCategory: 'celebrity',
  },
  {
    id: 'tw2',
    user: 'KompasNews',
    handle: '@kompascom',
    avatar: '📰',
    text:
      'New national education budget announced today. Full breakdown and official statements in our article.',
    likes: '2.1K',
    retweets: '540',
    riskType: 'reliable',
    contentCategory: 'news',
  },
  {
    id: 'tw3',
    user: 'OpinionDaily',
    handle: '@opiniondaily',
    avatar: '💬',
    text:
      'They are LYING to you again. Wake up! The other side will never tell you the real truth about this policy.',
    likes: '5.8K',
    retweets: '3.2K',
    riskType: 'bias',
    contentCategory: 'political',
  },
];

// Result text shown in the Checker pop-up based on riskType + contentCategory.
// We deliberately avoid absolute words like "true" or "false".
export const resultTemplates = {
  reliable: {
    label: 'Most likely reliable',
    color: '#16A34A',
    emoji: '✅',
    explanation:
      'This content appears to come from a recognised source and the claim is supported by other references. Still, you should read beyond the headline before sharing.',
  },
  bias: {
    label: 'Possible bias',
    color: '#F59E0B',
    emoji: '⚖️',
    explanation:
      'This content may contain emotional or one-sided language. It may not be completely false, but it may be trying to influence your opinion. Compare it with another source before sharing.',
  },
  low_evidence: {
    label: 'Not enough evidence',
    color: '#6B7280',
    emoji: '❓',
    explanation:
      'This claim does not provide clear evidence or reliable references. It is better to pause and check other sources before trusting it.',
  },
  misleading: {
    label: 'Likely misleading',
    color: '#DC2626',
    emoji: '⚠️',
    explanation:
      'This content shows warning signs such as urgent language, unclear source, unsupported health claims, or suspicious links. Do not share it until you verify it through reliable sources.',
  },
};

// Reference suggestions vary by content category.
export const referencesByCategory = {
  health: [
    'Official health organisation source',
    'Medical research database',
    'Trusted news outlet',
  ],
  political: [
    'Established news outlet',
    'Official government source',
    'Independent fact-checking source',
  ],
  scam: [
    'Official bank or government warning page',
    'Cyber safety source',
    'Trusted news report',
  ],
  celebrity: [
    'Official statement from the person or their team',
    'Established news outlet',
    'Independent fact-checking source',
  ],
  news: [
    'Established news outlet',
    'Official government source',
    'Independent fact-checking source',
  ],
  lifestyle: [
    'Original creator profile',
    'Trusted lifestyle publication',
  ],
  family: [
    'Direct conversation with the person',
    'Trusted community source',
  ],
};

// Generic literacy reminder questions used across all results.
export const literacyQuestions = [
  'Who posted this?',
  'Is the source clear?',
  'Is there evidence?',
  'Are other reliable sources reporting the same thing?',
  'Is the language trying to make you angry, afraid, or rushed?',
  'Could this image, video, or caption be edited or taken out of context?',
];

// Category-specific source-first question used in the confirm pop-up.
// (Finding 3: prompts should be sensitive to content category.)
// (Finding 5: foreground source questions, not "judge the claim".)
export const categoryQuestions = {
  health:
    'Is this medical claim from a recognised health source (e.g. official health body, doctor, hospital)?',
  political:
    'Is this from an established outlet — or could it be one-sided framing?',
  scam:
    'Is the link or instruction from an official bank or government source you can verify?',
  celebrity:
    'Has the person, their team, or an established outlet actually confirmed this?',
  news:
    'Is this from an outlet you recognise (e.g. Kompas, Detik, IDN, CNN Indonesia)?',
  lifestyle:
    'Is this the original creator, or has the post been reshared without context?',
  family:
    'Was this written by the person, or forwarded from somewhere else?',
};
