import { createPinia } from 'pinia';
import {useSiteInfo} from './siteInfo';
import {useCommentInfo} from './comment';
import {useLinksInfo} from './links';
import {useMenusInfo} from './menusInfo';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export default () => {
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate)
    useSiteInfo(pinia);
    useCommentInfo(pinia);
    useLinksInfo(pinia);
    useMenusInfo(pinia);

    return pinia;
};