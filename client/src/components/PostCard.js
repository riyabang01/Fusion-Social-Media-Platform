import React from 'react';
import CardBody from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";
import CardHeader from "./home/post_card/CardHeader";
import Comments from './home/Comments';
import InputComment from "./home/InputComment";

const PostCard = ({ post, theme }) => {
  return (
    <div className="card my-4 border border-light-subtle rounded-4 shadow-sm bg-white overflow-hidden hover-in-shadow">
      <div className="p-1">
        <CardHeader post={post} />
      </div>
      
      <div className="px-2">
        <CardBody post={post} theme={theme} />
      </div>

      <div className="px-2 border-top border-light-subtle mt-2">
        <CardFooter post={post} />
      </div>

      <div className="bg-light-subtle border-top border-light-subtle px-3 py-2">
        <Comments post={post} />
      </div>

      <div className="border-top border-light-subtle p-2 bg-white">
        <InputComment post={post} />
      </div>
    </div>
  );
};

export default PostCard;
