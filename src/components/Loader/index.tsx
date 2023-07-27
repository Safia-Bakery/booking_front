import styles from "./index.module.scss";

const Loading = () => {
  return (
    <div className={styles.wrap}>
      <img src="/assets/images/loading.gif" alt="loading" width={60} height={60} />
    </div>
  );
};

export default Loading;
