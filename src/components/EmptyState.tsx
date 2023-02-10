import Box from "@cloudscape-design/components/box";

export default function EmptyState({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action: JSX.Element;
}) {
  return (
    <Box textAlign="center" color="inherit">
      <Box variant="strong" textAlign="center" color="inherit">
        {title}
      </Box>
      <Box variant="p" padding={{ bottom: "s" }} color="inherit">
        {subtitle}
      </Box>
      {action}
    </Box>
  );
}
