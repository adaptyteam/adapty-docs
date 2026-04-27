export const UI_STRINGS = {
  feedback: {
    question:     { en: 'Was this page helpful?',          zh: '这个页面对您有帮助吗？',       tr: 'Bu sayfa yardımcı oldu mu?',        ru: 'Эта страница была полезной?',            es: '¿Te ha resultado útil esta página?' },
    yes:          { en: 'Yes',                             zh: '有帮助',                        tr: 'Evet',                              ru: 'Да',                                     es: 'Sí' },
    no:           { en: 'No',                              zh: '没帮助',                        tr: 'Hayır',                             ru: 'Нет',                                    es: 'No' },
    yesAriaLabel: { en: 'Yes, this page was helpful',      zh: '是的，这个页面对我有帮助',      tr: 'Evet, bu sayfa yardımcı oldu',      ru: 'Да, эта страница была полезной',         es: 'Sí, esta página me ha resultado útil' },
    noAriaLabel:  { en: 'No, this page was not helpful',   zh: '不，这个页面对我没有帮助',      tr: 'Hayır, bu sayfa yardımcı olmadı',   ru: 'Нет, эта страница не была полезной',     es: 'No, esta página no me ha resultado útil' },
    followupYes:  { en: 'How can we make it even better?', zh: '我们如何可以做得更好？',        tr: 'Nasıl daha iyi yapabiliriz?',       ru: 'Как мы можем улучшить её?',              es: '¿Cómo podemos mejorarla aún más?' },
    followupNo:   { en: 'What was missing?',               zh: '哪些内容缺失或不清楚？',       tr: 'Eksik olan neydi?',                 ru: 'Чего не хватало?',                       es: '¿Qué faltaba?' },
    placeholder:  { en: 'Share your thoughts...',          zh: '分享您的想法...',               tr: 'Düşüncelerinizi paylaşın...',       ru: 'Поделитесь вашими мыслями...',           es: 'Comparte tu opinión...' },
    submit:       { en: 'Submit',                          zh: '提交',                          tr: 'Gönder',                            ru: 'Отправить',                              es: 'Enviar' },
    thanks:       { en: 'Thank you for your feedback!',    zh: '感谢您的反馈！',                tr: 'Geri bildiriminiz için teşekkürler!', ru: 'Спасибо за ваш отзыв!',                es: '¡Gracias por tu comentario!' },
  },
  header: {
    documentation: { en: 'Documentation',   zh: '文档',       tr: 'Dokümantasyon',     ru: 'Документация',             es: 'Documentación' },
    mobileSdk:     { en: 'Mobile SDK',       zh: '移动端 SDK', tr: 'Mobil SDK',         ru: 'SDK',                      es: 'SDK' },
    serverApi:     { en: 'CLI & APIs',       zh: 'CLI 与 API', tr: 'CLI ve API\'ler',   ru: 'CLI и API',                es: 'CLI y APIs' },
    whatsNew:      { en: "What's new",       zh: '最新动态',   tr: 'Yenilikler',        ru: 'Что нового',               es: 'Novedades' },
    supportForum:  { en: 'Support Forum',    zh: '支持论坛',   tr: 'Destek Forumu',     ru: 'Форум',                    es: 'Foro de soporte' },
    signIn:        { en: 'Sign In',          zh: '登录',       tr: 'Giriş Yap',         ru: 'Войти',                    es: 'Iniciar sesión' },
    signUpFree:    { en: 'Sign Up for Free', zh: '免费注册',   tr: 'Ücretsiz Kaydol',   ru: 'Зарегистрироваться',       es: 'Registrarse gratis' },
  },
  search: {
    placeholder: { en: 'Search documentation...', zh: '搜索文档...',       tr: 'Dokümantasyonda ara...',  ru: 'Поиск...',                es: 'Buscar en la documentación...' },
    noResults:   { en: 'No results found.',        zh: '未找到相关结果。', tr: 'Sonuç bulunamadı.',       ru: 'Результаты не найдены.', es: 'No se han encontrado resultados.' },
  },
  articleButtons: {
    copyForLlm:     { en: 'Copy for LLM',    zh: '复制给 AI',     tr: 'LLM için kopyala',              ru: 'Копировать для LLM',    es: 'Copiar para LLM' },
    viewAsMarkdown: { en: 'View as Markdown', zh: '查看 Markdown', tr: 'Markdown olarak görüntüle',     ru: 'Открыть Markdown',      es: 'Ver como Markdown' },
    loading:        { en: 'Loading...',       zh: '加载中...',     tr: 'Yükleniyor...',                 ru: 'Загрузка...',           es: 'Cargando...' },
    copied:         { en: 'Copied!',          zh: '已复制！',      tr: 'Kopyalandı!',                   ru: 'Скопировано!',          es: '¡Copiado!' },
  },
  toc: {
    onThisPage: { en: 'On this page', zh: '本页目录', tr: 'Bu sayfada', ru: 'На этой странице', es: 'En esta página' },
  },
  mobileSidebar: {
    tutorial: { en: 'Tutorial',    zh: '教程',       tr: 'Rehber',          ru: 'Руководство', es: 'Tutorial' },
    sdk:      { en: 'SDK',         zh: 'SDK',        tr: 'SDK',             ru: 'SDK',         es: 'SDK' },
    cliApis:  { en: 'CLI & APIs',  zh: 'CLI 与 API', tr: 'CLI ve API\'ler', ru: 'CLI и API',   es: 'CLI y APIs' },
    platform: { en: 'Platform',    zh: '平台',       tr: 'Platform',        ru: 'Платформа',   es: 'Plataforma' },
  },
  footer: {
    sdkSampleApps: { en: 'Adapty SDK Sample Apps', zh: 'Adapty SDK 示例应用', tr: 'Adapty SDK Örnek Uygulamaları', ru: 'Adapty SDK sample apps',   es: 'Apps de ejemplo del SDK de Adapty' },
    sampleApps:    { en: 'Sample apps',             zh: '示例应用',            tr: 'Örnek uygulamalar',             ru: 'Примеры приложений',       es: 'Apps de ejemplo' },
    sdkReference:  { en: 'SDK Reference',           zh: 'SDK 参考',            tr: 'SDK Referansı',                 ru: 'SDK reference',            es: 'Referencia del SDK' },
    apiReference:  { en: 'API Reference',            zh: 'API 参考',           tr: 'API Referansı',                 ru: 'API reference',            es: 'Referencia de la API' },
    resources:     { en: 'Resources',               zh: '资源',                tr: 'Kaynaklar',                     ru: 'Ресурсы',                  es: 'Recursos' },
    dashboard:     { en: 'Adapty Dashboard',        zh: 'Adapty 控制台',       tr: 'Adapty Kontrol Paneli',         ru: 'Дашборд Adapty',           es: 'Dashboard de Adapty' },
    blog:          { en: 'Blog',                    zh: '博客',                tr: 'Blog',                          ru: 'Блог',                     es: 'Blog' },
    support:       { en: 'Support',                 zh: '支持',                tr: 'Destek',                        ru: 'Поддержка',                es: 'Soporte' },
    serverApi:     { en: 'Server-side API',         zh: '服务端 API',          tr: 'Sunucu Tarafı API',             ru: 'Server-side API',          es: 'API del lado del servidor' },
    webApi:        { en: 'Web API',                 zh: 'Web API',             tr: 'Web API',                       ru: 'Web API',                  es: 'Web API' },
    analyticsApi:  { en: 'Analytics export API',    zh: '数据导出 API',        tr: 'Analitik Dışa Aktarma API\'si', ru: 'Export analytics API',     es: 'API de exportación de analíticas' },
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
