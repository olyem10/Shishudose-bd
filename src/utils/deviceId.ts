const DEVICE_ID_KEY = 'shishudose_device_id';

export function getOrCreateDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id || id.trim() === '') {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch (e) {
    console.warn('LocalStorage unavailable for deviceId:', e);
    return 'dev_temp_' + Date.now().toString(36);
  }
}

export function getBrowserDeviceInfo(): string {
  if (typeof navigator === 'undefined') return 'Web Client';
  const ua = navigator.userAgent;
  let browser = 'Browser';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';

  let os = 'Device';
  if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Macintosh')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';

  return `${browser} on ${os}`;
}
