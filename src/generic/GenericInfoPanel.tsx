import { PropsWithChildren } from "react";
import { Box, ColumnLayout } from "@cloudscape-design/components";

interface GenericInfoPanelProps {
  displayedInfo: Map<string, string>;
}

export default function GenericInfoPanel(props: GenericInfoPanelProps) {
  let panels = Array<JSX.Element>();
  props.displayedInfo.forEach((value, key) => {
    panels.push(<ValueWithLabel label={key}>{value}</ValueWithLabel>);
  });
  return (
    <ColumnLayout columns={3} variant="text-grid">
      {panels}
    </ColumnLayout>
  );
}

interface ValueWithLabelProps extends PropsWithChildren {
  label: string;
}
function ValueWithLabel(props: ValueWithLabelProps) {
  return (
    <div>
      <Box variant="awsui-key-label">{props.label}</Box>
      <div>{props.children}</div>
    </div>
  );
}
