import { ShoppingCart, CheckCircle2, Clock3, XCircle } from 'lucide-react';
import ModulePage from '../../components/ModulePage';

export default function OrdersPage() {
  return (
    <ModulePage
      module="orders"
      icon={ShoppingCart}
      description="Monitor order volumes, fulfilment status and delivery performance across all stores."
      kpiIcons={[ShoppingCart, CheckCircle2, Clock3, XCircle]}
      kpiAccents={['brand', 'emerald', 'amber', 'red']}
      summaryReportId="orders-daily"
    />
  );
}
