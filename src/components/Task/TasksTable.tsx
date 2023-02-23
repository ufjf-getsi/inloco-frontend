import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../../types";

interface TasksTableProps {
  tasks: Array<Task>;
}

interface TaskRowProps {
  task: Task;
}

function TaskRow(props: TaskRowProps) {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (id: string) => navigate("/tasks/" + id),
    [navigate]
  );

  return (
    <tr
      onClick={() => handleClick(props.task.id)}
      className="hover:cursor-pointer"
    >
      <td className="font-bold w-1/2">{props.task.title}</td>
    </tr>
  );
}

export function TasksTable(props: TasksTableProps) {
  const tableRowsList = props.tasks.map((task) => {
    return <TaskRow key={task.id} task={task} />;
  });

  return (
    <table className="w-11/12 my-0 m-auto table-fixed">
      <colgroup>
        <col className="w-1/2" />
      </colgroup>
      {tableRowsList}
    </table>
  );
}
