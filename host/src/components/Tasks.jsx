import { useState } from "react";

import { mount as app1Mount } from "app1/bootloader";

export default function Tasks(props) {
    const [tasks, setTasks] = useState([
        {   
            "id": "app1",
            "title": "App 1",
            "background": "#fff1ef",
            "icon": undefined,
            "description": "A counter app"
        },
        {
            "id": "app2",
            "title": "App 2",
            "background": "#f1ffef",
            "icon": undefined,
            "description": "App 2"
        }]);

    const getAppFromTaskId = (taskId) => {
        if (taskId === "app1") return <div ref={app1Mount} className="app1" />;        
    }

    return (
        <div className="tasks-container flex flex-wrap p-6">
            {tasks.map((task, idx) => {
                return (
                <div className="task-card p-5 w-4/12 mx-2" key={idx} onClick={() => props.chooseTab(getAppFromTaskId(task.id))} style={{background: task.background || "#ffffff"}}>
                    <div className="task-title text-base">{task.title}</div>
                    <div className="task-description text-xs text-gray-800">{task.description}</div>
                </div>
                );
            })}
        </div>
    );
}