
import BlockList from 'components/BlockList';

import LatestTransactionsStats from '@/components/LatestTransactionsStats';

const MainPage = () => {
 

  return (
    <div className="container space-y-8 py-10">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Avail Blockchain Explorer</h1>
        <p className="text-muted-foreground">
          Explore the latest blocks, transactions, and statistics on the Avail network
        </p>
      </div>
      
      {/* <ChainStats /> */}
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BlockList limit={5} />
        <LatestTransactionsStats />
      </div>
      </div>

  );
};

export default MainPage;
