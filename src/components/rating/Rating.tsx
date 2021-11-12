import StarIcon from "@material-ui/icons/Star";
import s from "../../table.module.css";

type PropsType = {
  blue: boolean;
};

export const Rating = (props: PropsType) => {
  return (
    <>
      <StarIcon className={props.blue ? s.rating_color : s.rating} />
    </>
  );
};
