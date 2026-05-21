// Dummy content shown inside the fake apps.
// Each post has a riskType which decides what the Checker pop-up will say.
// riskType values: "reliable", "bias", "low_evidence", "misleading"
// We use plain English so non-CS students can read this file easily.

// Public logo links (online images).
export const appLogos = {
  instagram: 'https://img.icons8.com/fluency/96/instagram-new.png',
  whatsapp: 'https://img.icons8.com/color/96/whatsapp--v1.png',
  twitter: 'https://img.icons8.com/ios-filled/100/ffffff/twitterx--v1.png',
  tiktok: 'https://img.icons8.com/color/96/tiktok--v1.png',
};

// Shared UI icon links for action bars so we don't rely on emoji glyph support.
export const uiIcons = {
  light: {
    like: 'https://img.icons8.com/ios-glyphs/100/000000/like--v1.png',
    comment: 'https://img.icons8.com/ios-glyphs/100/000000/topic.png',
    share: 'https://img.icons8.com/ios-glyphs/100/000000/share.png',
    save: 'https://img.icons8.com/ios-glyphs/100/000000/bookmark-ribbon.png',
    repost: 'https://img.icons8.com/ios-glyphs/100/000000/repeat.png',
    forward: 'https://img.icons8.com/ios-glyphs/100/000000/forward.png',
    music: 'https://img.icons8.com/ios-glyphs/100/000000/musical-notes.png',
  },
  dark: {
    like: 'https://img.icons8.com/ios-glyphs/100/ffffff/like--v1.png',
    comment: 'https://img.icons8.com/ios-glyphs/100/ffffff/topic.png',
    share: 'https://img.icons8.com/ios-glyphs/100/ffffff/share.png',
    save: 'https://img.icons8.com/ios-glyphs/100/ffffff/bookmark-ribbon.png',
    repost: 'https://img.icons8.com/ios-glyphs/100/ffffff/repeat.png',
    forward: 'https://img.icons8.com/ios-glyphs/100/ffffff/forward.png',
    music: 'https://img.icons8.com/ios-glyphs/100/ffffff/musical-notes.png',
  },
};

// Dedicated icons for Legitimate Checker screens (avoid emoji rendering issues).
export const checkerIcons = {
  active: 'https://img.icons8.com/ios-glyphs/100/16a34a/approval.png',
  check: 'https://img.icons8.com/ios-glyphs/100/16a34a/checkmark--v1.png',
  self: 'https://img.icons8.com/ios-glyphs/100/111827/user--v1.png',
  family: 'https://img.icons8.com/ios-glyphs/100/111827/family.png',
  expand: 'https://img.icons8.com/ios-glyphs/100/111827/chevron-down.png',
  collapse: 'https://img.icons8.com/ios-glyphs/100/111827/chevron-up.png',
  shield: 'https://img.icons8.com/ios-glyphs/100/ffffff/shield.png',
  bell: 'https://img.icons8.com/ios-glyphs/100/ffffff/alarm.png',
  link: 'https://img.icons8.com/ios-glyphs/100/1e40af/link.png',
  status: {
    reliable: 'https://img.icons8.com/ios-glyphs/100/ffffff/verified-account.png',
    bias: 'https://img.icons8.com/ios-glyphs/100/ffffff/high-priority.png',
    low_evidence: 'https://img.icons8.com/ios-glyphs/100/ffffff/help.png',
    misleading: 'https://img.icons8.com/ios-glyphs/100/ffffff/error--v1.png',
  },
  section: {
    good: 'https://img.icons8.com/ios-glyphs/100/16a34a/checkmark--v1.png',
    warn: 'https://img.icons8.com/ios-glyphs/100/f59e0b/high-priority.png',
    bad: 'https://img.icons8.com/ios-glyphs/100/dc2626/cancel--v1.png',
    info: 'https://img.icons8.com/ios-glyphs/100/6b7280/info.png',
  },
};

export const instagramPosts = [
  {
    id: 'ig1',
    user: 'wellness_daily_id',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    imageUrl: 'https://picsum.photos/seed/ig-post-1/1080/1080',
    caption:
      'Video viral! Minuman herbal ini bisa menyembuhkan penyakit berat dalam semalam. Para dokter terkejut!',
    likes: '24,512',
    comments: 1820,
    riskType: 'misleading',
    contentCategory: 'health',
  },
  {
    id: 'ig2',
    user: 'sarah.travels',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    imageUrl: 'https://picsum.photos/seed/ig-post-2/1080/1080',
    caption: 'Matahari terbenam di Bali — rehat sejenak dari layar minggu ini. ✨',
    likes: '1,204',
    comments: 38,
    riskType: 'reliable',
    contentCategory: 'lifestyle',
  },
  {
    id: 'ig3',
    user: 'politik_now',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    imageUrl: 'https://picsum.photos/seed/ig-post-3/1080/1080',
    caption:
      'Opini: Kebijakan pemerintah merusak masa depan kita! Bagikan kalau setuju — mereka tidak ingin kamu melihat ini.',
    likes: '8,930',
    comments: 612,
    riskType: 'bias',
    contentCategory: 'political',
  },
];

export const whatsappMessages = [
  {
    id: 'wa1',
    sender: 'Ibu',
    avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    text: 'Selamat pagi semua! Jangan lupa makan siang hari Minggu 🍲',
    time: '08:12',
    forwarded: false,
    isMine: false,
    riskType: 'reliable',
    contentCategory: 'family',
  },
  {
    id: 'wa2',
    sender: 'Om Budi',
    avatarUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
    text:
      'Diteruskan banyak kali: Pemerintah akan memberi uang gratis ke setiap warga jika kamu klik tautan ini hari ini! Buruan, hanya berlaku 24 jam 👉 bit.ly/uang-gratis-id',
    time: '08:45',
    forwarded: true,
    isMine: false,
    riskType: 'misleading',
    contentCategory: 'scam',
  },
  {
    id: 'wa3',
    sender: 'Kakak',
    avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
    text: 'Bu, aku bawa kuenya 🎂',
    time: '09:02',
    forwarded: false,
    isMine: false,
    riskType: 'reliable',
    contentCategory: 'family',
  },
  {
    id: 'wa4',
    sender: 'Saya',
    avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
    text: 'Sampai ketemu hari Minggu!',
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
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    imageUrl: 'https://picsum.photos/seed/tw-post-1/1200/800',
    text:
      'BERITA: Tokoh publik terkenal dikabarkan meninggal menurut akun-akun viral. Detail belum jelas. RT untuk sebarkan!',
    likes: '12.4K',
    retweets: '8.1K',
    riskType: 'low_evidence',
    contentCategory: 'celebrity',
  },
  {
    id: 'tw2',
    user: 'KompasNews',
    handle: '@kompascom',
    avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    imageUrl: 'https://picsum.photos/seed/tw-post-2/1200/800',
    text:
      'Anggaran pendidikan nasional baru diumumkan hari ini. Rincian lengkap dan pernyataan resmi ada di artikel kami.',
    likes: '2.1K',
    retweets: '540',
    riskType: 'reliable',
    contentCategory: 'news',
  },
  {
    id: 'tw3',
    user: 'OpinionDaily',
    handle: '@opiniondaily',
    avatarUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
    imageUrl: 'https://picsum.photos/seed/tw-post-3/1200/800',
    text:
      'Mereka MEMBOHONGI kamu lagi. Bangun! Pihak lain tidak akan pernah memberi tahu kebenaran sebenarnya tentang kebijakan ini.',
    likes: '5.8K',
    retweets: '3.2K',
    riskType: 'bias',
    contentCategory: 'political',
  },
];

export const tiktokPosts = [
  {
    id: 'tk1',
    user: 'health_hacks.id',
    handle: '@health_hacks.id',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    imageUrl: 'https://picsum.photos/seed/tk-post-1/1080/1920',
    caption:
      'Tips cepat: minuman dapur ini bisa membersihkan racun dalam 1 hari. Simpan dan bagikan sekarang!',
    likes: '45.8K',
    comments: '4,210',
    shares: '9,302',
    riskType: 'misleading',
    contentCategory: 'health',
  },
  {
    id: 'tk2',
    user: 'newsminute.id',
    handle: '@newsminute.id',
    avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    imageUrl: 'https://picsum.photos/seed/tk-post-2/1080/1920',
    caption:
      'Rangkuman hari ini: Sorotan sidang parlemen dengan tautan sumber di bio.',
    likes: '8,114',
    comments: '320',
    shares: '412',
    riskType: 'reliable',
    contentCategory: 'news',
  },
  {
    id: 'tk3',
    user: 'hottakesdaily',
    handle: '@hottakesdaily',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    imageUrl: 'https://picsum.photos/seed/tk-post-3/1080/1920',
    caption:
      'Mereka tidak pernah memberi tahu sisi cerita ini. Repost sebelum ini dihilangkan!',
    likes: '21.3K',
    comments: '2,081',
    shares: '5,145',
    riskType: 'bias',
    contentCategory: 'political',
  },
];

// Result text shown in the Checker pop-up based on riskType + contentCategory.
// We deliberately avoid absolute words like "benar" or "salah".
// Wording is in plain Bahasa Indonesia — proposal §5.4 commits to Bahasa as a
// design requirement, not a translation step.
export const resultTemplates = {
  reliable: {
    label: 'Kemungkinan dapat dipercaya',
    color: '#16A34A',
    emoji: '✅',
    explanation:
      'Konten ini tampaknya berasal dari sumber yang dikenali dan klaimnya didukung oleh referensi lain. Tetap baca lebih dari sekadar judul sebelum membagikan.',
  },
  bias: {
    label: 'Mungkin ada bias',
    color: '#F59E0B',
    emoji: '⚖️',
    explanation:
      'Konten ini mungkin mengandung bahasa yang emosional atau satu sisi. Belum tentu salah seluruhnya, tapi bisa jadi sedang mencoba memengaruhi opinimu. Bandingkan dengan sumber lain sebelum membagikan.',
  },
  low_evidence: {
    label: 'Bukti tidak cukup',
    color: '#6B7280',
    emoji: '❓',
    explanation:
      'Klaim ini tidak menyertakan bukti atau referensi yang jelas. Lebih baik berhenti sejenak dan memeriksa sumber lain sebelum mempercayainya.',
  },
  misleading: {
    label: 'Kemungkinan menyesatkan',
    color: '#DC2626',
    emoji: '⚠️',
    explanation:
      'Konten ini menunjukkan tanda peringatan seperti bahasa yang mendesak, sumber yang tidak jelas, klaim kesehatan yang tidak didukung, atau tautan mencurigakan. Jangan dibagikan sampai kamu memverifikasinya lewat sumber terpercaya.',
  },
};

// Reference suggestions vary by content category.
export const referencesByCategory = {
  health: [
    'Sumber organisasi kesehatan resmi',
    'Basis data penelitian medis',
    'Media berita terpercaya',
  ],
  political: [
    'Media berita yang sudah dikenal',
    'Sumber resmi pemerintah',
    'Sumber pemeriksa fakta independen',
  ],
  scam: [
    'Halaman peringatan resmi bank atau pemerintah',
    'Sumber keamanan siber',
    'Laporan dari media terpercaya',
  ],
  celebrity: [
    'Pernyataan resmi dari orang tersebut atau timnya',
    'Media berita yang sudah dikenal',
    'Sumber pemeriksa fakta independen',
  ],
  news: [
    'Media berita yang sudah dikenal',
    'Sumber resmi pemerintah',
    'Sumber pemeriksa fakta independen',
  ],
  lifestyle: [
    'Profil pembuat konten asli',
    'Publikasi gaya hidup terpercaya',
  ],
  family: [
    'Percakapan langsung dengan orangnya',
    'Sumber komunitas terpercaya',
  ],
};

// Generic literacy reminder questions used across all results.
export const literacyQuestions = [
  'Siapa yang memposting ini?',
  'Apakah sumbernya jelas?',
  'Apakah ada bukti?',
  'Apakah sumber terpercaya lain melaporkan hal yang sama?',
  'Apakah bahasanya mencoba membuatmu marah, takut, atau terburu-buru?',
  'Mungkinkah gambar, video, atau caption ini sudah diedit atau diambil di luar konteks?',
];

// Category-specific source-first question used in the confirm pop-up.
// (Finding 3: prompts should be sensitive to content category.)
// (Finding 5: foreground source questions, not "judge the claim".)
export const categoryQuestions = {
  health:
    'Apakah klaim medis ini berasal dari sumber kesehatan yang dikenali (mis. lembaga kesehatan resmi, dokter, rumah sakit)?',
  political:
    'Apakah ini dari media yang sudah dikenal — atau mungkinkah ini pembingkaian satu sisi?',
  scam:
    'Apakah tautan atau instruksinya berasal dari bank atau pemerintah resmi yang bisa kamu verifikasi?',
  celebrity:
    'Apakah orang tersebut, timnya, atau media yang sudah dikenal benar-benar mengonfirmasinya?',
  news:
    'Apakah ini dari media yang kamu kenali (mis. Kompas, Detik, IDN, CNN Indonesia)?',
  lifestyle:
    'Apakah ini dari pembuat aslinya, atau unggahan ini sudah dibagikan ulang tanpa konteks?',
  family:
    'Apakah ini ditulis oleh orangnya, atau diteruskan dari tempat lain?',
};

// -------------------------------------------------------------------------
// Source-verification layer (proposal §5.4).
//
// The verdict labels are deliberately soft and avoid "true"/"false". The
// fallback verdict for unknown sources is "Sumber belum dikonfirmasi" so the
// design never silently invents a verdict it cannot justify.
// -------------------------------------------------------------------------
export const verificationLabels = {
  confirmed: {
    id: 'Sumber dikonfirmasi',
    color: '#16A34A',
  },
  opinion: {
    id: 'Sumber teridentifikasi sebagai opini',
    color: '#F59E0B',
  },
  personal: {
    id: 'Konten pribadi, bukan klaim faktual',
    color: '#6B7280',
  },
  unconfirmed: {
    id: 'Sumber belum dikonfirmasi',
    color: '#DC2626',
  },
};

// Each key matches the `source` string produced by App.getSelectedContent().
// Records contain the simulated "outlet's own profile" view plus
// corroboration from other recognised Indonesian outlets.
const sourceVerificationDb = {
  // ---------- Instagram ----------
  'wellness_daily_id': {
    accountName: '@wellness_daily_id',
    accountType: 'Akun lifestyle / influencer',
    profileSummary:
      'Akun ini tidak terdaftar sebagai sumber kesehatan resmi. Tidak ada tautan ke profesional medis atau institusi kesehatan.',
    corroboration: [
      { outlet: 'Kementerian Kesehatan RI', status: 'Tidak menyebut klaim ini' },
      { outlet: 'Kompas Health', status: 'Tidak ada laporan serupa' },
      { outlet: 'CNN Indonesia', status: 'Tidak ada laporan' },
    ],
    verdict: 'unconfirmed',
  },
  'sarah.travels': {
    accountName: '@sarah.travels',
    accountType: 'Akun pribadi (traveller)',
    profileSummary:
      'Akun pribadi. Unggahan berisi foto perjalanan, bukan klaim berita atau kesehatan.',
    corroboration: [
      { outlet: 'Profil pengguna', status: 'Konsisten dengan unggahan pribadi lain' },
    ],
    verdict: 'personal',
  },
  'politik_now': {
    accountName: '@politik_now',
    accountType: 'Akun komentar politik',
    profileSummary:
      'Halaman yang fokus pada opini politik. Bahasa cenderung emosional dan satu sisi.',
    corroboration: [
      { outlet: 'Detik', status: 'Berita berbeda nadanya' },
      { outlet: 'Kompas', status: 'Berita berbeda nadanya' },
    ],
    verdict: 'opinion',
  },
  // ---------- WhatsApp ----------
  'Ibu': {
    accountName: 'Ibu',
    accountType: 'Kontak pribadi (keluarga)',
    profileSummary:
      'Pesan langsung dari kontak yang kamu kenal. Bukan klaim berita.',
    corroboration: [
      { outlet: 'Percakapan langsung', status: 'Pesan pribadi keluarga' },
    ],
    verdict: 'personal',
  },
  'Om Budi (diteruskan)': {
    accountName: 'Om Budi (diteruskan)',
    accountType: 'Pesan diteruskan dari sumber tidak jelas',
    profileSummary:
      'Pesan diteruskan banyak kali. Tautan tidak menuju situs resmi pemerintah atau bank.',
    corroboration: [
      { outlet: 'Kementerian Keuangan RI', status: 'Tidak ada program seperti ini' },
      { outlet: 'OJK', status: 'Memperingatkan modus penipuan serupa' },
      { outlet: 'CNN Indonesia', status: 'Tidak ada laporan' },
    ],
    verdict: 'unconfirmed',
  },
  'Kakak': {
    accountName: 'Kakak',
    accountType: 'Kontak pribadi (keluarga)',
    profileSummary:
      'Pesan langsung dari kontak yang kamu kenal. Bukan klaim berita.',
    corroboration: [
      { outlet: 'Percakapan langsung', status: 'Pesan pribadi keluarga' },
    ],
    verdict: 'personal',
  },
  // ---------- X / Twitter ----------
  'ViralUpdates24 @viralupdates24': {
    accountName: '@viralupdates24',
    accountType: 'Akun "viral updates" tanpa verifikasi',
    profileSummary:
      'Akun ini tidak memiliki centang verifikasi. Banyak unggahan bersifat sensasional dan tidak menyertakan tautan resmi.',
    corroboration: [
      { outlet: 'Kompas', status: 'Tidak ada laporan' },
      { outlet: 'Detik', status: 'Tidak ada laporan' },
      { outlet: 'CNN Indonesia', status: 'Tidak ada laporan' },
    ],
    verdict: 'unconfirmed',
  },
  'KompasNews @kompascom': {
    accountName: '@kompascom',
    accountType: 'Outlet berita nasional terverifikasi',
    profileSummary:
      'Akun resmi Kompas. Artikel yang sama juga terbit di kompas.com.',
    corroboration: [
      { outlet: 'kompas.com', status: 'Artikel resmi tersedia' },
      { outlet: 'Detik', status: 'Melaporkan kejadian yang sama' },
      { outlet: 'CNN Indonesia', status: 'Melaporkan kejadian yang sama' },
    ],
    verdict: 'confirmed',
  },
  'OpinionDaily @opiniondaily': {
    accountName: '@opiniondaily',
    accountType: 'Akun opini / komentar politik',
    profileSummary:
      'Akun yang fokus pada komentar politik. Bahasa emosional dan satu sisi.',
    corroboration: [
      { outlet: 'Kompas', status: 'Berita berbeda nadanya' },
      { outlet: 'CNN Indonesia', status: 'Tidak menggunakan kerangka serupa' },
    ],
    verdict: 'opinion',
  },
  // ---------- TikTok ----------
  'health_hacks.id @health_hacks.id': {
    accountName: '@health_hacks.id',
    accountType: 'Akun tips kesehatan tanpa verifikasi',
    profileSummary:
      'Tidak terdaftar sebagai akun resmi kesehatan. Tidak ada profesional medis yang tertera di profil.',
    corroboration: [
      { outlet: 'Kementerian Kesehatan RI', status: 'Tidak menyebut klaim ini' },
      { outlet: 'Kompas Health', status: 'Tidak ada laporan serupa' },
    ],
    verdict: 'unconfirmed',
  },
  'newsminute.id @newsminute.id': {
    accountName: '@newsminute.id',
    accountType: 'Akun ringkasan berita',
    profileSummary:
      'Akun menyertakan tautan ke artikel asli pada profil. Cocokkan dengan outlet sumber sebelum membagikan.',
    corroboration: [
      { outlet: 'Kompas', status: 'Melaporkan kejadian yang sama' },
      { outlet: 'Detik', status: 'Melaporkan kejadian yang sama' },
    ],
    verdict: 'confirmed',
  },
  'hottakesdaily @hottakesdaily': {
    accountName: '@hottakesdaily',
    accountType: 'Akun komentar politik',
    profileSummary:
      'Akun fokus pada opini politik. Mendorong "repost" dengan bahasa emosional.',
    corroboration: [
      { outlet: 'Kompas', status: 'Berita berbeda nadanya' },
      { outlet: 'CNN Indonesia', status: 'Tidak ada laporan' },
    ],
    verdict: 'opinion',
  },
};

// Look up a verification record for a given source string.
// Falls back to a neutral "Sumber belum dikonfirmasi" record so the design
// never invents a verdict it cannot justify (proposal §5.4 signature line).
export function lookupSourceVerification(sourceString) {
  if (sourceString && sourceVerificationDb[sourceString]) {
    return sourceVerificationDb[sourceString];
  }
  return {
    accountName: sourceString || 'Sumber tidak dikenali',
    accountType: 'Tidak ditemukan di basis data sumber',
    profileSummary:
      'Kami tidak menemukan profil resmi yang cocok untuk sumber ini. Periksa langsung ke media atau lembaga yang disebutkan.',
    corroboration: [
      { outlet: 'Tidak ada media yang dicocokkan', status: '—' },
    ],
    verdict: 'unconfirmed',
  };
}
