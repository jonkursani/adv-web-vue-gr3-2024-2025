import {createI18n} from "vue-i18n";
import sq from "@/locales/sq.js";
import en from "@/locales/en.js";

export default createI18n({
    legacy: false,
    locale: import.meta.env.VITE_I18N_LOCALE || 'sq',
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
    messages: {
        sq: sq,
        en: en
    }
})