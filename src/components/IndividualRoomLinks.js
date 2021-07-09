import React, { useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import jwt from "jsonwebtoken";
import { Button, TextField } from "@material-ui/core";

const IndividualRoomLinks = ({ ibx }) => {
  const Link = jwt.sign({ roomid: ibx._id }, "mysecretkey101");
  const [link, setLink] = useState(false);
  return (
    <div
      className="individual-chat"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div>
        <div>
          <Button variant="contained" color="primary">
            {ibx?.name}
          </Button>
        </div>

        {!link ? (
          <KeyboardArrowDownIcon
            onClick={() => setLink(!link)}
            style={{ color: "red", fontSize: 30 }}
          />
        ) : (
          <>
            <KeyboardArrowUpIcon
              onClick={() => setLink(!link)}
              style={{ color: "red", fontSize: 30 }}
            />
            <div
              style={{
                wordBreak: "break-all",
                backgroundColor: "white",
                padding: 10,
                marginBottom: 10,
              }}
            >
              {Link}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IndividualRoomLinks;
