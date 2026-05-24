import type { TabsByWindow } from '../shared.types';

const FormattedTabName = ({ tab, index }: { tab: string; index: number }) => (
  <div>
    {index + 1}.{tab}
  </div>
);

function TabList({ tabsByWindow }: { tabsByWindow: TabsByWindow }) {
  const tabNames = Object.values(tabsByWindow)
    .flat()
    .map((tab) => tab.title);

  return (
    <div>{tabNames.map((tab, index) => FormattedTabName({ tab, index }))}</div>
  );
}

export default TabList;
