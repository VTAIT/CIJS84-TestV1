import React from "react";
import { Checkbox, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const TaskItem = (probs) => {
  const isShow = probs.select === "Complete";
  const { key, content, complete } = probs.data;
  return (
    <div className="container-tasklist">
      <Checkbox
        className="checkbox"
        onChange={(e) => {
          if (complete) {
            return;
          }
          probs.handleActionComplete({ key: key, complete: e.target.checked });
        }}
        checked={complete}
      >
        <span className={complete ? "completeTask" : ""}>{content}</span>
      </Checkbox>
      {isShow && (
        <Button
          onClick={() => {
            probs.handleActionDetele({ key: key });
          }}
          icon={<DeleteOutlined />}
        />
      )}
    </div>
  );
};

export default TaskItem;
