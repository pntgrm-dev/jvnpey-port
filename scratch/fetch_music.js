import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: 's9iwrqhlg2',
  apiKey: 'mDaeuYeRBR9z6SMPW0SUr0LUChxxjnmXMnZM',
});

async function main() {
  const data = await client.get({
    endpoint: "works",
    queries: { limit: 100 }
  });
  const musicWorks = data.contents.filter(w => {
    const cats = Array.isArray(w.category) ? w.category : [w.category];
    return cats.some(c => (typeof c === 'string' ? c : c?.name)?.toLowerCase() === 'music');
  });
  console.log(JSON.stringify(musicWorks, null, 2));
}

main().catch(console.error);
