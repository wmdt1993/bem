import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
export function getTranslationProviders() {
    let locale;
    if (localStorage.getItem('localeId') !== null) {
        locale = localStorage.getItem('localeId');
    }
    else {
        locale = null;
    }
    console.log('reading locale:' + locale);
    // return no providers if fail to get translation file for locale
    const noProviders = [];
    // No locale or U.S. English: no translation providers
    if (!locale || locale === 'en-US') {
        return Promise.resolve(noProviders);
    }
    // Ex: 'locale/messages.fr.xlf`
    const translationFile = `./locale/messages.${locale}.xlf`;
    return getTranslationsWithSystemJs(translationFile)
        .then((translations) => [
        { provide: TRANSLATIONS, useValue: translations },
        { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: LOCALE_ID, useValue: locale }
    ])
        .catch(() => noProviders); // ignore if file not found
}
function getTranslationsWithSystemJs(file) {
    return System.import(file + '!text'); // relies on text plugin
}
//# sourceMappingURL=language.provider.js.map