import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from '../../redux/actions/postAction';
import LoadIcon from '../../images/loading.gif';
import PostCard from "../../components/PostCard";

const Post = () => {
    const { id } = useParams();
    const { auth, detailPost } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const existingPost = detailPost.find(p => p._id === id);
        if (existingPost) {
            setPost(existingPost);
        } else {
            dispatch(getPost({ detailPost, id, auth }));
        }
    }, [detailPost, dispatch, id, auth]);

    useEffect(() => {
        const updatedPost = detailPost.find(p => p._id === id);
        if (updatedPost) setPost(updatedPost);
    }, [detailPost, id]);

    return (
        <div className="post_detail_view container py-4 px-3 d-flex flex-column align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: "720px" }}>
                {!post ? (
                    <div className="d-flex justify-content-center my-5 py-5">
                        <img src={LoadIcon} alt="Loading..." width="45" />
                    </div>
                ) : (
                    <PostCard post={post} key={post._id} />
                )}
            </div>
        </div>
    );
};

export default Post;
