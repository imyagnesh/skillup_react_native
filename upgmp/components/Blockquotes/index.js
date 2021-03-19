import styles from "./Blockquotes.module.css";

const Blockquotes = ({ quote, author }) => {
  return (
    <blockquote className={styles.blockquote}>
      <p>{quote}</p>
      {!!author && <h6 className="m-0">{`- ${author}`}</h6>}
    </blockquote>
  );
};

export default Blockquotes;
