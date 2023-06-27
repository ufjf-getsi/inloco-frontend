import { PropsWithChildren } from "react";
import { Box, Grid, GridProps } from "@cloudscape-design/components";

export interface GenericInfoPanelProps {
  data: Map<string, string>;
  gridDefinition?: Array<GridProps.ElementDefinition>;
}
export default function GenericInfoPanel(props: GenericInfoPanelProps) {
  let panels = Array<JSX.Element>();
  let defaultGridDefinition = Array<GridProps.ElementDefinition>();
  let aux = 0;
  props.data.forEach((value, key) => {
    panels.push(
      <ValueWithLabel label={key} key={key + aux}>
        {value}
      </ValueWithLabel>
    );
    defaultGridDefinition.push({
      colspan: { default: 12, xxs: 6, xs: 4, s: 3 },
    });
    aux++;
  });
  return (
    <Grid gridDefinition={props.gridDefinition ?? defaultGridDefinition}>
      {panels}
    </Grid>
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
