import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { getUser } from "../../services/authService";
import "./App.css";
import * as hootService from "../../services/hootService";
import NavBar from "../../components/NavBar/NavBar";
import LogInPage from "../LogInPage/LogInPage";
import HomePage from "../HomePage/HomePage";
import HootListPage from "../HootListPage/HootListPage";
import HootDetailsPage from "../HootDetailsPage/HootDetailsPage";
import HootFormPage from "../HootFormPage/HootFormPage";
import CommentFormPage from "../CommentFormPage/CommentFormPage";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [hoots, setHoots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllHoots() {
      const hootsData = await hootService.index();

      setHoots(hootsData);
    }
    if (user) fetchAllHoots();
    // Adding user to dependency array cuases the effect to fire off when
    //  page loads of the user state changes.
  }, [user]);

  async function handleAddHoot(hootFormData) {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate("/hoots");
  };

  async function handleDeleteHoot(hootId) {
    const deletedHoot = await hootService.deleteHoot(hootId);
    // Filter state using deletedHoot._id:
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate("/hoots");
  };

  async function handleUpdateHoot(hootId, hootFormData) {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    // We use map() here to update a specific hoot in the hoots state array.
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
  };

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            {/* Protected Routes (available only to signed-in users) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/hoots" element={<HootListPage hoots={hoots} />} />
            <Route
              path="/hoots/:hootId"
              element={
                <HootDetailsPage
                  user={user}
                  handleDeleteHoot={handleDeleteHoot}
                />
              }
            />
            <Route
              path="/hoots/new"
              element={<HootFormPage handleAddHoot={handleAddHoot} />}
            />
            <Route
              path="/hoots/:hootId/edit"
              element={<HootFormPage handleUpdateHoot={handleUpdateHoot} />}
            />
            <Route
              path="/hoots/:hootId/comments/:commentId/edit"
              element={<CommentFormPage />}
            />
          </Routes>
        ) : (
          <Routes>
            {/* Non-user Routes (available only to guests) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
          </Routes>
        )}
      </section>
    </main>
  );
}
