import React, { Fragment } from "react";
import CSSstyle from "./CourseSection.module.css";
import CSSstyleChild from "./Courses/Course.module.css";
import Web from "../../../assets/2D.PNG";
import Cinema4D from "../../../assets/Cinema4d.PNG";
import Mobile from "../../../assets/MobileApp.PNG";
import One from "../../../assets/one.png";
import PsAiXd from "../../../assets/PsAiXd.PNG";
import UiUx from "../../../assets/UIUX.PNG";
import {
  Typography,
  Container,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import EvenCourse from "./Courses/EvenCourse";
import OddCourse from "./Courses/OddCourse";

function CourseSection() {
  const courseArr = [Cinema4D, Mobile, One, PsAiXd, UiUx, Web];

  let Courses = courseArr.map((courseImage, index) => {
    return index % 2 !== 0 ? (
      <EvenCourse key={index} courseImage={courseImage} />
    ) : (
      <OddCourse key={index} courseImage={courseImage} />
    );
  });

  return (
    <Fragment>
      <Typography className={CSSstyle.marginTopBottom} variant="h3">
        Find What Fascinates You
      </Typography>
      <Container>
        <div className={`${CSSstyleChild.Card} ${CSSstyleChild.column}`}>
          <CardMedia
            className={`
            ${CSSstyle.mediaWidth} 
            ${CSSstyleChild.courseImage}
            `}
            image={Cinema4D}
            title="Live from space album cover"
          />
          <CardContent
            style={{ background: "#fff" }}
            className={`${CSSstyleChild.courseContent} ${CSSstyleChild.contentWidth} `}
          >
            <Typography color="textPrimary" component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
              modi neque debitis, ea recusandae nemo ipsum ut tempore,
              architecto quasi aperiam! Dolorem, porro sint, eum minima magnam
              explicabo, perferendis perspiciatis in aperiam quaerat distinctio
              omnis quidem. Laudantium minima quidem excepturi repellendus nemo
              velit. Voluptas quae molestiae amet quibusdam laborum. Dolorum!
            </Typography>
            <hr />
          </CardContent>
        </div>

        <br />
        <br />
        {Courses}
      </Container>
    </Fragment>
  );
}

export default CourseSection;
