// src/components/HootDetails/HootDetails.jsx

import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as hootService from "../../services/hootService";
import CommentFormPage from "../CommentFormPage/CommentFormPage";
import Loading from "../../components/Loading/Loading";
import styles from "./HootDetailsPage.module.css";
import Icon from "../../components/Icon/Icon";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";

const HootDetailsPage = (props) => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);

  const user = props.user;

  async function handleAddComment(commentFormData) {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  }

  async function handleDeleteComment(commentId) {
    const deletedHoot = await hootService.deleteComment(hootId, commentId);
    setHoot({
      ...hoot,
      comments: hoot.comments.filter((comment) => comment._id !== commentId),
    });
  }

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);

  if (!hoot) return <Loading />;

  return (
    <main className={styles.container}>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <div>
            <AuthorInfo content={hoot} />
            {hoot.author._id === user._id && (
              <>
                <Link to={`/hoots/${hootId}/edit`}>
                  <Icon category="Edit" />
                </Link>
                <button onClick={() => props.handleDeleteHoot(hootId)}>
                  <Icon category="Trash" />
                </button>
              </>
            )}
          </div>
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <div>
                <AuthorInfo content={comment} />
                {comment.author._id === user._id && (
                  <>
                    <Link to={`/hoots/${hootId}/comments/${comment._id}/edit`}>
                      <Icon category="Edit" />
                    </Link>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      <Icon category="Trash" />
                    </button>
                  </>
                )}
              </div>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
        <CommentFormPage handleAddComment={handleAddComment} />
      </section>
    </main>
  );
};

export default HootDetailsPage;
