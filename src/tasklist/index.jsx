import React, { useEffect, useState } from "react";
import "./index.css";
import TaskCreate from "../components/TaskCreate";
import TaskItem from "../components/TaskItem";
import TaskNav from "../components/TaskNav";
import { Button, Alert } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

let listGlobal = [
  { key: 0, content: "Do codding", complete: false },
  { key: 1, content: "Do codding", complete: false },
  { key: 2, content: "Do codding", complete: false },
  { key: 3, content: "Do codding", complete: false },
];

const Home = () => {
  const [tab, setTab] = useState("All");
  const [success, setSuccess] = useState({ action: false, content: "Success" });
  const [listTask, setListTask] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setListTask(items);
    } else {
      setListTask(listGlobal);
    }
  }, []);

  useEffect(() => {
    const timeOut = setInterval(() => {
      setSuccess({ action: false, content: "error", type: "success" });
    }, 2000);

    return () => {
      clearInterval(timeOut);
    };
  }, [success.action]);

  const handleChangeTab = (click) => {
    setTab(click);
  };

  const handleAddTask = (task) => {
    if (task.content === "") {
      setSuccess({
        action: true,
        content: "Không được để trống",
        type: "error",
      });
      return;
    }
    const newList = [...listTask, task];
    setListTask(newList);
    setSuccess({ action: true, content: "Thành công" });
    localStorage.setItem("items", JSON.stringify(newList));
  };

  const handleDelete = () => {
    const newList = listTask.filter((item) => item.complete === false);
    setListTask(newList);
    localStorage.setItem("items", JSON.stringify(newList));
  };

  const handleActionComplete = (obj) => {
    const newList = listTask.map((item) => {
      if (item.key === obj.key) {
        const updatedItem = {
          ...item,
          complete: obj.complete,
        };

        return updatedItem;
      }

      return item;
    });

    setListTask(newList);
    localStorage.setItem("items", JSON.stringify(newList));
  };

  const handleActionDetele = (obj) => {
    const newList = listTask.filter((item) => item.key !== obj.key);
    setListTask(newList);
    localStorage.setItem("items", JSON.stringify(newList));
  };

  return (
    <div className="container">
      <div className="h1">
        <h1>#todo</h1>
      </div>

      <TaskNav click={handleChangeTab} />

      {tab !== "Complete" && (
        <TaskCreate add={handleAddTask} size={listTask?.length} />
      )}

      {success.action && (
        <Alert
          style={{
            width: "20%",
            position: "absolute",
            top: "50px",
            right: "20%",
          }}
          message={success.content}
          type={success.type}
        />
      )}

      {tab === "All" &&
        listTask?.map((e) => (
          <TaskItem
            key={e.key}
            data={e}
            select={tab}
            handleActionComplete={handleActionComplete}
          />
        ))}

      {tab === "Active" &&
        listTask
          ?.filter((e) => e.complete === false)
          .map((e) => (
            <TaskItem
              key={e.key}
              data={e}
              select={tab}
              handleActionComplete={handleActionComplete}
            />
          ))}

      {tab === "Complete" &&
        listTask
          ?.filter((e) => e.complete === true)
          .map((e) => (
            <TaskItem
              key={e.key}
              data={e}
              select={tab}
              handleActionComplete={handleActionComplete}
              handleActionDetele={handleActionDetele}
            />
          ))}

      {tab === "Complete" && (
        <div className="btn-delete">
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          >
            Delete All
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
