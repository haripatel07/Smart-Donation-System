require('dotenv').config();
(async () => {
    const base = process.env.BASE_URL || 'http://localhost:5000';
    const email = process.argv[2] || process.env.ADMIN_EMAIL;
    const password = process.argv[3] || process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        console.error('Usage: node test_admin.js <admin-email> <admin-password>');
        process.exit(1);
    }

    const pw = password;

    const log = (...args) => console.log('[test_admin]', ...args);

    const doFetch = async (url, opts = {}) => {
        const res = await fetch(url, opts);
        let body;
        try { body = await res.json(); } catch (e) { body = await res.text(); }
        return { res, body };
    };

    try {
        log('Logging in as', email);
        const login = await doFetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: pw }) });
        if (!login.res.ok) {
            console.error('Login failed:', login.res.status, login.body);
            process.exit(1);
        }
        const token = login.body.token;
        const user = login.body.user || login.body || {};
        log('Login success. Token length:', token ? token.length : 0, 'user.role=', user.role);

        if ((user.role || '').toLowerCase() !== 'admin') {
            console.error('Provided credentials are not admin. Aborting admin tests. user.role=', user.role);
            return;
        }

        // Test admin users endpoint
        log('GET /api/admin/users');
        const usersReq = await doFetch(`${base}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
        log('status:', usersReq.res.status);
        log('body:', usersReq.body);

        // Test categories CRUD
        log('GET /api/categories');
        const cats = await doFetch(`${base}/api/categories`);
        log('existing categories count:', Array.isArray(cats.body) ? cats.body.length : 'n/a');

        // Create a test category
        const ts = Date.now();
        const catName = `test-cat-${ts}`;
        log('POST /api/categories', catName);
        const createCat = await doFetch(`${base}/api/categories`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: catName, description: 'Temporary test category' }) });
        log('create status', createCat.res.status, createCat.body);
        if (!createCat.res.ok) {
            log('Category create failed, response:', createCat.res.status, createCat.body);
        }
        const catId = createCat.body.category ? createCat.body.category._id || createCat.body.category.id : createCat.body._id || createCat.body.id;

        // Update category
        const updatedName = catName + '-updated';
        log('PUT /api/categories/:id', catId);
        const updateCat = await doFetch(`${base}/api/categories/${catId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: updatedName, description: 'Updated by test script' }) });
        log('update status', updateCat.res.status, updateCat.body);

        // Create a donation (as admin) to test status change
        // Use category id (if exists) or fallback to first category
        let useCat = catId;
        if (!useCat) {
            const allCats = await doFetch(`${base}/api/categories`);
            if (Array.isArray(allCats.body) && allCats.body.length > 0) useCat = allCats.body[0]._id || allCats.body[0].id;
        }
        if (!useCat) throw new Error('No category available to create donation');

        log('POST /api/donations create test donation');
        const createDon = await doFetch(`${base}/api/donations`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ item: 'Test Item', category: useCat, quantity: 1 }) });
        log('donation create status', createDon.res.status, createDon.body);
        if (!createDon.res.ok) {
            log('Warning: create donation failed, proceeding to cleanup category only');
        }
        const donationId = createDon.body && createDon.body.donation ? createDon.body.donation._id || createDon.body.donation.id : (createDon.body && createDon.body._id) || null;

        // Attempt to change donation status
        if (donationId) {
            log('PATCH /api/donations/:id/status -> approved');
            const patch = await doFetch(`${base}/api/donations/${donationId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status: 'approved' }) });
            log('patch status', patch.res.status, patch.body);
        } else {
            log('No donation created, skipping status patch');
        }

        // Delete created category
        if (catId) {
            log('DELETE /api/categories/:id', catId);
            const del = await doFetch(`${base}/api/categories/${catId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
            log('delete status', del.res.status, del.body);
        }

        log('Admin tests completed');
        process.exit(0);
    } catch (err) {
        console.error('Error during admin tests:', err);
        process.exit(1);
    }
})();
