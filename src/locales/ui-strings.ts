export const UI_STRINGS = {
  feedback: {
    question:     { en: 'Was this page helpful?',          zh: '这个页面对您有帮助吗？',       tr: 'Bu sayfa yardımcı oldu mu?' },
    yes:          { en: 'Yes',                             zh: '有帮助',                        tr: 'Evet' },
    no:           { en: 'No',                              zh: '没帮助',                        tr: 'Hayır' },
    yesAriaLabel: { en: 'Yes, this page was helpful',      zh: '是的，这个页面对我有帮助',      tr: 'Evet, bu sayfa yardımcı oldu' },
    noAriaLabel:  { en: 'No, this page was not helpful',   zh: '不，这个页面对我没有帮助',      tr: 'Hayır, bu sayfa yardımcı olmadı' },
    followupYes:  { en: 'How can we make it even better?', zh: '我们如何可以做得更好？',        tr: 'Nasıl daha iyi yapabiliriz?' },
    followupNo:   { en: 'What was missing?',               zh: '哪些内容缺失或不清楚？',       tr: 'Eksik olan neydi?' },
    placeholder:  { en: 'Share your thoughts...',          zh: '分享您的想法...',               tr: 'Düşüncelerinizi paylaşın...' },
    submit:       { en: 'Submit',                          zh: '提交',                          tr: 'Gönder' },
    thanks:       { en: 'Thank you for your feedback!',    zh: '感谢您的反馈！',                tr: 'Geri bildiriminiz için teşekkürler!' },
  },
  header: {
    documentation: { en: 'Documentation',   zh: '文档',       tr: 'Dokümantasyon' },
    mobileSdk:     { en: 'Mobile SDK',       zh: '移动端 SDK', tr: 'Mobil SDK' },
    serverApi:     { en: 'CLI & APIs',       zh: 'CLI 与 API', tr: 'CLI ve API\'ler' },
    whatsNew:      { en: "What's new",       zh: '最新动态',   tr: 'Yenilikler' },
    supportForum:  { en: 'Support Forum',    zh: '支持论坛',   tr: 'Destek Forumu' },
    signIn:        { en: 'Sign In',          zh: '登录',       tr: 'Giriş Yap' },
    signUpFree:    { en: 'Sign Up for Free', zh: '免费注册',   tr: 'Ücretsiz Kaydol' },
  },
  search: {
    placeholder: { en: 'Search documentation...', zh: '搜索文档...',       tr: 'Dokümantasyonda ara...' },
    noResults:   { en: 'No results found.',        zh: '未找到相关结果。', tr: 'Sonuç bulunamadı.' },
  },
  articleButtons: {
    copyForLlm:     { en: 'Copy for LLM',    zh: '复制给 AI',     tr: 'LLM için kopyala' },
    viewAsMarkdown: { en: 'View as Markdown', zh: '查看 Markdown', tr: 'Markdown olarak görüntüle' },
    loading:        { en: 'Loading...',       zh: '加载中...',     tr: 'Yükleniyor...' },
    copied:         { en: 'Copied!',          zh: '已复制！',      tr: 'Kopyalandı!' },
  },
  toc: {
    onThisPage: { en: 'On this page', zh: '本页目录', tr: 'Bu sayfada' },
  },
  mobileSidebar: {
    tutorial: { en: 'Tutorial',    zh: '教程',       tr: 'Rehber' },
    sdk:      { en: 'SDK',         zh: 'SDK',        tr: 'SDK' },
    cliApis:  { en: 'CLI & APIs',  zh: 'CLI 与 API', tr: 'CLI ve API\'ler' },
    platform: { en: 'Platform',    zh: '平台',       tr: 'Platform' },
  },
  footer: {
    sdkSampleApps: { en: 'Adapty SDK Sample Apps', zh: 'Adapty SDK 示例应用', tr: 'Adapty SDK Örnek Uygulamaları' },
    sampleApps:    { en: 'Sample apps',             zh: '示例应用',            tr: 'Örnek uygulamalar' },
    sdkReference:  { en: 'SDK Reference',           zh: 'SDK 参考',            tr: 'SDK Referansı' },
    apiReference:  { en: 'API Reference',            zh: 'API 参考',           tr: 'API Referansı' },
    resources:     { en: 'Resources',               zh: '资源',                tr: 'Kaynaklar' },
    dashboard:     { en: 'Adapty Dashboard',        zh: 'Adapty 控制台',       tr: 'Adapty Kontrol Paneli' },
    blog:          { en: 'Blog',                    zh: '博客',                tr: 'Blog' },
    support:       { en: 'Support',                 zh: '支持',                tr: 'Destek' },
    serverApi:     { en: 'Server-side API',         zh: '服务端 API',          tr: 'Sunucu Tarafı API' },
    webApi:        { en: 'Web API',                 zh: 'Web API',             tr: 'Web API' },
    analyticsApi:  { en: 'Analytics export API',    zh: '数据导出 API',        tr: 'Analitik Dışa Aktarma API\'si' },
  },
} as const;

export type UILocale = keyof (typeof UI_STRINGS)['feedback']['question'];

type UIStringsResult = {
  [G in keyof typeof UI_STRINGS]: {
    [K in keyof (typeof UI_STRINGS)[G]]: string;
  };
};

export function getUIStrings(locale?: string): UIStringsResult {
  const l = locale ?? 'en';
  const result = {} as Record<string, Record<string, string>>;
  for (const [group, keys] of Object.entries(UI_STRINGS)) {
    result[group] = {};
    for (const [key, translations] of Object.entries(keys as Record<string, Record<string, string>>)) {
      result[group][key] = translations[l] ?? translations['en'];
    }
  }
  return result as UIStringsResult;
}
