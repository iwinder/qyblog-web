import Vue from 'vue'
import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'


export const defaultLang = 'zh-CN'

const messages = {
    'zb-CN': {
        ...zhCN
    }
}


//注册i8n实例并引入语言文件
const localeData = {
    legacy: false, // composition API
    silentTranslationWarn: true,
    locale: defaultLang,
    fallbackLocale: defaultLang,
    messages,
}

// setup i18n instance with glob
const i18n = createI18n(localeData);
