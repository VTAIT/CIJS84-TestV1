import React, { useState } from "react";
import { Input, Button, } from "antd";

const TaskCreate = (probs) => {
  const [content, setContent] = useState("");
  const key = probs.size + 1;

  return (
    <div className="h1">
      <Input
        className="input"
        placeholder="Add detail"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        type="primary"
        className="input"
        onClick={() => {
          if (content === "") {
            return probs.add({ key: 0, content: content, complete: false });;
          }

          probs.add({ key, content: content, complete: false });
          setContent("");
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default TaskCreate;
