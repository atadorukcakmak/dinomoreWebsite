/**
 * Dinomore Advanced Analytics Tracker
 * Handles: Device detection, Traffic source (UTM/Referrer), IP-based Geolocation,
 * Bot filtering, Session duration, and Reliable data queueing.
 */

(function() {
    const CONFIG = {
        STORAGE_KEY: 'dino_visits',
        TEMP_KEY: 'dino_current_session',
        HEARTBEAT_INTERVAL: 30000, // 30 seconds
        IP_SERVICE: 'https://ipapi.co/json/',
        BOT_LIST: [/googlebot/i, /bingbot/i, /yandexbot/i, /duckduckbot/i, /baiduspider/i, /facebot/i, /ia_archiver/i]
    };

    // 1. Bot Filtering
    function isBot() {
        const ua = navigator.userAgent;
        return CONFIG.BOT_LIST.some(bot => bot.test(ua));
    }

    if (isBot()) {
        console.log('[DinoAnalytics] Bot detected. Tracking disabled.');
        return;
    }

    // 2. Device Detection
    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet';
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(ua)) return 'Mobile';
        return 'Desktop';
    }

    // 3. Traffic Source Detection
    function getSource() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('utm_source')) return 'Ads / ' + urlParams.get('utm_source');
        
        const referrer = document.referrer;
        if (!referrer) return 'Direct';

        const refUrl = new URL(referrer);
        const host = refUrl.hostname.toLowerCase();

        if (host.includes('google') || host.includes('bing') || host.includes('yahoo')) return 'Organic Search';
        if (host.includes('facebook') || host.includes('instagram') || host.includes('t.co') || host.includes('linkedin') || host.includes('reddit') || host.includes('tiktok')) return 'Social Media';
        if (host.includes(window.location.hostname)) return 'Internal';

        return 'Referral (' + host + ')';
    }

    // 4. Session Tracking
    let sessionData = {
        id: Math.random().toString(36).substring(2, 15),
        ts: Date.now(),
        country: 'Unknown',
        countryName: 'Unknown',
        city: 'Unknown',
        device: getDeviceType(),
        source: getSource(),
        path: window.location.pathname,
        duration: 0
    };

    // 5. Geolocation
    if (!sessionStorage.getItem('dino_geo_tracked')) {
        fetch(CONFIG.IP_SERVICE)
            .then(r => r.json())
            .then(data => {
                sessionData.country = data.country_code || '??';
                sessionData.countryName = data.country_name || 'International';
                sessionData.city = data.city || '';
                sessionStorage.setItem('dino_geo_tracked', JSON.stringify({
                    code: data.country_code,
                    name: data.country_name,
                    city: data.city
                }));
                saveVisit();
            })
            .catch(() => {
                console.warn('[DinoAnalytics] Geolocation failed.');
                saveVisit(); // Still track even if geo fails
            });
    } else {
        const cached = JSON.parse(sessionStorage.getItem('dino_geo_tracked'));
        sessionData.country = cached.code;
        sessionData.countryName = cached.name;
        sessionData.city = cached.city;
        saveVisit();
    }

    // 6. Data Persistence (Using Queue Pattern)
    function saveVisit() {
        // We only save the initial visit once per page load to avoid duplicates
        // But we'll update the duration on exit/heartbeat
        const visits = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]');
        
        // Find existing session in this page load if any
        const existingIdx = visits.findIndex(v => v.sessionId === sessionData.id);
        
        const entry = {
            sessionId: sessionData.id,
            ts: sessionData.ts,
            country: sessionData.country,
            countryName: sessionData.countryName,
            city: sessionData.city,
            device: sessionData.device,
            source: sessionData.source,
            path: sessionData.path,
            duration: sessionData.duration
        };

        if (existingIdx >= 0) {
            visits[existingIdx] = entry;
        } else {
            visits.push(entry);
        }

        // Limit storage to last 5000 visits to prevent localStorage bloat
        if (visits.length > 5000) visits.shift();
        
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(visits));
    }

    // 7. Heartbeat & Exit tracking
    setInterval(() => {
        sessionData.duration += CONFIG.HEARTBEAT_INTERVAL / 1000;
        saveVisit();
    }, CONFIG.HEARTBEAT_INTERVAL);

    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            saveVisit();
        }
    });

    // Special case for beforeunload to ensure duration is captured
    window.addEventListener('beforeunload', () => {
        saveVisit();
    });

    console.log('[DinoAnalytics] Tracker initialized.', sessionData.device, sessionData.source);
})();
