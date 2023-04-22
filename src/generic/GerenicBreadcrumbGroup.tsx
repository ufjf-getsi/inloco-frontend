import {
  BreadcrumbGroup,
  BreadcrumbGroupProps,
} from "@cloudscape-design/components";

export default function GenericBreadcrumbGroup({
  items,
}: BreadcrumbGroupProps) {
  return (
    <BreadcrumbGroup
      items={items}
      expandAriaLabel="Mostrar caminho"
      ariaLabel="Breadcrumbs"
    />
  );
}
