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
        "chart.heatmap": "Visitor Heatmap",
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
        "settings.utils.clear": "Clear Data"
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
        "chart.heatmap": "Ziyaretçi Isı Haritası",
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
        "audience.status": "Kitle modülü senkronize ediliyor...",
        "campaigns.title": "Pazarlama Kampanyaları",
        "campaigns.subtitle": "Aktif pazarlama kanallarınızın ve UTM parametrelerinizin performansını izleyin.",
        "campaigns.status": "Kampanya takibi başlatılıyor...",
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
        "settings.utils.clear": "Verileri Temizle"
    }
};

let currentLang = localStorage.getItem('dino_admin_lang') || 'en';

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

function switchSection(sectionId) {
    // Update Sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(`nav-${sectionId}`)?.classList.add('active');

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
}

function updateDashboard() {
    const range = document.querySelector('.range-tab.active')?.dataset.range || '7';
    const visits = filterVisits(getVisits(), range);
    
    document.getElementById('totalVisits').textContent = visits.length.toLocaleString();
    const totalDuration = visits.reduce((s, v) => s + (v.duration || 60), 0);
    const avgDur = visits.length ? Math.floor(totalDuration / visits.length) : 0;
    document.getElementById('avgDuration').textContent = `${Math.floor(avgDur / 60)}m ${avgDur % 60}s`;
    
    const now = Date.now();
    const activeUsers = visits.filter(v => now - v.ts < 300000).length;
    document.getElementById('todayVisits').textContent = activeUsers.toLocaleString();

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
             return visits.filter(v => v.source.toLowerCase().includes(enSource.toLowerCase())).length;
        });
        charts.sources.data.datasets[0].data = sourceCounts;
        charts.sources.update();
    }

    if (charts.devices) {
        charts.devices.data.labels = getDevices();
        const deviceCounts = getDevices().map(d => {
            const enDevice = DEVICES_MAP.en[getDevices().indexOf(d)];
            return visits.filter(v => v.device === enDevice).length;
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
    renderMap(visits);
    renderInsights(visits);
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
    const mobileVisits = visits.filter(v => v.device === 'Mobile').length;
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

    container.innerHTML = insights.map(ins => `
        <div class="insight-item" style="border-left: 3px solid ${ins.color}; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 0.85rem; display:flex; align-items:center; gap:12px; animation: fadeIn 0.3s ease;">
            <i class="fas ${ins.icon}" style="color: ${ins.color}; font-size: 1rem; width: 20px; text-align: center;"></i>
            <span style="flex:1;">${ins.text}</span>
        </div>
    `).join('');
}

function renderMap(visits) {
    const container = document.getElementById('mapContainer');
    if (!container) return;
    container.innerHTML = '';
    const width = container.offsetWidth;
    const height = 350;
    const svg = d3.select(container).append('svg').attr('width', '100%').attr('height', height).attr('viewBox', `0 0 ${width} ${height}`).style('overflow', 'visible');
    const projection = d3.geoMercator().scale(width / 6.5).translate([width / 2, height / 1.5]);
    const path = d3.geoPath().projection(projection);
    const countryCounts = {};
    visits.forEach(v => { countryCounts[v.country] = (countryCounts[v.country] || 0) + 1; });
    const maxVisits = Math.max(...Object.values(countryCounts), 1);

    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(data => {
        svg.append('g').selectAll('path').data(data.features).enter().append('path').attr('d', path).attr('fill', d => {
            const count = countryCounts[d.id] || 0;
            if (count === 0) return 'rgba(255,255,255,0.03)';
            const opacity = 0.2 + (count / maxVisits) * 0.8;
            return `rgba(0, 242, 255, ${opacity})`;
        }).attr('stroke', 'rgba(0, 242, 255, 0.1)').attr('stroke-width', 0.5).on('mouseover', function(event, d) {
            const count = countryCounts[d.id] || 0;
            d3.select(this).attr('stroke', '#00f2ff').attr('stroke-width', 1);
            showTooltip(event, `<strong>${d.properties.name}</strong>: ${count} visits`);
        }).on('mouseout', function() {
            d3.select(this).attr('stroke', 'rgba(0, 242, 255, 0.1)').attr('stroke-width', 0.5);
            hideTooltip();
        });
    });
}

function showTooltip(event, html) {
    const tt = document.getElementById('mapTooltip');
    if (!tt) return;
    tt.innerHTML = html;
    tt.style.display = 'block';
    tt.style.left = (event.pageX + 10) + 'px';
    tt.style.top = (event.pageY + 10) + 'px';
}

function hideTooltip() {
    const tt = document.getElementById('mapTooltip');
    if (tt) tt.style.display = 'none';
}

function exportToCsv() {
    const range = document.querySelector('.range-tab.active')?.dataset.range || 'all';
    const visits = filterVisits(getVisits(), range);
    if (!visits.length) return alert('No data to export!');
    let csv = 'Timestamp,Country,Source,Device,Duration(s)\n';
    visits.forEach(v => { csv += `"${new Date(v.ts).toISOString()}","${v.country}","${v.source}","${v.device}","${v.duration}"\n`; });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dinomore_analytics_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function init() {
    console.log('Initializing Dinomore Admin Engine...');
    updateContent();
    initCharts();
    updateDashboard();

    document.getElementById('addDemoBtn')?.addEventListener('click', () => {
        const countries = ['TR', 'US', 'DE', 'GB', 'AZ', 'FR', 'NL'];
        const enSources = SOURCES_MAP.en;
        const enDevices = DEVICES_MAP.en;
        const newVisits = [];
        for(let i=0; i<300; i++) {
            newVisits.push({
                sessionId: Math.random().toString(36).substring(2,15),
                ts: Date.now() - Math.floor(Math.random() * 30 * 86400000),
                country: countries[Math.floor(Math.random() * countries.length)],
                device: enDevices[Math.floor(Math.random() * enDevices.length)],
                source: enSources[Math.floor(Math.random() * enSources.length)],
                duration: Math.floor(Math.random() * 300)
            });
        }
        const existing = getVisits();
        localStorage.setItem('dino_visits', JSON.stringify([...existing, ...newVisits]));
        updateDashboard();
    });

    document.getElementById('exportCsvBtn')?.addEventListener('click', exportToCsv);

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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
