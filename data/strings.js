// strings.js
// Single source of truth for every user-facing string in the prototype.
//
// Keys are grouped by component (lock, home, onboard, checker, modal, source,
// rc, solo, tabs, ig, wa, tw, tk). Each entry has both 'id' (Bahasa
// Indonesia, the default) and 'en' (English glosses for tutors who don't
// speak Indonesian).
//
// Components read these via `useT()` from LanguageContext. Dummy data fields
// (post captions, source-verification records) use `loc(record, key, lang)`
// instead — those records carry both `field` and `field_en` variants.

export const strings = {
  // ---------- Common ----------
  'common.home': { id: 'Beranda', en: 'Home' },
  'common.back': { id: 'Kembali', en: 'Back' },
  'common.cancel': { id: 'Batal', en: 'Cancel' },
  'common.close': { id: 'Tutup', en: 'Close' },
  'common.send': { id: 'Kirim', en: 'Send' },
  'common.continue': { id: 'Lanjut', en: 'Continue' },
  'common.skip': { id: 'Lewati', en: 'Skip' },
  'common.understand': { id: 'Saya mengerti', en: 'I understand' },
  'common.gotIt': { id: 'Mengerti', en: 'Got it' },
  'common.unknown': { id: 'Tidak diketahui', en: 'Unknown' },

  // ---------- Lock screen ----------
  'lock.notif.body': {
    id: 'Berhenti. Periksa. Pikir dulu sebelum membagikan.',
    en: 'Pause. Check. Think before sharing.',
  },
  'lock.swipeUp': {
    id: 'Geser ke atas untuk membuka',
    en: 'Swipe up to unlock',
  },

  // ---------- Home screen ----------
  'home.greeting': { id: 'Selamat datang', en: 'Welcome' },
  'home.openCheckerHint': {
    id: 'Buka Legitimate Checker untuk memulai.',
    en: 'Open Legitimate Checker to begin.',
  },
  'home.checkerActiveHint': {
    id: 'Checker aktif — bulatan akan muncul di dalam aplikasi.',
    en: 'Checker is active — bubble will appear inside apps.',
  },
  'home.dockHint': {
    id: 'Ketuk aplikasi untuk membuka',
    en: 'Tap an app to open',
  },
  'home.lang.switchToEn': { id: 'EN', en: 'EN' },
  'home.lang.switchToId': { id: 'ID', en: 'ID' },
  'home.lang.tooltip': {
    id: 'Bahasa',
    en: 'Language',
  },

  // ---------- Onboarding entry ----------
  'onboard.whoWillUse': {
    id: 'Siapa yang akan menggunakan?',
    en: 'Who will use this?',
  },
  'onboard.self': { id: 'Saya sendiri', en: 'Myself' },
  'onboard.forFamily': {
    id: 'Untuk orang tua\natau keluarga',
    en: 'For my parents\nor family',
  },
  'onboard.survey.title': {
    id: 'Saya tiba di sini melalui...',
    en: 'I arrived here via...',
  },
  'onboard.survey.qr': {
    id: 'QR code di papan masjid atau RT',
    en: 'QR code at the mosque or neighbourhood noticeboard',
  },
  'onboard.survey.wa': {
    id: 'Tautan WhatsApp dari grup komunitas',
    en: 'WhatsApp link from a community group',
  },
  'onboard.survey.gov': {
    id: 'Halaman literasi digital Kementerian Komunikasi dan Digital',
    en: 'Digital literacy page from the Ministry of Communication and Digital Affairs',
  },
  'onboard.survey.other': { id: 'Lainnya', en: 'Other' },
  'onboard.survey.otherPlaceholder': {
    id: 'Ketik darimana kamu tahu...',
    en: 'Type where you heard about this...',
  },
  'onboard.survey.thanks': {
    id: 'Terima kasih — jawabanmu sudah dicatat.',
    en: 'Thank you — your answer has been recorded.',
  },

  // ---------- Checker app (State A) ----------
  'checker.tagline': {
    id: 'Berhenti. Periksa. Pikir dulu sebelum membagikan.',
    en: 'Pause. Check. Think before sharing.',
  },
  'checker.mode.self': {
    id: '👤  Mode standar',
    en: '👤  Standard mode',
  },
  'checker.mode.family': {
    id: '👨‍👩‍👧  Mode untuk orang tua',
    en: '👨‍👩‍👧  Mode for elderly users',
  },
  'checker.active.title': { id: 'Checker aktif', en: 'Checker is active' },
  'checker.active.body': {
    id: 'Bulatan kecil akan muncul saat kamu membuka Instagram, WhatsApp, X, dan TikTok.',
    en: 'A small floating bubble will appear when you open Instagram, WhatsApp, X, and TikTok.',
  },
  'checker.active.short': {
    id: 'Bulatan kecil akan muncul saat kamu menjelajah.',
    en: 'A small floating bubble will appear while you browse.',
  },
  'checker.activated.note': {
    id: 'Checker aktif. Sekarang kamu bisa pakai bulatan untuk berhenti sejenak dan memeriksa konten yang mencurigakan.',
    en: 'Checker is active. You can now use the floating bubble to pause and check suspicious content.',
  },
  'checker.backHome': { id: 'Kembali ke Beranda', en: 'Back to Home' },
  'checker.purpose.title': {
    id: 'Apa yang dilakukan alat ini',
    en: 'What this tool does',
  },
  'checker.purpose.body': {
    id: 'Alat ini tidak memutuskan kebenaran untukmu. Alat ini membantu kamu memeriksa sumber, mengenali tanda peringatan, dan berpikir lebih hati-hati sebelum percaya atau membagikan informasi.',
    en: 'This tool does not decide truth for you. It helps you check sources, recognise warning signs, and think more carefully before believing or sharing information.',
  },
  'checker.algo.title': {
    id: 'Kenapa aku melihat ini di feed-ku?',
    en: 'Why am I seeing this in my feed?',
  },
  'checker.algo.body': {
    id:
      'Aplikasi seperti Instagram, TikTok, dan X mencoba menebak apa yang kamu suka. Mereka memperhatikan apa yang kamu berhenti lihat, apa yang kamu ketuk, dan apa yang kamu bagikan. Lalu mereka menampilkan lebih banyak posting yang mirip.\n\nIni kadang disebut “algoritma.” Itu hanyalah aturan urutan yang dipakai aplikasi. Bukan berita, dan bukan juga temanmu yang memutuskan. Kalau kamu terus melihat jenis cerita yang sama, itu mungkin algoritma — bukan dunia — yang sedang mengulanginya.',
    en:
      'Apps like Instagram, TikTok and X try to guess what you like. They notice what you stop to look at, what you tap, and what you share. Then they show you more posts that look similar.\n\nThis is sometimes called an "algorithm." It is just an ordering rule used by the app. It is not the news, and it is not your friend deciding for you. If you keep seeing the same kind of story, it may be the algorithm — not the world — that is repeating it.',
  },
  'checker.agree.title': { id: 'Sebelum kamu mulai', en: 'Before you start' },
  'checker.agree.1': {
    id: 'Saya memahami alat ini hanyalah panduan.',
    en: 'I understand this tool is only a guide.',
  },
  'checker.agree.2': {
    id: 'Saya memahami keputusan akhir tetap di tangan saya.',
    en: 'I understand the final decision is still mine.',
  },
  'checker.agree.3': {
    id: 'Saya setuju memakai alat ini untuk mendukung literasi digital.',
    en: 'I agree to use this tool to support digital literacy.',
  },
  'checker.activate': { id: 'Aktifkan Checker', en: 'Activate Checker' },
  'checker.settings.title': { id: 'Pengaturan', en: 'Settings' },
  'checker.settings.simple.title': {
    id: 'Mode bahasa sederhana',
    en: 'Simple language mode',
  },
  'checker.settings.simple.hint': {
    id: 'Pakai kata-kata yang mudah dibaca.',
    en: 'Use words that are easy to read.',
  },
  'checker.settings.source.title': {
    id: 'Tampilkan pengingat sumber',
    en: 'Show source reminders',
  },
  'checker.settings.source.hint': {
    id: 'Selalu ingatkan saya untuk memeriksa sumber.',
    en: 'Always remind me to check the source.',
  },
  'checker.settings.dismiss.title': {
    id: 'Tutup dengan satu ketukan',
    en: 'One-tap dismiss',
  },
  'checker.settings.dismiss.hint': {
    id: 'Tutup pop-up bulatan dengan sekali ketuk.',
    en: 'Close the bubble pop-up with a single tap.',
  },

  // ---------- Confirm modal ----------
  'modal.eyebrow': {
    id: 'Berhenti — sebelum kamu membagikan',
    en: 'Pause — before you share',
  },
  'modal.whoPosted': {
    id: 'Siapa yang memposting ini?',
    en: 'Who posted this?',
  },
  'modal.source': { id: 'Sumber', en: 'Source' },
  'modal.seenOn': { id: 'Dilihat di', en: 'Seen on' },
  'modal.askYourself': {
    id: 'Tanyakan pada diri sendiri',
    en: 'Ask yourself',
  },
  'modal.content': { id: 'Konten', en: 'Content' },
  'modal.noSelection.title': {
    id: 'Tidak ada konten yang dipilih',
    en: 'No content selected',
  },
  'modal.noSelection.body': {
    id: 'Ketuk unggahan atau pesan di aplikasi dulu, lalu ketuk bulatan.',
    en: 'Tap a post or message in the app first, then tap the bubble.',
  },
  'modal.checkSource': { id: 'Periksa sumber', en: 'Check source' },
  // Proposal §5 interaction model: the prompt offers two choices — first
  // continues the share, second opens the source-verification screen.
  'modal.shareNow': { id: 'Bagikan sekarang', en: 'Share now' },
  'modal.fallbackQuestion': {
    id: 'Apakah sumbernya jelas dan dapat dipercaya?',
    en: 'Is the source clear and trustworthy?',
  },

  // ---------- Source verification ----------
  'source.eyebrow': { id: 'Periksa sumber', en: 'Source check' },
  'source.title': {
    id: 'Apa yang dikatakan sumbernya?',
    en: 'What does the source itself say?',
  },
  'source.tooltip': {
    id: 'Periksa sumbernya langsung — langkah ini membuka profil atau situs resmi outlet yang disebutkan, sebelum hasil akhir ditampilkan.',
    en: 'Check the source directly — this step opens the official profile or website of the mentioned outlet, before the final result is shown.',
  },
  'source.profile': { id: 'Profil sumber', en: 'Source profile' },
  'source.contact.saved': {
    id: '✓ Tersimpan di kontak',
    en: '✓ Saved in contacts',
  },
  'source.contact.forwardedUnknown': {
    id: '⚠ Diteruskan — sumber asli tidak diketahui',
    en: '⚠ Forwarded — original source unknown',
  },
  'source.corrobTitle': {
    id: 'Apakah outlet lain melaporkan hal yang sama?',
    en: 'Are other outlets reporting the same thing?',
  },
  'source.status': { id: 'Status sumber', en: 'Source status' },
  'source.disclaimer': {
    id: 'Keputusan akhir tetap di tanganmu. Langkah ini hanya menunjukkan apa kata sumbernya sendiri dan media lain.',
    en: 'The final decision is still yours. This step only shows what the source itself and other outlets say.',
  },
  'source.seeFullResult': {
    id: 'Lihat hasil lengkap',
    en: 'See full result',
  },
  'source.fallback.name': {
    id: 'Sumber tidak dikenali',
    en: 'Unrecognised source',
  },
  'source.fallback.type': {
    id: 'Tidak ditemukan di basis data sumber',
    en: 'Not found in the source database',
  },
  'source.fallback.summary': {
    id: 'Kami tidak menemukan profil resmi yang cocok untuk sumber ini. Periksa langsung ke media atau lembaga yang disebutkan.',
    en: 'We could not find an official profile matching this source. Check directly with the outlet or institution mentioned.',
  },
  'source.fallback.noMatch': {
    id: 'Tidak ada media yang dicocokkan',
    en: 'No outlets matched',
  },

  // ---------- Verdict labels ----------
  'verdict.confirmed': {
    id: 'Sumber dikonfirmasi',
    en: 'Source confirmed',
  },
  'verdict.opinion': {
    id: 'Sumber teridentifikasi sebagai opini',
    en: 'Source identified as opinion',
  },
  'verdict.personal': {
    id: 'Konten pribadi, bukan klaim faktual',
    en: 'Personal content, not a factual claim',
  },
  'verdict.unconfirmed': {
    id: 'Sumber belum dikonfirmasi',
    en: 'Source not yet confirmed',
  },

  // ---------- Result templates ----------
  'result.reliable.label': {
    id: 'Kemungkinan dapat dipercaya',
    en: 'Most likely reliable',
  },
  'result.reliable.explanation': {
    id: 'Konten ini tampaknya berasal dari sumber yang dikenali dan klaimnya didukung oleh referensi lain. Tetap baca lebih dari sekadar judul sebelum membagikan.',
    en: 'This content appears to come from a recognised source and its claim is backed by other references. Still, read beyond the headline before sharing.',
  },
  'result.bias.label': { id: 'Mungkin ada bias', en: 'Possible bias' },
  'result.bias.explanation': {
    id: 'Konten ini mungkin mengandung bahasa yang emosional atau satu sisi. Belum tentu salah seluruhnya, tapi bisa jadi sedang mencoba memengaruhi opinimu. Bandingkan dengan sumber lain sebelum membagikan.',
    en: 'This content may contain emotional or one-sided language. It is not necessarily entirely wrong, but it may be trying to influence your opinion. Compare with another source before sharing.',
  },
  'result.low_evidence.label': {
    id: 'Bukti tidak cukup',
    en: 'Not enough evidence',
  },
  'result.low_evidence.explanation': {
    id: 'Klaim ini tidak menyertakan bukti atau referensi yang jelas. Lebih baik berhenti sejenak dan memeriksa sumber lain sebelum mempercayainya.',
    en: 'This claim does not include clear evidence or references. It is better to pause and check other sources before believing it.',
  },
  'result.misleading.label': {
    id: 'Kemungkinan menyesatkan',
    en: 'Likely misleading',
  },
  'result.misleading.explanation': {
    id: 'Konten ini menunjukkan tanda peringatan seperti bahasa yang mendesak, sumber yang tidak jelas, klaim kesehatan yang tidak didukung, atau tautan mencurigakan. Jangan dibagikan sampai kamu memverifikasinya lewat sumber terpercaya.',
    en: 'This content shows warning signs such as urgent language, unclear sources, unsupported health claims, or suspicious links. Do not share until you verify it through a trusted source.',
  },

  // ---------- ResultCard section headings ----------
  'rc.warningBanner': {
    id: 'Hati-hati — tanda peringatan terdeteksi',
    en: 'Caution — warning signs detected',
  },
  'rc.finalDecision': {
    id: 'Keputusan akhir tetap di tanganmu.',
    en: 'The final decision is still yours.',
  },
  'rc.nextAction': {
    id: 'Tindakan selanjutnya yang disarankan',
    en: 'Recommended next action',
  },
  'rc.sourceCheck': { id: 'Pemeriksaan sumber', en: 'Source check' },
  'rc.evidenceCheck': { id: 'Pemeriksaan bukti', en: 'Evidence check' },
  'rc.biasCheck': {
    id: 'Bias / bahasa emosional',
    en: 'Bias / emotional language',
  },
  'rc.literacyReminder': {
    id: 'Pengingat Literasi Digital',
    en: 'Digital Literacy Reminder',
  },
  'rc.references': {
    id: 'Referensi yang disarankan untuk dibandingkan',
    en: 'Suggested references to compare',
  },
  'rc.seeDetails': { id: 'Lihat detail lengkap', en: 'See full details' },
  'rc.hideDetails': { id: 'Sembunyikan detail', en: 'Hide details' },

  // ---------- Section-check text (by risk type) ----------
  'check.reliable.source': {
    id: 'Sumber tampak dikenali.',
    en: 'Source appears recognised.',
  },
  'check.reliable.evidence': {
    id: 'Klaim didukung oleh referensi lain.',
    en: 'Claim is supported by other references.',
  },
  'check.reliable.bias': {
    id: 'Tetap baca lebih dari sekadar judul sebelum membagikan.',
    en: 'Still, read beyond the headline before sharing.',
  },
  'check.bias.source': {
    id: 'Sumber mungkin memiliki sudut pandang yang kuat.',
    en: 'Source may have a strong viewpoint.',
  },
  'check.bias.evidence': {
    id: 'Bukti tidak lengkap atau satu sisi.',
    en: 'Evidence is incomplete or one-sided.',
  },
  'check.bias.bias': {
    id: 'Bahasanya emosional. Mungkin mencoba memengaruhi opinimu.',
    en: 'The language is emotional. It may be trying to influence your opinion.',
  },
  'check.low_evidence.source': {
    id: 'Sumber tidak jelas atau belum terverifikasi.',
    en: 'Source is unclear or unverified.',
  },
  'check.low_evidence.evidence': {
    id: 'Tidak ada bukti atau referensi yang jelas.',
    en: 'No clear evidence or references.',
  },
  'check.low_evidence.bias': {
    id: 'Nadanya terburu-buru atau berdasarkan rumor.',
    en: 'The tone is rushed or based on rumour.',
  },
  'check.misleading.source': {
    id: 'Sumber tidak dikenali atau mencurigakan.',
    en: 'Source is unrecognised or suspicious.',
  },
  'check.misleading.evidence': {
    id: 'Klaim tidak didukung (mis. klaim kesehatan yang belum terbukti atau penipuan).',
    en: 'Claim is unsupported (e.g. unproven health claims or scams).',
  },
  'check.misleading.bias': {
    id: 'Menggunakan bahasa yang mendesak, emosional, atau menekan.',
    en: 'Uses urgent, emotional, or pressuring language.',
  },

  // ---------- Next-action text (by risk type) ----------
  'next.reliable': {
    id: 'Boleh dibagikan, tapi pertimbangkan menambahkan konteks atau sumber aslinya.',
    en: 'You may share, but consider adding context or the original source.',
  },
  'next.bias': {
    id: 'Bandingkan dengan sumber lain sebelum membagikan. Perhatikan cara pembingkaiannya.',
    en: 'Compare with another source before sharing. Note how it is framed.',
  },
  'next.low_evidence': {
    id: 'Berhenti dulu. Tunggu konfirmasi dari sumber terpercaya sebelum membagikan.',
    en: 'Pause. Wait for confirmation from a trusted source before sharing.',
  },
  'next.misleading': {
    id: 'Jangan dibagikan. Verifikasi dengan sumber terpercaya dulu.',
    en: 'Do not share. Verify with a trusted source first.',
  },

  // ---------- Literacy reminder questions ----------
  'literacy.1': { id: 'Siapa yang memposting ini?', en: 'Who posted this?' },
  'literacy.2': { id: 'Apakah sumbernya jelas?', en: 'Is the source clear?' },
  'literacy.3': { id: 'Apakah ada bukti?', en: 'Is there evidence?' },
  'literacy.4': {
    id: 'Apakah sumber terpercaya lain melaporkan hal yang sama?',
    en: 'Are other trusted sources reporting the same thing?',
  },
  'literacy.5': {
    id: 'Apakah bahasanya mencoba membuatmu marah, takut, atau terburu-buru?',
    en: 'Is the language trying to make you angry, afraid, or rushed?',
  },
  'literacy.6': {
    id: 'Mungkinkah gambar, video, atau caption ini sudah diedit atau diambil di luar konteks?',
    en: 'Could this image, video, or caption have been edited or taken out of context?',
  },

  // ---------- Category-specific source questions ----------
  'catq.health': {
    id: 'Apakah klaim medis ini berasal dari sumber kesehatan yang dikenali (mis. lembaga kesehatan resmi, dokter, rumah sakit)?',
    en: 'Does this medical claim come from a recognised health source (e.g. official health body, doctor, hospital)?',
  },
  'catq.political': {
    id: 'Apakah ini dari media yang sudah dikenal — atau mungkinkah ini pembingkaian satu sisi?',
    en: 'Is this from a recognised outlet — or could it be one-sided framing?',
  },
  'catq.scam': {
    id: 'Apakah tautan atau instruksinya berasal dari bank atau pemerintah resmi yang bisa kamu verifikasi?',
    en: 'Does the link or instruction come from an official bank or government source you can verify?',
  },
  'catq.celebrity': {
    id: 'Apakah orang tersebut, timnya, atau media yang sudah dikenal benar-benar mengonfirmasinya?',
    en: 'Has the person, their team, or a recognised outlet actually confirmed this?',
  },
  'catq.news': {
    id: 'Apakah ini dari media yang kamu kenali (mis. Kompas, Detik, IDN, CNN Indonesia)?',
    en: 'Is this from an outlet you recognise (e.g. Kompas, Detik, IDN, CNN Indonesia)?',
  },
  'catq.lifestyle': {
    id: 'Apakah ini dari pembuat aslinya, atau unggahan ini sudah dibagikan ulang tanpa konteks?',
    en: 'Is this from the original creator, or has the post been reshared without context?',
  },
  'catq.family': {
    id: 'Apakah ini ditulis oleh orangnya, atau diteruskan dari tempat lain?',
    en: 'Was this written by the person, or forwarded from somewhere else?',
  },

  // ---------- References (by category) ----------
  'ref.health.1': {
    id: 'Sumber organisasi kesehatan resmi',
    en: 'Official health organisation source',
  },
  'ref.health.2': {
    id: 'Basis data penelitian medis',
    en: 'Medical research database',
  },
  'ref.health.3': {
    id: 'Media berita terpercaya',
    en: 'Trusted news outlet',
  },
  'ref.political.1': {
    id: 'Media berita yang sudah dikenal',
    en: 'Recognised news outlet',
  },
  'ref.political.2': {
    id: 'Sumber resmi pemerintah',
    en: 'Official government source',
  },
  'ref.political.3': {
    id: 'Sumber pemeriksa fakta independen',
    en: 'Independent fact-checking source',
  },
  'ref.scam.1': {
    id: 'Halaman peringatan resmi bank atau pemerintah',
    en: 'Official bank or government warning page',
  },
  'ref.scam.2': { id: 'Sumber keamanan siber', en: 'Cyber security source' },
  'ref.scam.3': {
    id: 'Laporan dari media terpercaya',
    en: 'Report from a trusted outlet',
  },
  'ref.celebrity.1': {
    id: 'Pernyataan resmi dari orang tersebut atau timnya',
    en: 'Official statement from the person or their team',
  },
  'ref.celebrity.2': {
    id: 'Media berita yang sudah dikenal',
    en: 'Recognised news outlet',
  },
  'ref.celebrity.3': {
    id: 'Sumber pemeriksa fakta independen',
    en: 'Independent fact-checking source',
  },
  'ref.news.1': {
    id: 'Media berita yang sudah dikenal',
    en: 'Recognised news outlet',
  },
  'ref.news.2': {
    id: 'Sumber resmi pemerintah',
    en: 'Official government source',
  },
  'ref.news.3': {
    id: 'Sumber pemeriksa fakta independen',
    en: 'Independent fact-checking source',
  },
  'ref.lifestyle.1': {
    id: 'Profil pembuat konten asli',
    en: 'Original creator profile',
  },
  'ref.lifestyle.2': {
    id: 'Publikasi gaya hidup terpercaya',
    en: 'Trusted lifestyle publication',
  },
  'ref.family.1': {
    id: 'Percakapan langsung dengan orangnya',
    en: 'Direct conversation with the person',
  },
  'ref.family.2': {
    id: 'Sumber komunitas terpercaya',
    en: 'Trusted community source',
  },

  // ---------- SoloOnboarding ----------
  'solo.slide1.title': {
    id: 'Legitimate Checker membantu kamu memeriksa sumber sebelum berbagi.',
    en: 'Legitimate Checker helps you check the source before sharing.',
  },
  'solo.slide1.body': {
    id: 'Sebelum kamu menekan tombol Bagikan atau Teruskan, alat ini berhenti sebentar dan menunjukkan siapa yang memposting konten tersebut.',
    en: 'Before you press Share or Forward, this tool pauses briefly and shows who posted the content.',
  },
  'solo.slide2.title': {
    id: 'Kami tidak memberitahu kamu apa yang benar atau salah.',
    en: 'We do not tell you what is right or wrong.',
  },
  'solo.slide2.body': {
    id: 'Alat ini bukan hakim kebenaran. Alat ini menunjukkan informasi tentang sumber dan apakah media lain melaporkan hal yang sama.',
    en: 'This tool is not a judge of truth. It shows information about the source and whether other outlets are reporting the same thing.',
  },
  'solo.slide3.title': {
    id: 'Kamu tetap yang memutuskan.',
    en: 'You are still the one who decides.',
  },
  'solo.slide3.body': {
    id: 'Setelah membaca informasi yang disiapkan, kamu yang memutuskan apakah ingin membagikan, menyimpan, atau menutup konten.',
    en: 'After reading the information provided, you decide whether to share, save, or close the content.',
  },
  'solo.walkthrough.title': { id: 'Ayo coba sekali dulu', en: 'Let’s try it once first' },
  'solo.walkthrough.intro': {
    id: 'Begini cara Legitimate Checker bekerja saat kamu menemukan pesan yang mencurigakan.',
    en: 'Here is how Legitimate Checker works when you find a suspicious message.',
  },
  'solo.walkthrough.sample.forwarded': {
    id: '↪ Diteruskan banyak kali',
    en: '↪ Forwarded many times',
  },
  'solo.walkthrough.sample.sender': { id: 'Om Budi', en: 'Uncle Budi' },
  'solo.walkthrough.sample.text': {
    id: 'Pemerintah akan memberi uang gratis ke setiap warga jika kamu klik tautan ini hari ini! Buruan, hanya berlaku 24 jam.',
    en: 'The government will give free money to every citizen if you click this link today! Hurry, only valid for 24 hours.',
  },
  'solo.walkthrough.step1.title': {
    id: 'Ketuk tombol Teruskan atau bulatan biru',
    en: 'Tap the Forward button or the blue bubble',
  },
  'solo.walkthrough.step1.body': {
    id: 'Saat kamu hendak meneruskan pesan, Legitimate Checker akan berhenti sejenak untuk membantu kamu.',
    en: 'When you are about to forward a message, Legitimate Checker will pause briefly to help you.',
  },
  'solo.walkthrough.step2.title': {
    id: 'Lihat siapa yang memposting',
    en: 'See who posted it',
  },
  'solo.walkthrough.step2.body': {
    id: 'Kamu akan melihat nama pengirim dan apakah dia tersimpan di kontakmu.',
    en: 'You will see the sender’s name and whether they are saved in your contacts.',
  },
  'solo.walkthrough.step3.title': {
    id: 'Tekan “Periksa sumber”',
    en: 'Press "Check source"',
  },
  'solo.walkthrough.step3.body': {
    id: 'Kami menunjukkan apa yang dikatakan media lain seperti Kompas, Detik, atau Kementerian Keuangan tentang klaim ini.',
    en: 'We show what other outlets like Kompas, Detik, or the Ministry of Finance say about this claim.',
  },
  'solo.walkthrough.step4.title': {
    id: 'Kamu yang memutuskan',
    en: 'You decide',
  },
  'solo.walkthrough.step4.body': {
    id: 'Bagikan, simpan, atau abaikan — Legitimate Checker hanya membantu kamu memutuskan dengan lebih tenang.',
    en: 'Share, save, or ignore — Legitimate Checker only helps you decide more calmly.',
  },
  'solo.consent.title': { id: 'Sebelum kamu mulai', en: 'Before you start' },
  'solo.consent.defaults': {
    id: 'Pengaturan default: Bahasa sederhana, Pengingat sumber, dan Tutup dengan satu ketukan akan diaktifkan supaya lebih mudah digunakan.',
    en: 'Default settings: Simple language, Source reminders, and One-tap dismiss will be enabled to make the app easier to use.',
  },

  // ---------- OpenTabsSheet ----------
  'tabs.title': { id: 'Aplikasi yang terbuka', en: 'Open apps' },
  'tabs.empty': {
    id: 'Belum ada aplikasi yang dibuka. Buka Instagram, WhatsApp, X, TikTok, atau Checker.',
    en: 'No apps opened yet. Open Instagram, WhatsApp, X, TikTok, or Checker.',
  },
  'tabs.current': { id: 'Aplikasi saat ini', en: 'Current app' },
  'tabs.tapToOpen': { id: 'Ketuk untuk membuka', en: 'Tap to open' },

  // ---------- Fake Instagram ----------
  'ig.likes': { id: 'suka', en: 'likes' },
  'ig.viewAllComments': {
    id: 'Lihat semua {n} komentar',
    en: 'View all {n} comments',
  },
  'ig.share': { id: 'Bagikan', en: 'Share' },
  'ig.selected': { id: '✓ Dipilih untuk Checker', en: '✓ Selected for Checker' },
  'ig.tapToSelect': {
    id: 'Ketuk untuk memilih untuk Checker',
    en: 'Tap to select for Checker',
  },

  // ---------- Fake WhatsApp ----------
  'wa.group': { id: 'Grup Keluarga', en: 'Family Group' },
  'wa.members': {
    id: 'Ibu, Ayah, Kakak, Om Budi, Saya',
    en: 'Mom, Dad, Sister, Uncle Budi, Me',
  },
  'wa.forwardedManyTimes': {
    id: 'Diteruskan banyak kali',
    en: 'Forwarded many times',
  },
  'wa.forward': { id: 'Teruskan', en: 'Forward' },
  'wa.selected': { id: '✓ Dipilih', en: '✓ Selected' },
  'wa.tapToSelect': { id: 'Ketuk untuk memilih', en: 'Tap to select' },

  // ---------- Fake Twitter (X) ----------
  'tw.save': { id: 'Simpan', en: 'Save' },
  'tw.repost': { id: 'Repost', en: 'Repost' },
  'tw.selected': { id: '✓ Dipilih untuk Checker', en: '✓ Selected for Checker' },
  'tw.tapToSelect': {
    id: 'Ketuk untuk memilih untuk Checker',
    en: 'Tap to select for Checker',
  },

  // ---------- Fake TikTok ----------
  'tk.follow': { id: 'Ikuti', en: 'Follow' },
  'tk.save': { id: 'Simpan', en: 'Save' },
  'tk.share': { id: 'Bagikan', en: 'Share' },
  'tk.following': { id: 'Mengikuti', en: 'Following' },
  'tk.forYou': { id: 'Untukmu', en: 'For You' },
  'tk.readyHint': {
    id: '✓ Video ini sudah siap — ketuk bulatan LC untuk memeriksa',
    en: '✓ This video is ready — tap the LC bubble to check it',
  },
  'tk.song.0': {
    id: 'Suara asli - wellness_daily_id',
    en: 'Original sound - wellness_daily_id',
  },
  'tk.song.1': {
    id: 'Mix berita - update sipil',
    en: 'News mix - civic updates',
  },
  'tk.song.2': {
    id: 'Beat tren - opini panas',
    en: 'Trending beat - hot takes',
  },
};
