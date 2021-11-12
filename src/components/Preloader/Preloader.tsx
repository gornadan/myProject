import s from "./Preloader.module.css";

export const Preloader = () => {
  return (
    <>
      <div className={s.loading}>
        <div className={s.loading_text}>
          <span className={s.loading_text_words}>L</span>
          <span className={s.loading_text_words}>O</span>
          <span className={s.loading_text_words}>A</span>
          <span className={s.loading_text_words}>D</span>
          <span className={s.loading_text_words}>I</span>
          <span className={s.loading_text_words}>N</span>
          <span className={s.loading_text_words}>G</span>
          <span className={s.loading_text_words}>.</span>
          <span className={s.loading_text_words}>.</span>
          <span className={s.loading_text_words}>.</span>
        </div>
      </div>
    </>
  );
};
