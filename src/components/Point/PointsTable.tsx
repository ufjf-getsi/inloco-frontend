import { Point } from "../../types";

interface PointsTableProps {
  points: Array<Point>;
  setToolsModalVisible: Function;
}

interface PointRowProps {
  point: Point;
  setToolsModalVisible: Function;
}

function PointRow(props: PointRowProps) {
  return (
    <tr onClick={() => props.setToolsModalVisible(true)}>
      <td className="font-bold">{props.point.coordinates}</td>
    </tr>
  );
}

export function PointsTable(props: PointsTableProps) {
  const tableRowsList = props.points.map((point) => {
    return (
      <PointRow
        key={point.id}
        point={point}
        setToolsModalVisible={props.setToolsModalVisible}
      />
    );
  });

  return (
    <table className="w-11/12 my-2 text-center m-auto">
      <thead>
        <tr>
          <th className="text-xl" scope="col">
            Coordenada
          </th>
        </tr>
      </thead>
      <tbody>{tableRowsList}</tbody>
    </table>
  );
}
