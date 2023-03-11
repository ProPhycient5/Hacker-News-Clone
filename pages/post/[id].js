import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import OverLayLoader from "../../components/OverlayLoader";

const decodeText = (text) => {
  const element = document.createElement("div");
  element.innerHTML = text;
  return element.textContent;
};

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const getPost = async () => {
    setLoading("LOADING");
    try {
      const url = `http://hn.algolia.com/api/v1/items/${id}`;
      const response = await axios.get(url);
      console.log("response from detail post", response);
      if (response["data"]) {
        setLoading("LOADED");
        console.log("post details", id, response?.data);
        setPost(response?.data);
      } else setLoading("NO_DATA");
    } catch (error) {
      setError(true);
      console.log("Error has occurred while fetching the detailed post", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  if (error) {
    return (
      <div className="w-screen h-20 flex flex-col justify-center items-center text-3xl">
        An error occurred while fetching the data.
      </div>
    );
  }

  if (loading === "LOADED")
    return (
      <div className="w-screen flex flex-col justify-center items-center text-gray-300">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl text-center font-bold text-green-500 my-5">
            Detailed Post
          </h1>
          <h2 className="mb-3">
            <span className="text-green-500 text-lg font-medium">Title:</span>{" "}
            {post.title}
          </h2>
          <p className="mb-3">
            <span className="text-green-500 text-lg font-medium">Points:</span>{" "}
            {post.points}
          </p>
          <h2 className="mb-3 text-green-500 text-lg font-medium">
            List of Comments
          </h2>
          {post?.children.length === 0 && (
            <div>There is not a single comment.</div>
          )}
          <div>
            {post?.children?.length > 0 &&
              post.children.map((comment, idx) => (
                <div key={comment?.id} className="mb-3.5">
                  {idx + 1}.{" "}
                  {comment.text
                    ? decodeText(comment.text)
                    : "No comment is found"}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  else if (loading === "LOADING") return <OverLayLoader />;
  else if (loading === "NO_DATA")
    return (
      <div className="w-screen h-20 flex flex-col justify-center items-center text-3xl">
        No detailed post is found
      </div>
    );
};

export default PostDetail;
