import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import "bootstrap/dist/css/bootstrap.css";
import { deepOrange, deepPurple, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
// import { deletePost } from "../../js/deletePost";

export default function PostAccordion(props) {
  function handleClick() {
    // deletePost(props);
  }
  return (
    <Accordion style={{ margin: "10px 0" }}>
      <AccordionSummary
        className="feed"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Avatar sx={{ bgcolor: deepOrange[400] }}>VJ</Avatar>
        <Typography style={{ margin: "auto 10px" }}>
          <span style={{ fontWeight: "bolder" }}>{props.title} </span>
          <span>due {props.date}</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        <Typography>{props.descr}</Typography>
        {props.userFlag && (
          <DeleteIcon
            onClick={handleClick}
            className="delete"
            sx={{ color: red[600] }}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
