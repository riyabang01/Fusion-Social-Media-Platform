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
    const [post, setPost] = useState(null); // single post

    useEffect(() => {
        // check if post already exists in detailPost
        const existingPost = detailPost.find(p => p._id === id);
        if (existingPost) {
            setPost(existingPost);
        } else {
            // fetch post from API
            dispatch(getPost({ detailPost, id, auth }));
        }
    }, [detailPost, dispatch, id, auth]);

    // update post when detailPost changes
    useEffect(() => {
        const updatedPost = detailPost.find(p => p._id === id);
        if (updatedPost) setPost(updatedPost);
    }, [detailPost, id]);

    return (
        <div className="posts">
            {!post ? (
                <img src={LoadIcon} alt="Loading..." className="d-block mx-auto my-4" />
            ) : (
                <PostCard post={post} key={post._id} />
            )}
        </div>
    );
};

export default Post;
