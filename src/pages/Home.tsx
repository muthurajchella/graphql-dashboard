import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries";
import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const POSTS_PER_PAGE = 10;

const Home = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, loading, error, fetchMore, networkStatus } = useQuery(
    GET_ALL_POSTS,
    {
      variables: { page: 1, limit: POSTS_PER_PAGE },
      notifyOnNetworkStatusChange: true,
    }
  );

  // Initial data load
  useEffect(() => {
    if (data?.posts?.data && allPosts.length === 0) {
      setAllPosts(data.posts.data);
      if (data.posts.data.length < POSTS_PER_PAGE) {
        setHasMore(false);
      }
    }
  }, [data, allPosts.length]);

  // Observer callback for infinite scroll
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;

          fetchMore({
            variables: { page: nextPage, limit: POSTS_PER_PAGE },
          }).then((res) => {
            const newPosts = res.data?.posts?.data || [];

            if (newPosts.length === 0) {
              setHasMore(false);
              return;
            }

            // Remove duplicate posts
            const newUniquePosts = newPosts.filter(
              (post: any) =>
                !allPosts.some((existing) => existing.id === post.id)
            );

            setAllPosts((prev) => [...prev, ...newUniquePosts]);
            setPage(nextPage);
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, fetchMore, allPosts]
  );

  if (error) {
    return <p className="text-danger text-center">Error: {error.message}</p>;
  }

  return (
    <div className="container py-4">
      {allPosts.map((post, index) => {
        const card = (
          <div key={post.id} className="card mb-3 p-3 shadow-sm">
            <h5>{post.title}</h5>
            <p>{post.body}</p>
            <Link to={`/post/${post.id}`} className="btn btn-link p-0">
              View Details
            </Link>
          </div>
        );

        // Attach ref to last post for infinite scroll
        if (index === allPosts.length - 1) {
          return (
            <div ref={lastPostRef} key={`last-${post.id}`}>
              {card}
            </div>
          );
        } else {
          return card;
        }
      })}

      {/* Status messages */}
      {loading && networkStatus === 1 && (
        <p className="text-center">Loading posts...</p>
      )}
      {networkStatus === 3 && (
        <p className="text-center">Loading more posts...</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-muted">No more posts</p>
      )}
    </div>
  );
};

export default Home;
