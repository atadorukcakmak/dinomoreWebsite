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

    // 2. Device & Browser Detection
    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet';
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(ua)) return 'Mobile';
        return 'Desktop';
    }

    function getBrowserInfo() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Edg')) return 'Edge';
        return 'Other';
    }

    // 3. Traffic Source Detection (Enhanced)
    function getSourceDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');

        if (utmSource) {
            return {
                source: 'Ads / ' + utmSource,
                medium: utmMedium || 'cpc',
                campaign: utmCampaign || 'unspecified'
            };
        }
        
        const referrer = document.referrer;
        if (!referrer) return { source: 'Direct', medium: 'none', campaign: 'none' };

        try {
            const refUrl = new URL(referrer);
            const host = refUrl.hostname.toLowerCase();

            if (host.includes('google') || host.includes('bing') || host.includes('yahoo')) 
                return { source: 'Organic Search', medium: 'organic', campaign: 'none' };
            
            if (host.includes('facebook') || host.includes('instagram') || host.includes('t.co') || host.includes('linkedin') || host.includes('reddit') || host.includes('tiktok')) 
                return { source: 'Social Media', medium: 'social', campaign: 'none' };
            
            if (host.includes(window.location.hostname)) 
                return { source: 'Internal', medium: 'internal', campaign: 'none' };

            return { source: 'Referral (' + host + ')', medium: 'referral', campaign: 'none' };
        } catch(e) {
            return { source: 'Referral', medium: 'referral', campaign: 'none' };
        }
    }

    // 4. Visitor Status (New vs Returning)
    function getVisitorStatus() {
        const isReturning = localStorage.getItem('dino_returning_visitor');
        if (!isReturning) {
            localStorage.setItem('dino_returning_visitor', 'true');
            return 'New';
        }
        return 'Returning';
    }

    const { source, medium, campaign } = getSourceDetails();

    // 5. Session Tracking Object
    let sessionData = {
        id: Math.random().toString(36).substring(2, 15),
        ts: Date.now(),
        country: 'Unknown',
        countryName: 'Unknown',
        city: 'Unknown',
        device: getDeviceType(),
        browser: getBrowserInfo(),
        visitorStatus: getVisitorStatus(),
        source: source,
        medium: medium,
        campaign: campaign,
        path: window.location.pathname,
        duration: 0
    };

    // 6. Geolocation
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

    // 7. Data Persistence
    function saveVisit() {
        const visits = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]');
        const existingIdx = visits.findIndex(v => v.sessionId === sessionData.id);
        
        const entry = {
            sessionId: sessionData.id,
            ts: sessionData.ts,
            country: sessionData.country,
            countryName: sessionData.countryName,
            city: sessionData.city,
            device: sessionData.device,
            browser: sessionData.browser,
            visitorStatus: sessionData.visitorStatus,
            source: sessionData.source,
            medium: sessionData.medium,
            campaign: sessionData.campaign,
            path: sessionData.path,
            duration: Math.round(sessionData.duration)
        };

        if (existingIdx >= 0) {
            visits[existingIdx] = entry;
        } else {
            visits.push(entry);
        }

        if (visits.length > 5000) visits.shift();
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(visits));
    }

    // 8. Heartbeat & Exit tracking
    setInterval(() => {
        sessionData.duration += CONFIG.HEARTBEAT_INTERVAL / 1000;
        saveVisit();
    }, CONFIG.HEARTBEAT_INTERVAL);

    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') saveVisit();
    });

    window.addEventListener('beforeunload', () => {
        saveVisit();
    });

    console.log('[DinoAnalytics] Tracker initialized v2.', sessionData.device, sessionData.browser, sessionData.visitorStatus);
})();
