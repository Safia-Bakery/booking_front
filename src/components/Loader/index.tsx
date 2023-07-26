import styles from "./index.module.scss";

const Loading = () => {
  return (
    <div className={styles.wrap}>
      <img src="/assets/images/loading.gif" alt="loading" width={50} height={50} />
    </div>
  );
};

export default Loading;
