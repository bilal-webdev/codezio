import React from "react";
import CSSstyle from "./Course.module.css";
import { CardContent, CardMedia, Typography } from "@material-ui/core";

function OddCourse(props) {
  const { courseImage } = props;

  return (
    <div className={`${CSSstyle.Card} ${CSSstyle.column}`}>
      <CardMedia
        className={CSSstyle.courseImage}
        image={courseImage}
        title="Live from space album cover"
      />
      <CardContent className={CSSstyle.courseContent}>
        <Typography component="h5" variant="h5">
          Live From Space
        </Typography>
        <Typography variant="subtitle1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem modi
          neque debitis, ea recusandae nemo ipsum ut tempore, architecto quasi
          aperiam! Dolorem, porro sint, eum minima magnam explicabo, perferendis
          perspiciatis in aperiam quaerat distinctio omnis quidem. Laudantium
          minima quidem excepturi repellendus nemo velit. Voluptas quae
          molestiae amet quibusdam laborum. Dolorum!
        </Typography>
        <hr className={CSSstyle.linestyle} />
      </CardContent>
    </div>
  );
}

export default OddCourse;
