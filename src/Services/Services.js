import * as httpRequest from '~/utils/httpRequest';

export const getVideoList = async ({ type = 'for-you', page }) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error');
    }
};

export const getAVideo = async (id) => {
    try {
        const res = await httpRequest.get(`videos/${id}`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};

export const getUserVideo = async (id) => {
    try {
        const res = await httpRequest.get(`users/${id}/videos`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};

export const postVideo = async ({ formData }) => {
    try {
        const res = await httpRequest.post('videos', formData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteVideo = async ({ id }) => {
    try {
        const res = await httpRequest.Delete(`videos/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getVideoLiked = async ({ userId }) => {
    try {
        const res = await httpRequest.get(`users/${userId}/liked-videos`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSuggested = async ({ page, per_page }) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error');
    }
};

export const search = async ({ page, type = 'less', q }) => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                page,
                type,
                q,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error');
    }
};

export const register = async ({ type = 'email', email, password }) => {
    try {
        const res = await httpRequest.post('auth/register', {
            type,
            email: `${email}@gmail.com`,
            password: password,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const login = async ({ email, password }) => {
    try {
        const res = await httpRequest.post('auth/login', {
            email: `${email}@gmail.com`,
            password: password,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAnUser = async (pathName) => {
    try {
        const res = await httpRequest.get(`users/@${pathName}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const followUser = async (id) => {
    try {
        const res = await httpRequest.post(`users/${id}/follow`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const unFollowUser = async (id) => {
    try {
        const res = await httpRequest.post(`users/${id}/unfollow`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateCurrentUser = async ({ formData }) => {
    try {
        const res = await httpRequest.post(`auth/me?_method=PATCH`, formData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowList = async ({ page }) => {
    try {
        const res = await httpRequest.get('me/followings', {
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCommentsList = async (uuid) => {
    try {
        const res = await httpRequest.get(`videos/${uuid}/comments`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
export const likeAPost = async ({ id }) => {
    try {
        const res = await httpRequest.post(`videos/${id}/like`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
export const unLikeAPost = async ({ id }) => {
    try {
        const res = await httpRequest.post(`videos/${id}/unlike`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
export const likeComment = async (id) => {
    try {
        const res = await httpRequest.post(`comments/${id}/like`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
export const unLikeComment = async (id) => {
    try {
        const res = await httpRequest.post(`comments/${id}/unlike`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
export const postCreateComment = async (idVideo, comment) => {
    try {
        const res = await httpRequest.post(`videos/${idVideo}/comments`, {
            comment,
        });
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
export const deleteComment = async (idComment) => {
    try {
        const res = await httpRequest.Delete(`comments/${idComment}`);
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
export const editComment = async ({ id, comment }) => {
    try {
        const res = await httpRequest.patch(`comments/${id}`, {
            comment,
        });
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
