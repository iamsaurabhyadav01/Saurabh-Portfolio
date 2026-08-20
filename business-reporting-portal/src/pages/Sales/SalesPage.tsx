import { TrendingUp, ShoppingBag, Package, Wallet } from 'lucide-react';
import ModulePage from '../../components/ModulePage';

export default function SalesPage() {
  return (
    <ModulePage
      module="sales"
      icon={TrendingUp}
      description="Track daily, store-wise, product-wise and customer-wise sales performance across all outlets."
      kpiIcons={[Wallet, ShoppingBag, Package, TrendingUp]}
      kpiAccents={['brand', 'emerald', 'amber', 'brand']}
      summaryReportId="sales-daily"
    />
  );
}
