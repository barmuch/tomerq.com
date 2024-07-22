"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";

const SingleForum = ({ params }) => {
  const { data: session, status } = useSession();
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [showReplyToPost, setShowReplyToPost] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [refreshComments, setRefreshComments] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchPostAndComments = async () => {
        try {
          const resPost = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
            method: "GET",
            headers: {
              "Cache-Control": "no-store",
            },
          });
          if (!resPost.ok) {
            throw new Error("Failed to fetch post");
          }
          const postData = await resPost.json();
          setPost(postData);

          const resComments = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${slug}`, {
            method: "GET",
            headers: {
              "Cache-Control": "no-store",
            },
          });
          if (!resComments.ok) {
            throw new Error("Failed to fetch comments");
          }
          const commentsData = await resComments.json();
          commentsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setComments(commentsData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPostAndComments();
    }
  }, [slug, refreshComments]);

  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleReplyChange = (e) => setNewReply(e.target.value);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }
    if (!session) {
      alert("You must be logged in to comment.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          postId: slug,
          authorId: session.user.id,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to post comment");
      }
      const newCommentData = await res.json();
      setComments([newCommentData, ...comments]);
      setNewComment("");
      setShowReplyToPost(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (newReply.trim() === "") {
      alert("Please enter a reply.");
      return;
    }
    if (!session) {
      alert("You must be logged in to reply.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newReply,
          postId: slug,
          authorId: session.user.id,
          parentCommentId: commentId,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to post reply");
      }
      const newReplyData = await res.json();

      // Update the comments state to include the new reply
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReplyData],
          };
        }
        return comment;
      });

      // Sort comments by creation time from newest to oldest
      updatedComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setComments(updatedComments);
      setNewReply("");
      setReplyCommentId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (commentId) => {
    if (!session) {
      alert("You must be logged in to delete comments.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete comment");
      }
      // Remove the comment and its replies from state
      setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId && comment.parentCommentId !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleReply = (commentId) => setReplyCommentId(commentId === replyCommentId ? null : commentId);
  const toggleReplyToPost = () => setShowReplyToPost(!showReplyToPost);

  const handleEditComment = (commentId, content) => {
    setEditCommentId(commentId);
    setEditedComment(content);
  };

  const handleEditSubmit = async (commentId) => {
    if (editedComment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }
    if (!session) {
      alert("You must be logged in to edit comments.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedComment }),
      });
      if (!res.ok) {
        throw new Error("Failed to edit comment");
      }
      const updatedComment = await res.json();

      // Update the comments state to include the edited comment
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, content: updatedComment.content };
        }
        return comment;
      });

      setComments(updatedComments);
      setEditCommentId(null);
      setEditedComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const renderComments = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parentCommentId === parentId)
      .map((comment) => (
        <div key={comment.id} className="w-full bg-white rounded-lg drop-shadow-2xl p-2 gap-2 cursor-pointer">
          {editCommentId === comment.id ? (
            <div className="mt-2">
              <textarea
                className="w-full border rounded p-2"
                rows="3"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              ></textarea>
              <button
                className="bg-primary1 text-primary2 p-2 mt-2 rounded"
                onClick={() => handleEditSubmit(comment.id)}
              >
                Simpan
              </button>
              <button
                className="bg-red-500 text-white p-2 mt-2 rounded"
                onClick={() => setEditCommentId(null)}
              >
                Batal
              </button>
            </div>
          ) : (
            <>
              <div className="indent-6">{comment.content}</div>
              <div className="flex flex-row justify-between">
                <div className="text-sm">dari: {comment.author.name}</div>
                <div className="text-sm cursor-pointer" onClick={() => toggleReply(comment.id)}>balas</div>
                {comment.authorId === session?.user.id && (
                  <>
                    <div className="text-sm cursor-pointer" onClick={() => handleEditComment(comment.id, comment.content)}>edit</div>
                    <div className="text-sm cursor-pointer" onClick={() => handleDelete(comment.id)}>hapus</div>
                  </>
                )}
              </div>
              {comment.id === replyCommentId && (
                <div className="mt-2">
                  <textarea
                    className="w-full border rounded p-2"
                    rows="3"
                    value={newReply}
                    onChange={handleReplyChange}
                  ></textarea>
                  <button
                    className="bg-primary1 text-primary2 p-2 mt-2 rounded"
                    onClick={() => handleReplySubmit(comment.id)}
                  >
                    Kirim Balasan
                  </button>
                </div>
              )}
              <div className="ml-10">
                {renderComments(comments, comment.id)}
              </div>
            </>
          )}
        </div>
      ));
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="md:h-12 bg-primary1 text-primary2 border-b-1">
        <Navbar />
      </div>
      <div className="flex-1 flex md:flex-row max-w-full bg-primary1 py-5 border-t-2 border-primary2 overflow-hidden gap-4 px-4 justify-center">
        <div className="w-full md:w-4/5 bg-primary2 rounded-lg overflow-y-auto py-3">
          <div className="bg-primary1 text-primary2 md:text-3xl md:p-2 border-1 border-primary2 rounded-r-lg inline-block">
            Forum Diskusi
          </div>
          <div className="flex flex-col w-4/5 gap-4 mx-auto mt-2">
            {post && (
              <div className="flex flex-row gap-2 rounded-lg shadow-2xl bg-white p-2">
                <div className="w-full w-11/12 flex-col flex gap-2 gap-2 b-r-1">
                  <h1 className="font-bold">{post.title}</h1>
                  <p>{post.content}</p>
                  <div className="text-sm">dari: {post.authorName}</div>
                </div>
                <div
                  className="w-1/12 p-2 my-4 bg-primary1 text-primary2 hover:cursor-pointer hover:bg-hover2 items-center text-center rounded-lg place-items-center grid"
                  onClick={toggleReplyToPost}
                >
                  Jawab
                </div>
              </div>
            )}
            {showReplyToPost && (
              <div className="mt-2">
                <textarea
                  className="w-full border rounded p-2"
                  rows="3"
                  value={newComment}
                  onChange={handleCommentChange}
                ></textarea>
                <button
                  className="bg-primary1 text-primary2 p-2 mt-2 rounded"
                  onClick={handleCommentSubmit}
                >
                  Kirim Jawaban
                </button>
              </div>
            )}
            <div className="flex flex-col gap-2 ml-10">
              {renderComments(comments)}
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
