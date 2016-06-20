/* eslint-disable no-console */

// onAppUpdateReady :: (ServiceWorker) -> ()
const initialize = (onAppUpdateReady) => {
  if (!navigator.serviceWorker) {
    console.log('Service worker not supported.');
    return;
  }

  navigator.serviceWorker.register('/serviceWorker.js')
    .then(reg => setupAppUpgradePrompting(reg, onAppUpdateReady))
    .then(() => console.log('Service worker install success.'))
    .catch((err) => console.error('Service worker install failure.', err));

  // When a new service worker app update has been activated, refresh the page.
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    document.location.reload();
  });
};

// Ensures that when a new app version is available (ie a new service worker
// is waiting) the user is prompted to upgrade to it.
function setupAppUpgradePrompting(reg, onAppUpdateReady) {
  // Case 1: No controlling service worker, so we will be on the latest version.
  if (!navigator.serviceWorker.controller) return;

  // Case 2: New service worker currently installing; track its progress
  if (reg.installing) {
    reg.installing.addEventListener('statechange', function () {
      if (this.state === 'installed') {
        onAppUpdateReady(this);
      }
    });
    return;
  }

  // Case 3: Service worker already waiting to be activated
  if (reg.waiting) {
    onAppUpdateReady(reg.waiting);
    return;
  }

  // Case 4: No new service worker yet, monitor for new ones, then track their progress.
  reg.addEventListener('updatefound', () => {
    reg.installing.addEventListener('statechange', function () {
      if (this.state === 'installed') {
        onAppUpdateReady(this);
      }
    });
  });
}

export default initialize;
