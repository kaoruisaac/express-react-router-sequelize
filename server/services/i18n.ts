import i18next from "i18next";
import path from "path";
import Backend from "i18next-fs-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(LanguageDetector)
    .use(Backend)
    .init({
        fallbackLng: 'en-US',
        supportedLngs: ['en-US', 'zh-TW'],
        backend: {
            loadPath: path.resolve('public/locales/{{lng}}/{{ns}}.json'),
            maxAge: 86400000, // 24 * 60 * 60 * 1000 ms
        },
    })