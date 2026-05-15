import BreadcrumbComponent from "./BreadcrumbComponent";
import useBreadcrumbs from "./useBreadcrumbs";

export default function BlogDetails() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      <BreadcrumbComponent items={breadcrumbs} />
    </div>
  );
}
