// src/pages/CommentFormPage/CommentFormPage.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as hootService from "../../services/hootService";
import styles from './CommentFormPage.module.css';
import Icon from "../../components/Icon/Icon";

const CommentFormPage = (props) => {
  const [formData, setFormData] = useState({ text: "" });

  const navigate = useNavigate();

  const { hootId, commentId } = useParams();
  
  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      // Find comment in fetched hoot data
      setFormData(
        hootData.comments.find((comment) => comment._id === commentId)
      );
    };
    if (hootId && commentId) fetchHoot();
  }, [hootId, commentId]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (hootId && commentId) {
      await hootService.updateComment(hootId, commentId, formData);
      navigate(`/hoots/${hootId}`);
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: "" });
  };
  
  if (hootId && commentId) return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Edit Comment</h1>
        <label htmlFor='text-input'>Your comment:</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <button type='submit'><Icon category='Create' /></button>
      </form>
    </main>
  );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit"><Icon category='Create' /></button>
    </form>
  );
};

export default CommentFormPage;
