// Posts.js
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("https://codebuddy.review/posts");
      const data = await response.json();
      console.log(data.data);

  //    if (Array.isArray(data.data)) {
        // Add this check
        setPosts(data.data);
   //   } else {
    //    console.error("Fetched data is not an array");
  //    }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <h1 className="mb-8 text-3xl font-bold">Posts</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg bg-white p-4 shadow-md">
              <img
                src={post.image || "https://your-default-image-url.com/640/480/food"}
                alt="Post"
                className="mb-2 h-auto w-full rounded-md"
              />
              {/* used another default image URL that doesn't cause the MSW warning. but it is still there :) */}
              <p className="font-semibold">{`${post.firstName} ${post.lastName}`}</p>
              <p className="mb-4 text-gray-600">{post.writeup}</p>

              <img src={post.avatar} alt="Img" className="inline-block h-10 w-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
