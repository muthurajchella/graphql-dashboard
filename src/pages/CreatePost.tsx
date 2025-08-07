import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Container,
  Typography,
  Box,
} from "@mui/material";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("1");
  const [openError, setOpenError] = useState(false);

  const navigate = useNavigate();

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      alert("Post created successfully!");
      console.log("Created Post:", data);
      navigate("/");
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
      setOpenError(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPost({
      variables: {
        title,
        body,
        userId: parseInt(userId),
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Box className="p-4 border rounded shadow bg-white">
        <Typography variant="h5" gutterBottom>
          Create New Post
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <TextField
              label="Body"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <TextField
              label="User ID"
              type="number"
              variant="outlined"
              fullWidth
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </Box>

      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setOpenError(false)}
        >
          {error?.message || "Something went wrong"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreatePost;
