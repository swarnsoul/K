import puppeteer from 'puppeteer';

async function verify() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  console.log('Navigating to http://localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle2' });
  // Allow splash animation to finish so Lenis is unlocked
  await new Promise(r => setTimeout(r, 4000));

  // 1. Verify Card 3 text
  const card3Title = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h3, h2, div, span'));
    const comingSoon = headings.find(el => el.textContent && el.textContent.includes('COMING SOON'));
    return comingSoon ? comingSoon.textContent.trim() : null;
  });
  console.log('Card 3 title found:', card3Title);
  if (!card3Title || !card3Title.includes('COMING SOON')) {
    throw new Error('Card 3 does not show COMING SOON!');
  }

  // 2. Verify Design Companions (10 icons in DesktopTools)
  const desktopCompanions = await page.evaluate(() => {
    const desktopContainer = document.querySelector('[data-node-id="649:1236"]');
    if (!desktopContainer) return [];
    const icons = Array.from(desktopContainer.querySelectorAll('[data-icon-index] img'));
    return icons.map(img => ({ alt: img.alt, src: img.getAttribute('src') }));
  });
  console.log(`Found ${desktopCompanions.length} desktop companion icons:`);
  desktopCompanions.forEach(c => console.log(`  - ${c.alt}: ${c.src}`));
  if (desktopCompanions.length !== 10) {
    throw new Error(`Expected 10 desktop design companions, but found ${desktopCompanions.length}!`);
  }
  const hasPs = desktopCompanions.some(c => c.alt === 'Photoshop' && c.src.includes('image-16.png'));
  const hasAi = desktopCompanions.some(c => c.alt === 'Illustrator' && c.src.includes('image-17.png'));
  if (!hasPs || !hasAi) {
    throw new Error('Photoshop or Illustrator icon missing in companions!');
  }

  // 3. Verify Contact Form attributes
  const formData = await page.evaluate(() => {
    const form = document.querySelector('#desktop-contact-form');
    if (!form) return null;
    const inputs = Array.from(form.querySelectorAll('input')).map(inp => ({
      name: inp.getAttribute('name'),
      type: inp.getAttribute('type'),
      placeholder: inp.getAttribute('placeholder')
    }));
    const submitBtn = document.querySelector('button[form="desktop-contact-form"]');
    return {
      action: form.getAttribute('action'),
      method: form.getAttribute('method'),
      inputs,
      hasSubmitBtn: !!submitBtn,
      btnType: submitBtn ? submitBtn.getAttribute('type') : null
    };
  });
  console.log('Contact form config:', formData);
  if (!formData || formData.action !== 'https://formspree.io/f/mzerwzko' || formData.method !== 'POST') {
    throw new Error('Contact form action or method incorrect!');
  }
  const expectedNames = ['name', 'email', 'subject', 'message'];
  for (const name of expectedNames) {
    if (!formData.inputs.some(i => i.name === name)) {
      throw new Error(`Missing input with name="${name}"!`);
    }
  }

  // 4. Verify Resume button
  const resumeLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="Resume"], a[href*="resume"]'));
    return links.map(a => ({
      href: a.getAttribute('href'),
      target: a.getAttribute('target'),
      text: a.textContent.trim()
    }));
  });
  console.log('Resume links found:', resumeLinks);
  const validResume = resumeLinks.every(r => r.href.includes('Resume.pdf') && r.target === '_blank');
  if (!validResume || resumeLinks.length === 0) {
    throw new Error('Resume links do not point to PDF or do not open in new tab!');
  }

  // 5. Verify Social Links
  const socialData = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[data-cursor-key^="social-"]'));
    return links.map(a => ({
      href: a.getAttribute('href'),
      target: a.getAttribute('target'),
      cursorKey: a.getAttribute('data-cursor-key')
    }));
  });
  console.log('Social links found:', socialData);
  const expectedSocials = {
    'social-linkedin': 'https://www.linkedin.com/in/kanakprajapati/',
    'social-behance': 'https://www.behance.net/swarnsoul',
    'social-instagram': 'https://www.instagram.com/swarnsoul?jplx=MTc0cGcwM2VlOXhieA==',
    'social-x': 'https://x.com/swarnsoul',
    'social-email': 'mailto:prajapatikanak315@gmail.com'
  };
  for (const [key, url] of Object.entries(expectedSocials)) {
    const match = socialData.find(s => s.cursorKey === key);
    if (!match || match.href !== url) {
      throw new Error(`Social link for ${key} does not match expected URL ${url}! Found: ${match?.href}`);
    }
  }

  // 6. Verify Hanging Pendulum links
  const hangingLinks = await page.evaluate(() => {
    const li = document.querySelector('a[data-cursor-key="nav-linkedin"]');
    const be = document.querySelector('a[data-cursor-key="nav-behance"]');
    return {
      linkedIn: li ? { href: li.getAttribute('href'), target: li.getAttribute('target') } : null,
      behance: be ? { href: be.getAttribute('href'), target: be.getAttribute('target') } : null,
    };
  });
  console.log('Hanging pendulum links:', hangingLinks);
  if (hangingLinks.linkedIn?.href !== 'https://www.linkedin.com/in/kanakprajapati/' || hangingLinks.linkedIn?.target !== '_blank') {
    throw new Error('Hanging LinkedIn link incorrect!');
  }
  if (hangingLinks.behance?.href !== 'https://www.behance.net/swarnsoul' || hangingLinks.behance?.target !== '_blank') {
    throw new Error('Hanging Behance link incorrect!');
  }

  // 7. Verify Contact nav link smooth redirect
  console.log('Testing Contact nav link click...');
  const initialScrollY = await page.evaluate(() => window.scrollY);
  await page.click('a[data-cursor-key="nav-contact"]');
  // Wait for Lenis smooth scroll to finish
  await new Promise(r => setTimeout(r, 2000));
  const scrolledY = await page.evaluate(() => window.scrollY);
  const footerTop = await page.evaluate(() => {
    const el = document.getElementById('contact');
    return el ? el.getBoundingClientRect().top : null;
  });
  console.log(`Initial scroll: ${initialScrollY}, After click scroll: ${scrolledY}, Footer top relative to viewport: ${footerTop}`);
  if (scrolledY <= initialScrollY) {
    throw new Error('Clicking Contact nav link did not scroll down to contact section!');
  }

  // 8. Test direct access to PDF
  const resumeRes = await page.goto('http://localhost:3002/Kanak-Resume.pdf');
  console.log('PDF response status:', resumeRes.status(), 'Content-Type:', resumeRes.headers()['content-type']);
  if (resumeRes.status() !== 200) {
    throw new Error(`PDF access returned status ${resumeRes.status()}!`);
  }

  console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  await browser.close();
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
