import { useState } from "react";

import { mount as app1Mount } from "app1/bootloader";

export default function Tasks(props) {
    const [tasks, setTasks] = useState([
        {   
            "id": "app1",
            "title": "App 1",
            "icon": undefined,
            "description": "App 1"
        },
        {
            "id": "app2",
            "title": "App 2",
            "icon": undefined,
            "description": "App 2"
        }]);

    const getAppFromTaskId = (taskId) => {
        if (taskId === "app1") return <div ref={app1Mount} className="app1" />;        
    }

    return (
        <div className="tasks-container">
            {tasks.map((task, idx) => {
                return (
                <div className="task-card" key={idx} onClick={() => props.chooseTab(getAppFromTaskId(task.id))}>
                    <div className="task-title text-base">{task.title}</div>
                    <div className="task-description text-sm text-slate-900">{task.description}</div>
                </div>
                );
            })}
        </div>
    );
}