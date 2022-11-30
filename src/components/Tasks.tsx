import * as React from "react";
import { AttributeEditor, Input } from "@cloudscape-design/components";

export default () => {
  const [items, setItems] = React.useState<any[]>([
    { key: "some-key-1", value: "some-value-1" },
  ]);
  return (
    <AttributeEditor
      onAddButtonClick={() => setItems([...items, {}])}
      onRemoveButtonClick={({ detail: { itemIndex } }) => {
        const tmpItems = [...items];
        tmpItems.splice(itemIndex, 1);
        setItems(tmpItems);
      }}
      items={items}
      addButtonText="Add new item"
      definition={[
        {
          label: "Key",
          control: (item) => <Input value={item.key} placeholder="Enter key" />,
        },
        {
          label: "Value",
          control: (item) => (
            <Input value={item.value} placeholder="Enter value" />
          ),
        },
      ]}
      removeButtonText="Remove"
      empty="No items associated with the resource."
    />
  );
};
