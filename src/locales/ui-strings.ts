export const UI_STRINGS = {
  en: {
    feedback: {
      question: 'Was this page helpful?',
      yes: 'Yes',
      no: 'No',
      yesAriaLabel: 'Yes, this page was helpful',
      noAriaLabel: 'No, this page was not helpful',
      followupYes: 'How can we make it even better?',
      followupNo: 'What was missing?',
      placeholder: 'Share your thoughts...',
      submit: 'Submit',
      thanks: 'Thank you for your feedback!',
    },
    header: {
      documentation: 'Documentation',
      mobileSdk: 'Mobile SDK',
      serverApi: 'Server API',
      whatsNew: "What's new",
      supportForum: 'Support Forum',
      signIn: 'Sign In',
      signUpFree: 'Sign Up for Free',
    },
  },
  zh: {
    feedback: {
      question: '这个页面对您有帮助吗？',
      yes: '有帮助',
      no: '没帮助',
      yesAriaLabel: '是的，这个页面对我有帮助',
      noAriaLabel: '不，这个页面对我没有帮助',
      followupYes: '我们如何可以做得更好？',
      followupNo: '哪些内容缺失或不清楚？',
      placeholder: '分享您的想法...',
      submit: '提交',
      thanks: '感谢您的反馈！',
    },
    header: {
      documentation: '文档',
      mobileSdk: '移动端 SDK',
      serverApi: '服务端 API',
      whatsNew: '最新动态',
      supportForum: '支持论坛',
      signIn: '登录',
      signUpFree: '免费注册',
    },
  },
} as const;

export type UILocale = keyof typeof UI_STRINGS;

export function getUIStrings(locale?: string) {
  return UI_STRINGS[(locale as UILocale) ?? 'en'] ?? UI_STRINGS.en;
}
