async function saveTabs() {
  const tabs = await chrome.tabs.query({});

  const byWindow = tabs.reduce((acc, tab) => {
    const windowId = String(tab.windowId);
    if (!acc[windowId]) acc[windowId] = [];
    acc[windowId].push({
      id: tab.id,
      index: tab.index,
      title: tab.title,
      url: tab.url,
      active: tab.active,
      pinned: tab.pinned,
    });
    return acc;
  }, {});

  await chrome.storage.local.set({ tabs: byWindow });
}

chrome.runtime.onInstalled.addListener(() => {
  saveTabs();
  chrome.alarms.create('sync-tabs', { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'sync-tabs') saveTabs();
});

chrome.action.onClicked.addListener(saveTabs);
chrome.tabs.onCreated.addListener(saveTabs);
chrome.tabs.onRemoved.addListener(saveTabs);
chrome.tabs.onUpdated.addListener(saveTabs);
chrome.tabs.onMoved.addListener(saveTabs);
chrome.windows.onCreated.addListener(saveTabs);
chrome.windows.onRemoved.addListener(saveTabs);
