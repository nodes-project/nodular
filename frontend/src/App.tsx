import { useEffect, useState } from 'react';
import TabList from './components/TabList';
import type { TabsByWindow } from './shared.types';

function App() {
  const [tabsByWindow, setTabsByWindow] = useState<TabsByWindow>({});

  useEffect(() => {
    chrome.storage.local.get('tabs', (result) => {
      const data = (result.tabs || {}) as TabsByWindow;
      setTabsByWindow(data);
    });
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h1 className="text-2xl font-semibold font-mono">Nodular</h1>
        <TabList tabsByWindow={tabsByWindow} />
      </div>
    </main>
  );
}

export default App;
