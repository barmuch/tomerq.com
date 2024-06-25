"use client"
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link"

const Forum = () => {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newPost, setNewPost] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handlePostChange = (e) => {
        setNewPost(e.target.value);
    };

    const handlePostSubmit = async () => {
        if (newTitle.trim() === "" || newPost.trim() === "") {
            alert("Please enter both a title and a question.");
            return;
        }
        if (!session) {
            alert("You must be logged in to post a question.");
            return;
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTitle, content: newPost, authorId: session.user.id, name: session.user.name }),
            });
            if (!res.ok) {
                throw new Error("Failed to post question");
            }
            const newPostData = await res.json();
            setPosts([newPostData, ...posts]); // Prepend the new post to the posts array
            setNewTitle("");
            setNewPost("");
            setCurrentPage(1); // Reset to the first page to show the new post
        } catch (error) {
            console.error(error);
        }
    };

    // Calculate the posts to display on the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="md:h-12 bg-primary1 text-primary2 border-b-1">
                <Navbar />
            </div>
            <div className="flex-1 flex md:flex-row max-w-full bg-primary1 py-5 border-t-2 border-primary2 overflow-hidden gap-4 px-4 justify-center">
                <div className="w-full md:w-4/5 bg-primary2 rounded-lg overflow-y-auto py-3">
                    {/* title */}
                    <div className="bg-primary1 text-primary2 md:text-3xl md:p-2 border-1 border-primary2 rounded-r-lg inline-block">Forum Pertanyaan</div>
                    {/* container */}
                    <div className="flex flex-col w-4/5 gap-4 mx-auto mt-2">
                        {/* post pertanyaan */}
                        <div className="w-full flex-col flex gap-2 rounded-lg shadow-2xl bg-white p-2 gap-2">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="p-2"
                                placeholder="Judul pertanyaan"
                                value={newTitle}
                                onChange={handleTitleChange}
                            />
                            <textarea
                                id="post"
                                name="post"
                                rows="3"
                                cols="33"
                                className="resize-none p-2"
                                placeholder="Apa yang ingin kamu tanyakan?..."
                                value={newPost}
                                onChange={handlePostChange}
                            ></textarea>
                            <div className="flex justify-end">
                                <div
                                    className="bg-primary1 hover:bg-hover2 rounded-lg text-primary2 w-fit p-2 hover:cursor-pointer"
                                    onClick={handlePostSubmit}
                                >
                                    Kirim
                                </div>
                            </div>
                        </div>

                        {/* daftar pertanyaan */}
                        <div className="text-2xl font-semibold">Pertanyaan lain</div>

                        <div className="flex flex-col gap-2">
                            {currentPosts.map((post) => (
                                <Link
                                    className="w-full bg-white h-1/5 rounded-lg drop-shadow-2xl p-2 gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer"
                                    key={post.id} href={`/forum/${post.id}`}
                                >
                                    <div className="font-bold">{post.title}</div>
                                    <div className="indent-6">{post.content}</div>
                                    <div className="flex flex-row justify-between">
                                        <div className="text-sm">dari: {post.authorName}</div>
                                        <div className="text-sm">balas</div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-4">
                            <nav>
                                <ul className="flex list-none">
                                    {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                                        <li key={index} className="px-2">
                                            <button
                                                onClick={() => paginate(index + 1)}
                                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-primary1 text-primary2' : 'bg-gray-200'}`}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/5 bg-primary2 rounded-lg py-3 hidden ">
                    <div className="bg-primary1 text-primary2 md:text-3xl md:p-2 border-1 border-primary2 rounded-r-lg inline-block">Berita & Artikel</div>
                </div>
            </div>
        </div>
    );
};

export default Forum;
