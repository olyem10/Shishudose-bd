import { useState, useEffect } from 'react';
import { doc, setDoc, getDocFromServer } from 'firebase/firestore';
import { db } from '../services/firebase';
import { PaymentRequest } from '../types/payment';

const PAYMENT_QUEUE_KEY = 'shishudose_payment_offline_queue_v1';

/**
 * Checks if the device has a real, functioning internet connection.
 * Bypasses false-positive `navigator.onLine` issues in webviews and Android TWAs.
 */
export async function checkReliableConnectivity(): Promise<boolean> {
  // If navigator clearly says offline, double-check with a lightweight ping
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch('/manifest.json?_t=' + Date.now(), {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return false;
    }
  }

  // If navigator says online, verify with a rapid fetch ping
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('/manifest.json?_t=' + Date.now(), {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return res.ok || res.status === 304;
  } catch {
    // If local fetch fails, try Firestore test collection
    try {
      await getDocFromServer(doc(db, 'test', 'ping'));
      return true;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message.toLowerCase() : '';
      if (msg.includes('offline') || msg.includes('unavailable')) {
        return false;
      }
      // Permission denied or not-found still proves network connectivity to Google servers!
      return true;
    }
  }
}

/**
 * Hook for components that need real-time reliable network status.
 */
export function useReliableOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      const realStatus = await checkReliableConnectivity();
      if (isMounted) setIsOnline(realStatus);
    };

    const handleOnline = () => {
      setIsOnline(true);
      verify();
    };

    const handleOffline = () => {
      // Don't immediately assume false in webviews, verify first
      verify();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    verify();

    return () => {
      isMounted = false;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Offline Payment Queue: Stores payment requests safely in localStorage
 * so that no doctor's submission or TrxID is ever lost.
 */
export function savePaymentToOfflineQueue(payment: PaymentRequest): void {
  try {
    const queue = getOfflinePaymentQueue();
    // Prevent duplicate entries
    const exists = queue.some(p => p.requestId === payment.requestId || p.transactionId === payment.transactionId);
    if (!exists) {
      queue.push(payment);
      localStorage.setItem(PAYMENT_QUEUE_KEY, JSON.stringify(queue));
    }
  } catch (err) {
    console.warn('Could not save to offline payment queue:', err);
  }
}

export function getOfflinePaymentQueue(): PaymentRequest[] {
  try {
    const raw = localStorage.getItem(PAYMENT_QUEUE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PaymentRequest[];
  } catch {
    return [];
  }
}

export function removePaymentFromOfflineQueue(requestId: string): void {
  try {
    const queue = getOfflinePaymentQueue();
    const filtered = queue.filter(p => p.requestId !== requestId);
    localStorage.setItem(PAYMENT_QUEUE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn('Could not update offline payment queue:', err);
  }
}

/**
 * Syncs any pending queued payments to Firestore once network connectivity is restored.
 */
export async function syncOfflinePaymentQueue(): Promise<number> {
  const queue = getOfflinePaymentQueue();
  if (queue.length === 0) return 0;

  let syncedCount = 0;
  for (const item of queue) {
    try {
      await setDoc(doc(db, 'payment_requests', item.requestId), {
        ...item,
        status: 'pending',
        syncedFromOffline: true
      });
      removePaymentFromOfflineQueue(item.requestId);
      syncedCount++;
    } catch (err) {
      console.warn(`Failed to sync queued payment ${item.requestId}:`, err);
    }
  }

  return syncedCount;
}

// Automatically attempt sync when window comes back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    setTimeout(() => {
      syncOfflinePaymentQueue();
    }, 2000);
  });
}
