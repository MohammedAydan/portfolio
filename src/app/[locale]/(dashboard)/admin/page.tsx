import { useGetCollectionCount } from "@/lib/firebase/hooks";

const getDashboardData = async () => {
  const usersCount = await useGetCollectionCount("users");
  const portfoliosCount = await useGetCollectionCount("portfolio");
  const messagesCount = await useGetCollectionCount("messages");

  return {
    usersCount,
    portfoliosCount,
    messagesCount,
  }
}

const Page = async () => {
  const { usersCount, portfoliosCount, messagesCount } = await getDashboardData();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-foreground">Dashboard</h1>
      <p className="text-lg text-foreground mb-8">
        Welcome to the admin dashboard. Here is an overview of your data.
      </p>

      <div className="block lg:grid grid-cols-1 lg:grid-cols-3 gap-6 lg:space-y-0 space-y-6">
        <div className="bg-foreground/5 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-foreground/80 mb-2">Users</h2>
          <p className="text-foreground text-lg">Total Users: <span className="font-semibold text-foreground/90">{usersCount}</span></p>
        </div>

        <div className="bg-foreground/5 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-foreground/80 mb-2">Portfolios</h2>
          <p className="text-foreground text-lg">Total Portfolios: <span className="font-semibold text-foreground/90">{portfoliosCount}</span></p>
        </div>

        <div className="bg-foreground/5 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-foreground/80 mb-2">Messages</h2>
          <p className="text-foreground text-lg">Total Messages: <span className="font-semibold text-foreground/90">{messagesCount}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Page;