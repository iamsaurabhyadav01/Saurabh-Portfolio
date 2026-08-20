import { Boxes, Layers, AlertTriangle, PackageX } from 'lucide-react';
import ModulePage from '../../components/ModulePage';

export default function InventoryPage() {
  return (
    <ModulePage
      module="inventory"
      icon={Boxes}
      description="Review current stock levels, movement and reorder alerts across the store network."
      kpiIcons={[Layers, Boxes, AlertTriangle, PackageX]}
      kpiAccents={['brand', 'emerald', 'amber', 'red']}
      summaryReportId="inventory-current"
    />
  );
}
