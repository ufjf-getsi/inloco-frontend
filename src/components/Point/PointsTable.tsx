import { Point } from "../../types";

interface PointsTableProps {
  points: Array<Point>;
  setModalVisible: Function;
  setSelectedPoint: Function;
  setEditPoint: Function;
}

interface PointRowProps extends PointsTableProps {
  point: Point;
}

function PointRow(props: PointRowProps) {
  return (
    <tr
      onClick={() => {
        props.setSelectedPoint(props.point);
        props.setEditPoint(true);
        props.setModalVisible(true);
      }}
    >
      <td className="font-bold">{props.point.name}</td>
      <td className="font-bold">{props.point.coordinates}</td>
    </tr>
  );
}

export function PointsTable(props: PointsTableProps) {
  const tableRowsList = props.points.map((point) => {
    return <PointRow key={point.id} point={point} {...props} />;
  });

  return (
    <table className="w-11/12 my-2 text-center m-auto">
      <thead>
        <tr>
          <th className="text-xl" scope="col">
            Nome
          </th>
          <th className="text-xl" scope="col">
            Coordenada
          </th>
        </tr>
      </thead>
      <tbody>{tableRowsList}</tbody>
    </table>
  );
}
