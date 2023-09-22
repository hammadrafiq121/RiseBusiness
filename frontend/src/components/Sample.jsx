import React, { useState } from "react";
import axios from "axios";

function Sample() {
  const addStatus = async (comments) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/samples/add`,
        { comments }
      );
      return response.data;
    } catch (error) {
      console.log(`Error while calling add sample api ${error}`);
      return error;
    }
  };

  const [comments, setComments] = useState([""]); // Initialize with one empty comment field
  const addCommentField = () => {
    if (comments[comments.length - 1].trim() !== "") {
      setComments([...comments, ""]); // Add a new empty comment field
    }
  };
  const handleCommentChange = (index, value) => {
    const newComments = [...comments];
    newComments[index] = value;
    setComments(newComments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nonEmptyComments = comments.filter(
      (comment) => comment.trim() !== ""
    );
    // Handle form submission with comments array (send to the server or perform other actions)
    await addStatus(nonEmptyComments);
  };

  return (
    <form onSubmit={handleSubmit}>
      {comments.map((comment, index) => (
        <div key={index}>
          <textarea
            value={comment}
            onChange={(e) => handleCommentChange(index, e.target.value)}
            placeholder="Enter your comment"
          />
        </div>
      ))}
      <button type="button" onClick={addCommentField}>
        Add Comment
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Sample;
