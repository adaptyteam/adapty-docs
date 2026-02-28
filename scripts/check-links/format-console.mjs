export function printConsoleSummary({ uniqueErrors, uniqueWarnings, manualCheckList }) {
  const externalErrors = uniqueErrors.filter(b => b.type === 'external');
  const internalErrors = uniqueErrors.filter(b => b.type === 'internal');

  const internalRedirects = uniqueWarnings.filter(w => w.severity === 'internal-redirect').length;
  const redirects = uniqueWarnings.filter(w => w.severity === 'redirect').length;
  const anchors = uniqueWarnings.filter(w => w.severity === 'anchor').length;
  const logins = manualCheckList.filter(w => w.severity === 'login').length;
  const bots = manualCheckList.filter(w => w.severity === 'bot-protected' || w.severity === 'rate-limited').length;

  console.log(`Broken: ${uniqueErrors.length} (${externalErrors.length} external, ${internalErrors.length} internal)`);
  console.log(`Stale links: ${uniqueWarnings.length} (${internalRedirects} internal redirects, ${redirects} redirects, ${anchors} missing anchors)`);
  console.log(`Manual check: ${manualCheckList.length} (${logins} login required, ${bots} bot-protected)`);
}
