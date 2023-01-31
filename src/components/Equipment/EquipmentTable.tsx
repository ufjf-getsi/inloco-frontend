import { Equipment } from "../../types";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface EquipmentTableProps {
  equipment: Array<Equipment>;
}

interface EquipmentRowProps {
  equipment: Equipment;
}

function EquipmentRow(props: EquipmentRowProps) {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (id: string) => navigate("/equipment/" + id, { replace: true }),
    [navigate]
  );

  return (
    <tr onClick={() => handleClick(props.equipment.id)}>
      <td className="font-bold">{props.equipment.name}</td>
    </tr>
  );
}

export function EquipmentTable(props: EquipmentTableProps) {
  const tableRowsList = props.equipment.map((equipment) => {
    return <EquipmentRow key={equipment.id} equipment={equipment} />;
  });

  return (
    <table className="w-11/12 my-10 text-center m-auto">
      <thead>
        <tr>
          <th className="text-xl" scope="col">
            Equipamento
          </th>
          <th className="text-xl" scope="col">
            Parâmetro(s) medido(s)
          </th>
        </tr>
      </thead>
      <tbody>{tableRowsList}</tbody>
    </table>
  );
}
