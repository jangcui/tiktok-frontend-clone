import config from '~/config';

import { HeaderOnly } from '~/layouts';
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Live from '~/pages/Live';
import NotFoundPage from '~/pages/NotFoundPage';
import Profile from '~/pages/Profile';
import SearchPage from '~/pages/SearchPage';
import UploadPage from '~/pages/UploadPage';
import VideoPage from '~/pages/VideoPage';

const publicRouter = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile, layout: null },
    { path: config.routes.upload, component: UploadPage, layout: HeaderOnly },
    { path: config.routes.search, component: SearchPage },
    { path: config.routes.video, component: VideoPage, layout: null },
    { path: config.routes.notfound, component: NotFoundPage, layout: HeaderOnly },
];

const privateRouter = [];

export { publicRouter, privateRouter };
