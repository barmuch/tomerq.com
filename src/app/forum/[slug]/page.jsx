"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";

const SingleForum = ({params}) => {
  
  const { slug } = params
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (slug) {
      // Fetch post and comments based on slug
      const fetchPostAndComments = async () => {
        try {
          const resPost = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`);
          if (!resPost.ok) {
            throw new Error('Failed to fetch post');
          }
          const postData = await resPost.json();
          setPost(postData);

          const resComments = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}/comments`);
          if (!resComments.ok) {
            throw new Error('Failed to fetch comments');
          }
          const commentsData = await resComments.json();
          setComments(commentsData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPostAndComments();
    }
  }, [slug]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });
      if (!res.ok) {
        throw new Error("Failed to post comment");
      }
      const newCommentData = await res.json();
      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col ">
      <div className="md:h-12 bg-primary1 text-primary2 border-b-1">
        <Navbar />
      </div>
      <div className="flex-1 flex md:flex-row max-w-full bg-primary1 py-5 border-t-2 border-primary2 overflow-hidden gap-4 px-4 justify-center">
        <div className="w-full md:w-4/5 bg-primary2 rounded-lg overflow-y-auto py-3">
          {/* title */}
          <div className="bg-primary1 text-primary2 md:text-3xl md:p-2 border-1 border-primary2 rounded-r-lg inline-block">
            Forum Pertanyaan
          </div>
          {/* container */}
          <div className="flex flex-col w-4/5 gap-4 mx-auto mt-2">
            {/* post pertanyaan */}
            {post && (
              <div className="w-full flex-col flex gap-2 rounded-lg shadow-2xl bg-white p-2 gap-2">
                <h1 className="font-bold">{post.title}</h1>
                <p>{post.content}</p>
                <div className="text-sm">dari: {post.authorName}</div>
              </div>
            )}
    
            

            {/* daftar komentar */}
            <div className="text-2xl font-semibold">Diskusi</div>
            <div className="flex flex-col gap-2 ml-10">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="w-full bg-white h-1/5 rounded-lg drop-shadow-2xl p-2 gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer"
                >
                  <div className="indent-6">{comment.content}</div>
                  <div className="flex flex-row justify-between">
                    <div className="text-sm">dari: {comment.author.name}</div>
                    <div className="text-sm">balas</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/5 bg-primary2 rounded-lg py-3 hidden">
          <div className="bg-primary1 text-primary2 md:text-3xl md:p-2 border-1 border-primary2 rounded-r-lg inline-block">
            Berita & Artikel
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleForum;
