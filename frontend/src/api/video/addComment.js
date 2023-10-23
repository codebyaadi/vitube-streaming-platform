import api from "../base/config";

export const addComment = async (text, postedBy, videoId, parentComment = null) => {
    try {
        const response = await api.post("/addcomment", {
            text,
            postedBy,
            video: videoId,
            parentComment
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getComments = async (videoId) => {
    try {
        const res = await api.get(`/getcomments/${videoId}`)
        return res.data;
    } catch (error) {
        throw error;
    }
}