import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
  const [post, setPost] = useState([]);
  const [processState, setProcessState] = useState(true)
  const {id} = useParams();
  useEffect(() => {
    axios.get(`/posts/${id}`)
         .then(data => {
            setPost(data.data);
            setProcessState(false)
          })
         .catch(err => {
          console.warn(err);
          alert('Ошибка при загрузки статьи')
         })
  }, [])
 console.log(post)
  if (processState) {
    return <Post isLoading={processState}/>
  }
  return (
    <>
      <Post
        id={post._id}
        title={post.title}
        imageUrl={post.imageUrl ? `http://localhost:4444${post.imageUrl}`: null}
        user={post.user}
        createdAt={post.updatedAt}
        viewsCount={post.viewsCount}
        commentsCount={post.commentsCount}
        tags={post.tags}
        isEditable
      >
        <p>
          {post.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
