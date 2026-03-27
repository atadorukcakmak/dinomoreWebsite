// ===== Dinomore Professional Traffic Analytics Engine =====

// Chart Global Config
Chart.defaults.color = 'rgba(255, 255, 255, 0.6)';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.05)';

// Constants & Mappings
const COUNTRY_NAMES = {
    TR: 'Türkiye', US: 'USA', DE: 'Germany', GB: 'UK', FR: 'France',
    NL: 'Netherlands', JP: 'Japan', KR: 'South Korea', CN: 'China', IN: 'India',
    BR: 'Brazil', RU: 'Russia', CA: 'Canada', AU: 'Australia', AZ: 'Azerbaijan'
};

const ADMIN_TRANSLATIONS = {
    en: {
        "nav.overview": "Overview",
        "nav.audience": "Audience",
        "nav.campaigns": "Campaigns",
        "nav.settings": "Settings",
        "nav.role": "Lead Developer",
        "dash.title": "Dashboard",
        "dash.subtitle": "Real-time traffic overview & insights",
        "stat.visits": "Total Visits",
        "stat.active": "Active Users",
        "stat.active_now": "Active now",
        "stat.duration": "Avg. Duration",
        "stat.bounces": "Bounces",
        "chart.trend": "Traffic Trend",
        "chart.sources": "Sources",
        "chart.insights": "AI Insights",
        "chart.devices": "Devices",
        "chart.hourly": "Hourly Density",
        "table.title": "Top Performing Regions",
        "table.region": "Region",
        "table.visits": "Visits",
        "table.pct": "% of Total",
        "table.share": "Market Share",
        "btn.export": "Export",
        "btn.report": "Report",
        "btn.demo": "Demo",
        "range.24h.title": "Daily/Hourly",
        "range.24h": "24H",
        "range.7d": "7D",
        "range.30d": "30D",
        "range.90d": "90D",
        "insight.mobile": "Mobile usage is high!",
        "insight.source": "Top source: ",
        "insight.peak": "Peak hour: ",
        "insight.spike": "Traffic spike detected!",
        "audience.title": "Audience Analytics",
        "audience.subtitle": "Detailed breakdown of visitor demographics and behavior patterns.",
        "audience.status": "Audience module is being synchronized...",
        "campaigns.title": "Marketing Campaigns",
        "campaigns.subtitle": "Track performance of your active marketing channels and UTM parameters.",
        "campaigns.status": "Campaign tracking is initializing...",
        "settings.security.title": "Account Security",
        "settings.security.subtitle": "Update your administrative password.",
        "settings.security.label": "New Password",
        "settings.security.btn": "Update Password",
        "settings.admin.title": "Admin Management",
        "settings.admin.subtitle": "Create an additional administrative profiles.",
        "settings.admin.label": "Admin Name",
        "settings.admin.placeholder": "e.g. Jane Doe",
        "settings.admin.btn": "Create Profile",
        "settings.utils.title": "System Utilities",
        "settings.utils.subtitle": "Developer tools and data simulation.",
        "settings.utils.clear": "Clear Data",
        "audience.browsers": "Browser Distribution",
        "audience.returning": "New vs Returning",
        "audience.cities": "Top Cities",
        "campaign.sources": "Campaign Sources",
        "campaign.mediums": "Campaign Mediums",
        "campaign.performance": "Campaign Performance",
        "table.browser": "Browser",
        "table.city": "City",
        "table.status": "Status",
        "table.medium": "Medium",
        "table.campaign": "Campaign",
        "table.top_pages": "Top Pages",
        "table.path": "Page Path"
    },
    tr: {
        "nav.overview": "Genel Bakış",
        "nav.audience": "Kitle",
        "nav.campaigns": "Kampanyalar",
        "nav.settings": "Ayarlar",
        "nav.role": "Kıdemli Geliştirici",
        "dash.title": "Panel",
        "dash.subtitle": "Gerçek zamanlı trafik özeti ve içgörüler",
        "stat.visits": "Toplam Ziyaret",
        "stat.active": "Aktif Kullanıcı",
        "stat.active_now": "Şu an aktif",
        "stat.duration": "Ort. Süre",
        "stat.bounces": "Hemen Çıkma",
        "chart.trend": "Trafik Trendi",
        "chart.sources": "Kaynaklar",
        "chart.insights": "AI İçgörüleri",
        "chart.devices": "Cihazlar",
        "chart.hourly": "Saatlik Yoğunluk",
        "table.title": "En İyi Performans Gösteren Bölgeler",
        "table.region": "Bölge",
        "table.visits": "Ziyaret",
        "table.pct": "Toplam Payı",
        "table.share": "Pazar Payı",
        "btn.export": "Dışa Aktar",
        "btn.report": "Rapor",
        "btn.demo": "Demo",
        "range.24h.title": "Günlük/Saatlik",
        "range.24h": "24S",
        "range.7d": "7G",
        "range.30d": "30G",
        "range.90d": "90G",
        "insight.mobile": "Mobil kullanım oranı yüksek!",
        "insight.source": "En iyi kaynak: ",
        "insight.peak": "Yoğun saat: ",
        "insight.spike": "Trafik artışı tespit edildi!",
        "audience.title": "Kitle Analitiği",
        "audience.subtitle": "Ziyaretçi demografisi ve davranış kalıplarının ayrıntılı dökümü.",
        "audience.status": "Kitle modülü senkronize edildi.",
        "campaigns.title": "Pazarlama Kampanyaları",
        "campaigns.subtitle": "Aktif pazarlama kanallarınızın ve UTM parametrelerinizin performansını izleyin.",
        "campaigns.status": "Kampanya takibi aktif.",
        "settings.security.title": "Hesap Güvenliği",
        "settings.security.subtitle": "Yönetici şifrenizi güncelleyin.",
        "settings.security.label": "Yeni Şifre",
        "settings.security.btn": "Şifreyi Güncelle",
        "settings.admin.title": "Yönetici Yönetimi",
        "settings.admin.subtitle": "Ek yönetici profilleri oluşturun.",
        "settings.admin.label": "Yönetici Adı",
        "settings.admin.placeholder": "örn. Ahmet Yılmaz",
        "settings.admin.btn": "Profil Oluştur",
        "settings.utils.title": "Sistem Araçları",
        "settings.utils.subtitle": "Geliştirici araçları ve veri simülasyonu.",
        "settings.utils.clear": "Verileri Temizle",
        "audience.browsers": "Tarayıcı Dağılımı",
        "audience.returning": "Yeni vs Geri Gelen",
        "audience.cities": "En Popüler Şehirler",
        "campaign.sources": "Kampanya Kaynakları",
        "campaign.mediums": "Kampanya Kanalları",
        "campaign.performance": "Kampanya Performansı",
        "table.browser": "Tarayıcı",
        "table.city": "Şehir",
        "table.status": "Durum",
        "table.medium": "Kanal",
        "table.campaign": "Kampanya",
        "table.path": "Sayfa Yolu",
        "table.top_pages": "Popüler Sayfalar"
    }
};

let currentLang = localStorage.getItem('dino_admin_lang') || 'en';

window.changeLanguage = changeLanguage;
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('dino_admin_lang', lang);
    updateContent();
    updateDashboard();
}

function setRange(range, el) {
    console.log('Setting range:', range);
    document.querySelectorAll('.range-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    updateDashboard();
}

window.switchSection = switchSection;
function switchSection(sectionId) {
    // Update Navigation (Sidebar & Mobile)
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Activate sidebar item
    document.getElementById(`nav-${sectionId}`)?.classList.add('active');
    // Activate mobile nav item
    document.querySelector(`.mobile-nav-item.nav-${sectionId}`)?.classList.add('active');

    // Update Content
    document.querySelectorAll('.dash-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    const target = document.getElementById(`${sectionId}-section`);
    if (target) {
        target.style.display = 'block';
        setTimeout(() => target.classList.add('active'), 10);
    }

    // Special handling for Overview (charts need resize)
    if (sectionId === 'overview') {
        Object.values(charts).forEach(c => c.resize());
    }
}

function updateContent() {
    // Standard content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = ADMIN_TRANSLATIONS[currentLang][key];
        if (text) el.innerHTML = text;
    });

    // Tooltips (titles)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const text = ADMIN_TRANSLATIONS[currentLang][key];
        if (text) el.title = text;
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const text = ADMIN_TRANSLATIONS[currentLang][key];
        if (text) el.placeholder = text;
    });
    
    document.querySelectorAll('.lang-btn-admin').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

const SOURCES_MAP = {
    en: ['Ads', 'Organic Search', 'Social Media', 'Referral', 'Direct'],
    tr: ['Reklamlar', 'Organik Arama', 'Sosyal Medya', 'Referans', 'Direkt']
};

const DEVICES_MAP = {
    en: ['Desktop', 'Mobile', 'Tablet'],
    tr: ['Masaüstü', 'Mobil', 'Tablet']
};

function getSources() { return SOURCES_MAP[currentLang]; }
function getDevices() { return DEVICES_MAP[currentLang]; }

function countryFlag(code) {
    if (!code || code.length !== 2) return '🌍';
    const offset = 127397;
    return String.fromCodePoint(...[...code.toUpperCase()].map(c => c.charCodeAt(0) + offset));
}

// ===== Data Management =====
function getVisits() {
    try {
        return JSON.parse(localStorage.getItem('dino_visits') || '[]');
    } catch { return []; }
}

function filterVisits(visits, rangeDays) {
    if (rangeDays === 'all') return visits;
    const days = parseInt(rangeDays);
    const cutoff = Date.now() - days * 86400000;
    return visits.filter(v => v.ts >= cutoff);
}

// ===== Visualizations =====
let charts = {};

function initCharts() {
    // 1. Traffic Overview (Line Chart)
    const ctxTraffic = document.getElementById('trafficChart')?.getContext('2d');
    if (ctxTraffic) {
        charts.traffic = new Chart(ctxTraffic, {
            type: 'line',
            data: { labels: [], datasets: [{
                label: 'Visits',
                data: [],
                borderColor: '#00f2ff',
                backgroundColor: 'rgba(0, 242, 255, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#00f2ff'
            }]},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
                scales: { 
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { padding: 10 } },
                    x: { grid: { display: false }, ticks: { padding: 10 } }
                }
            }
        });
    }

    // 2. Traffic Sources (Doughnut Chart)
    const ctxSources = document.getElementById('sourcesChart')?.getContext('2d');
    if (ctxSources) {
        charts.sources = new Chart(ctxSources, {
            type: 'doughnut',
            data: { labels: getSources(), datasets: [{
                data: [],
                backgroundColor: ['#7d2ae8', '#00f2ff', '#ff2d95', '#3a00ff', '#28c864'],
                borderWidth: 0,
                hoverOffset: 12
            }]},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { position: 'bottom', labels: { boxWidth: 10, padding: 15, color: 'rgba(255,255,255,0.7)' } } 
                },
                cutout: '75%'
            }
        });
    }

    // 3. Device Usage (Horizontal Bar)
    const ctxDevices = document.getElementById('devicesChart')?.getContext('2d');
    if (ctxDevices) {
        charts.devices = new Chart(ctxDevices, {
            type: 'bar',
            data: { labels: getDevices(), datasets: [{
                data: [],
                backgroundColor: ['#00f2ff', '#7d2ae8', '#ff2d95'],
                borderRadius: 12,
                barThickness: 20
            }]},
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    x: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { grid: { display: false } }
                }
            }
        });
    }

    // 4. Hourly Density (Histogram)
    const ctxHourly = document.getElementById('hourlyChart')?.getContext('2d');
    if (ctxHourly) {
        charts.hourly = new Chart(ctxHourly, {
            type: 'bar',
            data: { 
                labels: Array.from({length: 24}, (_, i) => i + ':00'),
                datasets: [{
                    label: 'Traffic Density',
                    data: new Array(24).fill(0),
                    backgroundColor: 'rgba(0, 242, 255, 0.2)',
                    borderColor: '#00f2ff',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    y: { beginAtZero: true, display: false },
                    x: { grid: { display: false }, ticks: { font: { size: 9 } } }
                }
            }
        });
    }

    // 5. Browser Distribution (Pie)
    const ctxBrowsers = document.getElementById('browsersChart')?.getContext('2d');
    if (ctxBrowsers) {
        charts.browsers = new Chart(ctxBrowsers, {
            type: 'pie',
            data: { labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'], datasets: [{
                data: [],
                backgroundColor: ['#00f2ff', '#ff2d95', '#7d2ae8', '#3a00ff', '#28c864'],
                borderWidth: 0
            }]},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { boxWidth: 10, color: 'rgba(255,255,255,0.7)' } } }
            }
        });
    }

    // 6. New vs Returning (Doughnut)
    const ctxVisitorStatus = document.getElementById('visitorStatusChart')?.getContext('2d');
    if (ctxVisitorStatus) {
        charts.visitorStatus = new Chart(ctxVisitorStatus, {
            type: 'doughnut',
            data: { labels: currentLang === 'tr' ? ['Yeni', 'Geri Gelen'] : ['New', 'Returning'], datasets: [{
                data: [],
                backgroundColor: ['#00f2ff', '#7d2ae8'],
                borderWidth: 0
            }]},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, color: 'rgba(255,255,255,0.7)' } } }
            }
        });
    }

    // 7. Campaign Sources (Bar)
    const ctxCampSources = document.getElementById('campSourcesChart')?.getContext('2d');
    if (ctxCampSources) {
        charts.campSources = new Chart(ctxCampSources, {
            type: 'bar',
            data: { labels: [], datasets: [{
                data: [],
                backgroundColor: '#7d2ae8',
                borderRadius: 8
            }]},
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } }, y: { grid: { display: false } } }
            }
        });
    }
}

window.updateDashboard = function() {
    try {
        refreshDashboardData();
    } catch (err) {
        console.error('Update Dashboard Error:', err);
    }
};

function refreshDashboardData() {
    const range = document.querySelector('.range-tab.active')?.dataset.range || '7';
    const visits = filterVisits(getVisits(), range);
    
    const elTotal = document.getElementById('totalVisits');
    if (elTotal) elTotal.textContent = visits.length.toLocaleString();
    
    const totalDuration = visits.reduce((s, v) => s + (v.duration || 60), 0);
    const avgDur = visits.length ? Math.floor(totalDuration / visits.length) : 0;
    const elAvg = document.getElementById('avgDuration');
    if (elAvg) elAvg.textContent = `${Math.floor(avgDur / 60)}m ${avgDur % 60}s`;
    
    const now = Date.now();
    const activeUsers = visits.filter(v => now - (v.ts || 0) < 300000).length;
    const elActive = document.getElementById('todayVisits');
    if (elActive) elActive.textContent = activeUsers.toLocaleString();

    if (charts.traffic) {
        const days = range === 'all' ? 30 : parseInt(range);
        let labels, data;

        if (days <= 1) {
            // Hourly aggregation for 24H
            const hourly = new Array(24).fill(0);
            const now = new Date();
            visits.forEach(v => {
                const d = new Date(v.ts);
                if (now - d < 86400000) hourly[d.getHours()]++;
            });
            labels = Array.from({length: 24}, (_, i) => i + ':00');
            data = hourly;
        } else {
            const trendData = aggregateByDay(visits, days);
            labels = trendData.map(d => d.date.split('-').slice(1).join('/'));
            data = trendData.map(d => d.count);
        }

        charts.traffic.data.labels = labels;
        charts.traffic.data.datasets[0].data = data;
        charts.traffic.update();
    }

    if (charts.sources) {
        charts.sources.data.labels = getSources();
        const sourceCounts = getSources().map(s => {
             const enSource = SOURCES_MAP.en[getSources().indexOf(s)];
             return visits.filter(v => (v.source || '').toLowerCase().includes(enSource.toLowerCase())).length;
        });
        charts.sources.data.datasets[0].data = sourceCounts;
        charts.sources.update();
    }

    if (charts.devices) {
        charts.devices.data.labels = getDevices();
        const deviceCounts = getDevices().map(d => {
            const enDevice = DEVICES_MAP.en[getDevices().indexOf(d)];
            return visits.filter(v => (v.device || '') === enDevice).length;
        });
        charts.devices.data.datasets[0].data = deviceCounts;
        charts.devices.update();
    }

    if (charts.hourly) {
        const hourlyData = new Array(24).fill(0);
        visits.forEach(v => {
            const hour = new Date(v.ts).getHours();
            hourlyData[hour]++;
        });
        charts.hourly.data.datasets[0].data = hourlyData;
        charts.hourly.update();
    }

    renderTable(visits);
    renderInsights(visits);
    renderTopPages(visits);
    renderAudienceData(visits);
    renderCampaignData(visits);
}

function renderTopPages(visits) {
    const pages = {};
    visits.forEach(v => { const p = v.path || '/'; pages[p] = (pages[p] || 0) + 1; });
    const sorted = Object.entries(pages).sort((a,b) => b[1] - a[1]).slice(0, 10);
    const tbody = document.getElementById('pagesTableBody');
    if (!tbody) return;
    tbody.innerHTML = sorted.map(([path, count], i) => `
        <tr>
            <td style="font-family:monospace; font-size:0.75rem;">${path}</td>
            <td class="visit-count">${count.toLocaleString()}</td>
        </tr>
    `).join('');
}

function renderAudienceData(visits) {
    if (charts.browsers) {
        const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'];
        charts.browsers.data.datasets[0].data = browsers.map(b => visits.filter(v => (v.browser || '') === b).length);
        charts.browsers.update();
    }
    if (charts.visitorStatus) {
        charts.visitorStatus.data.labels = currentLang === 'tr' ? ['Yeni', 'Geri Gelen'] : ['New', 'Returning'];
        charts.visitorStatus.data.datasets[0].data = [
            visits.filter(v => (v.visitorStatus || '') === 'New').length,
            visits.filter(v => (v.visitorStatus || '') === 'Returning').length
        ];
        charts.visitorStatus.update();
    }
    
    // Top Cities Table
    const cityCounts = {};
    visits.forEach(v => { if(v.city && v.city !== 'Unknown') cityCounts[v.city] = (cityCounts[v.city] || 0) + 1; });
    const sortedCities = Object.entries(cityCounts).sort((a,b) => b[1] - a[1]).slice(0, 8);
    const tbody = document.getElementById('cityTableBody');
    if (tbody) {
        tbody.innerHTML = sortedCities.map(([city, count], i) => `
            <tr>
                <td>${i+1}</td>
                <td>${city}</td>
                <td class="visit-count">${count.toLocaleString()}</td>
                <td class="bar-cell"><div class="bar-bg"><div class="bar-fill" style="width:${(count / visits.length * 100).toFixed(1)}%"></div></div></td>
            </tr>
        `).join('') || `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:40px;">No city data available</td></tr>`;
    }
}

function renderCampaignData(visits) {
    const campaignVisits = visits.filter(v => (v.source || '').toLowerCase().includes('ads /'));
    
    // Campaign Performance Table
    const campPerformance = {};
    campaignVisits.forEach(v => {
        const key = `${v.source || ''} | ${v.medium || ''} | ${v.campaign || ''}`;
        if (!campPerformance[key]) campPerformance[key] = { count: 0, dur: 0, s: (v.source || ''), m: (v.medium || ''), c: (v.campaign || '') };
        campPerformance[key].count++;
        campPerformance[key].dur += (v.duration || 60);
    });
    
    const sortedCamps = Object.values(campPerformance).sort((a,b) => b.count - a.count);
    const tbody = document.getElementById('campaignTableBody');
    if (tbody) {
        tbody.innerHTML = sortedCamps.map((c, i) => `
            <tr>
                <td>${i+1}</td>
                <td style="font-weight:600; color:var(--accent);">${c.s.replace('Ads / ', '')}</td>
                <td><span style="opacity:0.7;">${c.m}</span></td>
                <td><span style="font-size:0.8rem;">${c.c}</span></td>
                <td class="visit-count">${c.count}</td>
                <td>${Math.floor(c.dur / c.count / 60)}m ${Math.floor((c.dur / c.count) % 60)}s</td>
            </tr>
        `).join('') || `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:40px;">No active campaigns detected</td></tr>`;
    }

    if (charts.campSources) {
        const sources = {};
        campaignVisits.forEach(v => { const s = (v.source || '').replace('Ads / ', ''); sources[s] = (sources[s] || 0) + 1; });
        const sorted = Object.entries(sources).sort((a,b) => b[1] - a[1]);
        charts.campSources.data.labels = sorted.map(s => s[0]);
        charts.campSources.data.datasets[0].data = sorted.map(s => s[1]);
        charts.campSources.update();
    }
}

function aggregateByDay(visits, numDays) {
    const days = {};
    const now = new Date();
    for (let i = numDays - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        days[d.toISOString().slice(0, 10)] = 0;
    }
    visits.forEach(v => {
        const key = new Date(v.ts).toISOString().slice(0, 10);
        if (key in days) days[key]++;
    });
    return Object.entries(days).map(([date, count]) => ({ date, count }));
}

function renderTable(visits) {
    const counts = {};
    visits.forEach(v => { counts[v.country] = (counts[v.country] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
    const total = visits.length;
    const tbody = document.getElementById('countryTableBody');
    if (!tbody) return;

    tbody.innerHTML = sorted.slice(0, 10).map(([code, count], i) => {
        const pct = ((count / total) * 100).toFixed(1);
        return `<tr>
            <td>${i+1}</td>
            <td><div class="country-name"><span>${countryFlag(code)}</span> ${COUNTRY_NAMES[code] || code}</div></td>
            <td class="visit-count">${count.toLocaleString()}</td>
            <td class="visit-percent">${pct}%</td>
            <td class="bar-cell"><div class="bar-bg"><div class="bar-fill" style="width:${pct}%"></div></div></td>
        </tr>`;
    }).join('');
}

function renderInsights(visits) {
    const container = document.getElementById('insightsContent');
    if (!container) return;

    if (!visits.length) {
         container.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">${currentLang === 'tr' ? 'Veri bekleniyor...' : 'Waiting for data...'}</p>`;
         return;
    }

    let insights = [];
    
    // Growth Insight
    const recent = visits.filter(v => Date.now() - v.ts < 86400000*3).length;
    const previous = visits.filter(v => Date.now() - v.ts >= 86400000*3 && Date.now() - v.ts < 86400000*6).length;
    const growth = previous > 0 ? ((recent - previous) / previous * 100) : 100;
    
    if (growth > 10) {
        insights.push({ 
            icon: 'fa-chart-line', 
            text: currentLang === 'tr' ? `Trafikte <strong>%${growth.toFixed(0)}</strong> artış trendi var!` : `Traffic trending up by <strong>${growth.toFixed(0)}%</strong>!`, 
            color: '#00ff88' 
        });
    }

    // Devices Insight
    const mobileVisits = visits.filter(v => (v.device || '') === 'Mobile').length;
    const mobilePct = (mobileVisits / visits.length) * 100;
    if (mobilePct > 50) {
        insights.push({ icon: 'fa-mobile-alt', text: ADMIN_TRANSLATIONS[currentLang]["insight.mobile"], color: '#00f2ff' });
    }

    // Top Source Insight
    const sourceData = (charts.sources && charts.sources.data.datasets[0].data) || [];
    if (sourceData.length) {
        const maxSourceIdx = sourceData.indexOf(Math.max(...sourceData));
        const topSource = getSources()[maxSourceIdx];
        insights.push({ icon: 'fa-rocket', text: `${ADMIN_TRANSLATIONS[currentLang]["insight.source"]} <strong>${topSource}</strong>`, color: '#7d2ae8' });
    }

    // Peak Time Insight
    const hourlyData = (charts.hourly && charts.hourly.data.datasets[0].data) || [];
    if (hourlyData.length) {
        let maxHour = 0; let maxVal = 0;
        hourlyData.forEach((v, i) => { if(v > maxVal) { maxVal = v; maxHour = i; } });
        insights.push({ icon: 'fa-clock', text: `${ADMIN_TRANSLATIONS[currentLang]["insight.peak"]} <strong>${maxHour}:00</strong>`, color: '#ff2d95' });
    }

    // Performance Category
    const avgDuration = visits.reduce((s, v) => s + (v.duration || 60), 0) / visits.length;
    if (avgDuration < 30) {
        insights.push({ 
            icon: 'fa-tachometer-alt', 
            text: currentLang === 'tr' ? 'Hemen çıkma oranı yüksek, sayfa hızını kontrol edin.' : 'High bounce risk, check page loading speed.', 
            color: '#ff3366' 
        });
    }

    // Returning Visitor Insight (NEW)
    const returning = visits.filter(v => (v.visitorStatus || '') === 'Returning').length;
    const returnPct = (returning / visits.length) * 100;
    if (returnPct > 35) {
        insights.push({ 
            icon: 'fa-heart', 
            text: currentLang === 'tr' ? `Sadık kitle! Kullanıcıların <strong>%${returnPct.toFixed(0)}</strong>'i geri dönüyor.` : `Loyal audience! <strong>${returnPct.toFixed(0)}%</strong> of users are returning.`, 
            color: '#ff2d95' 
        });
    }

    // Campaign Efficiency (NEW)
    const campaignVisits = visits.filter(v => (v.source || '').toLowerCase().includes('ads /'));
    if (campaignVisits.length > 0) {
        const adDur = campaignVisits.reduce((s, v) => s + (v.duration || 60), 0) / campaignVisits.length;
        if (adDur > avgDuration) {
            insights.push({ 
                icon: 'fa-money-bill-wave', 
                text: currentLang === 'tr' ? 'Kampanya trafiği yüksek etkileşimli!' : 'Campaign traffic is highly engaged!', 
                color: '#00ff88' 
            });
        }
    }

    // Top Region Insight (NEW)
    const countries = {};
    visits.forEach(v => countries[v.country] = (countries[v.country] || 0) + 1);
    const topCountry = Object.entries(countries).sort((a,b) => b[1] - a[1])[0];
    if (topCountry) {
        insights.push({ 
            icon: 'fa-map-marker-alt', 
            text: currentLang === 'tr' ? `En aktif bölge: <strong>${topCountry[0]}</strong>` : `Top region: <strong>${topCountry[0]}</strong>`, 
            color: '#00ccff' 
        });
    }

    container.innerHTML = insights.map(ins => `
        <div class="insight-item" style="border-left: 3px solid ${ins.color}; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 0.85rem; display:flex; align-items:center; gap:12px; animation: fadeIn 0.3s ease;">
            <i class="fas ${ins.icon}" style="color: ${ins.color}; font-size: 1rem; width: 20px; text-align: center;"></i>
            <span style="flex:1;">${ins.text}</span>
        </div>
    `).join('');
}

window.generateDemoData = function() {
    const countries = ['TR', 'US', 'DE', 'GB', 'AZ', 'FR', 'NL'];
    const cities = { TR: ['Istanbul', 'Ankara', 'Izmir'], US: ['New York', 'London', 'Berlin'], DE: ['Berlin', 'Munich'], GB: ['London', 'Manchester'], AZ: ['Baku'], FR: ['Paris'], NL: ['Amsterdam'] };
    const enSources = [...SOURCES_MAP.en, 'Ads / Google', 'Ads / Facebook', 'Ads / Twitter'];
    const enDevices = DEVICES_MAP.en;
    const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
    const mediums = ['cpc', 'social', 'email', 'display'];
    const campaigns = ['spring_sale', 'new_year_2026', 'brand_awareness', 'remarketing'];
    const paths = ['/', '/contact', '/products', '/about', '/blog/latest-news', '/services/web-design'];
    
    const newVisits = [];
    for(let i=0; i<400; i++) {
        const country = countries[Math.floor(Math.random() * countries.length)];
        const source = enSources[Math.floor(Math.random() * enSources.length)];
        const isAd = source.includes('Ads /');
        
        newVisits.push({
            sessionId: Math.random().toString(36).substring(2,15),
            ts: Date.now() - Math.floor(Math.random() * 30 * 86400000),
            country: country,
            city: cities[country] ? cities[country][Math.floor(Math.random() * cities[country].length)] : 'Unknown',
            device: enDevices[Math.floor(Math.random() * enDevices.length)],
            browser: browsers[Math.floor(Math.random() * browsers.length)],
            visitorStatus: Math.random() > 0.4 ? 'Returning' : 'New',
            source: source,
            medium: isAd ? mediums[Math.floor(Math.random() * mediums.length)] : 'none',
            campaign: isAd ? campaigns[Math.floor(Math.random() * campaigns.length)] : 'none',
            path: paths[Math.floor(Math.random() * paths.length)],
            duration: Math.floor(Math.random() * 600)
        });
    }
    const existing = JSON.parse(localStorage.getItem('dino_visits') || '[]');
    localStorage.setItem('dino_visits', JSON.stringify([...existing, ...newVisits]));
    if (window.updateDashboard) window.updateDashboard();
};

function init() {
    console.log('Initializing Dinomore Admin Engine...');
    try {
        updateContent();
        initCharts();
        refreshDashboardData();

        // Print Preparation
        window.onbeforeprint = () => {
            const dateEl = document.getElementById('print-date');
            if (dateEl) {
                dateEl.textContent = new Date().toLocaleString(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
                    dateStyle: 'long',
                    timeStyle: 'short'
                });
            }
            // Ensure all charts are rendered for print
            Object.values(charts).forEach(c => c.resize());
        };

        window.adminEngineReady = true;
    } catch (err) {
        console.error('Initialization Error:', err);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
