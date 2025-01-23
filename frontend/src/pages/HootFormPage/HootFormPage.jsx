// src/components/HootForm/HootForm.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as hootService from "../../services/hootService";

const HootForm = (props) => {
  const { hootId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News",
  });

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setFormData(hootData);
    };
    // If a hootId is present, we make a request to our server and use the
    //  hootData response to set the formData state. If there is no hootId,
    //  we leave the initial state of formData unchanged.
    if (hootId) fetchHoot();

    // A cleanup function is a function that is returned from the useEffect()
    //  hook. The job of a cleanup function is to undo whatever the effect did.
    return () => setFormData({ title: "", text: "", category: "News" });
  }, [hootId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

    // If a hootId is present, we call props.handleUpdateHoot(hootId, formData). 
    //  Otherwise, we call props.handleAddHoot(formData)
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (hootId) {
      props.handleUpdateHoot(hootId, formData);
    } else {
      props.handleAddHoot(formData);
    }
  };

  return (
    <main>
      <h1>{hootId ? "Edit Hoot" : "New Hoot"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default HootForm;
