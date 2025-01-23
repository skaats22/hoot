// src/components/HootList/HootList.jsx

import { Link } from "react-router";
import styles from "./HootListPage.module.css";
import Icon from "../../components/Icon/Icon";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";

const HootList = (props) => {
  return (
    <main className={styles.container}>
      {props.hoots.map((hoot) => (
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
          <article>
            <header>
              <div>
                <h2>{hoot.title}</h2>
                <Icon category={hoot.category} />
              </div>
              <p>
                {`${hoot.author.email} posted on
                ${new Date(hoot.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <AuthorInfo content={hoot} />
            <p>{hoot.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default HootList;
