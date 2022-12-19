import { Parameter } from "../../types";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface ParametersTableProps {
  parameters: Array<Parameter>;
}

interface ParameterRowProps {
  parameter: Parameter;
}

function ParameterRow(props: ParameterRowProps) {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (id: string) => navigate("/parameters/" + id, { replace: true }),
    [navigate]
  );

  return (
    <tr onClick={() => handleClick(props.parameter.id)}>
      <td className="font-bold">{props.parameter.name}</td>
      <td>{props.parameter.dataType}</td>
    </tr>
  );
}

export function ParametersTable(props: ParametersTableProps) {
  const tableRowsList = props.parameters.map((parameter) => {
    return <ParameterRow key={parameter.id} parameter={parameter} />;
  });

  return (
    <table className="w-11/12 my-10 text-center m-auto">
      <thead>
        <tr>
          <th className="text-xl" scope="col">
            Parâmetro
          </th>
          <th className="text-xl" scope="col">
            Medida
          </th>
        </tr>
      </thead>
      <tbody>{tableRowsList}</tbody>
    </table>
  );
}
