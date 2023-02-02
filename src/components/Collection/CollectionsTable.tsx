import { Collection } from "../../types";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface CollectionsTableProps {
  collections: Array<Collection>;
}

interface CollectionRowProps {
  collection: Collection;
}

function CollectionRow(props: CollectionRowProps) {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (id: string) => navigate(`/collections/${id}`),
    [navigate]
  );

  return (
    <tr onClick={() => handleClick(props.collection.id)}>
      <td className="font-bold">{props.collection.title}</td>
    </tr>
  );
}

export function CollectionsTable(props: CollectionsTableProps) {
  const tableRowsList = props.collections.map((collection) => {
    return <CollectionRow key={collection.id} collection={collection} />;
  });

  return (
    <table className="w-11/12 my-2 text-center m-auto">
      <thead>
        <tr>
          <th className="text-xl" scope="col">
            Título
          </th>
        </tr>
      </thead>
      <tbody>{tableRowsList}</tbody>
    </table>
  );
}
