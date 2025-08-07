import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_POST } from "../graphql/queries";

const PostDetails = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_SINGLE_POST, {
    variables: { id },
  });

  if (loading) return <p className="text-center mt-5">Loading post...</p>;
  if (error) return <p className="text-danger mt-5">Error: {error.message}</p>;

  const post = data?.post;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow">
            {/* Post Image */}
            <img
              src={
                "https://media.istockphoto.com/id/1392123633/vector/studio-interior-with-carbon-fiber-texture-modern-carbon-fiber-textured-red-black-interior.jpg?s=612x612&w=0&k=20&c=faHNGYoArmyqpHAjtN2wAilbegx83TEPRP08i69hsuQ="
              }
              className="card-img-top img-fluid"
              alt={post.title}
              style={{
                objectFit: "cover",
                height: "150px",
                backgroundPosition: "center",
              }}
            />

            {/* Post Content */}
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="card-text">{post.body}</p>

              <div className="d-flex justify-content-between mt-4 text-muted small">
                <span>Author: {post.user?.name || "Unknown"}</span>
                <span>Post ID: #{post.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
