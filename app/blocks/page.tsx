import Blocks from "@/components/shared/Blocks";


const BlocksPage = () => {
  return (
    <div className="container space-y-6 py-10">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Blocks</h1>
        <p className="text-muted-foreground">
          Browse and search for blocks on the Avail network
        </p>
  </div>
  <Blocks /></div>);
};

export default BlocksPage;