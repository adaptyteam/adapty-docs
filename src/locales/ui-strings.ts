export const UI_STRINGS = {
  feedback: {
    question:     { en: 'Was this page helpful?',          zh: '这个页面对您有帮助吗？' },
    yes:          { en: 'Yes',                             zh: '有帮助' },
    no:           { en: 'No',                              zh: '没帮助' },
    yesAriaLabel: { en: 'Yes, this page was helpful',      zh: '是的，这个页面对我有帮助' },
    noAriaLabel:  { en: 'No, this page was not helpful',   zh: '不，这个页面对我没有帮助' },
    followupYes:  { en: 'How can we make it even better?', zh: '我们如何可以做得更好？' },
    followupNo:   { en: 'What was missing?',               zh: '哪些内容缺失或不清楚？' },
    placeholder:  { en: 'Share your thoughts...',          zh: '分享您的想法...' },
    submit:       { en: 'Submit',                          zh: '提交' },
    thanks:       { en: 'Thank you for your feedback!',    zh: '感谢您的反馈！' },
  },
  header: {
    documentation: { en: 'Documentation',   zh: '文档' },
    mobileSdk:     { en: 'Mobile SDK',       zh: '移动端 SDK' },
    serverApi:     { en: 'Server API',       zh: '服务端 API' },
    whatsNew:      { en: "What's new",       zh: '最新动态' },
    supportForum:  { en: 'Support Forum',    zh: '支持论坛' },
    signIn:        { en: 'Sign In',          zh: '登录' },
    signUpFree:    { en: 'Sign Up for Free', zh: '免费注册' },
  },
  search: {
    placeholder: { en: 'Search documentation...', zh: '搜索文档...' },
    noResults:   { en: 'No results found.',        zh: '未找到相关结果。' },
  },
  articleButtons: {
    copyForLlm:     { en: 'Copy for LLM',    zh: '复制给 AI' },
    viewAsMarkdown: { en: 'View as Markdown', zh: '查看 Markdown' },
    loading:        { en: 'Loading...',       zh: '加载中...' },
    copied:         { en: 'Copied!',          zh: '已复制！' },
  },
  toc: {
    onThisPage: { en: 'On this page', zh: '本页目录' },
  },
  footer: {
    sdkSampleApps: { en: 'Adapty SDK Sample Apps', zh: 'Adapty SDK 示例应用' },
    sampleApps:    { en: 'Sample apps',             zh: '示例应用' },
    sdkReference:  { en: 'SDK Reference',           zh: 'SDK 参考' },
    apiReference:  { en: 'API Reference',            zh: 'API 参考' },
    resources:     { en: 'Resources',               zh: '资源' },
    dashboard:     { en: 'Adapty Dashboard',        zh: 'Adapty 控制台' },
    blog:          { en: 'Blog',                    zh: '博客' },
    support:       { en: 'Support',                 zh: '支持' },
    serverApi:     { en: 'Server-side API',         zh: '服务端 API' },
    webApi:        { en: 'Web API',                 zh: 'Web API' },
    analyticsApi:  { en: 'Analytics export API',    zh: '数据导出 API' },
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
