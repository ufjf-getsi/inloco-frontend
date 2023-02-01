import { Task } from "../../types";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface TasksTableProps {
  tasks: Array<Task>;
}

interface TaskRowProps {
  task: Task;
}

function TaskRow(props: TaskRowProps) {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (id: string) => navigate("/tasks/" + id, { replace: true }),
    [navigate]
  );

  return (
    <tr onClick={() => handleClick(props.task.id)}>
      <td className="font-bold">{props.task.title}</td>
      <td>{props.task.status}</td>
    </tr>
  );
}

export function TasksTable(props: TasksTableProps) {
  const tableRowsList = props.tasks.map((task) => {
    return <TaskRow key={task.id} task={task} />;
  });

  return (
    <table className="w-11/12 my-10 text-center m-auto">
      <thead>
        <tr>
          <th className="text-xl" scope="col">
            Título
          </th>
          <th className="text-xl" scope="col">
            Status
          </th>
        </tr>
      </thead>
      <tbody>{tableRowsList}</tbody>
    </table>
  );
}
