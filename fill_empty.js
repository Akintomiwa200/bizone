const fs = require('fs');
const path = require('path');

const emptyFiles = fs.readFileSync('empty_files.txt', 'utf8').split('\n').filter(Boolean);

emptyFiles.forEach(file => {
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  const fullPath = path.resolve(file);

  let content = '';

  if (file.includes('/components/') && ext === '.tsx') {
    content = `export const ${basename} = () => {\n  return <div>${basename}</div>;\n};\n\nexport default ${basename};\n`;
  } else if (file.includes('/app/api/') && basename === 'route') {
    content = `import { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });\n}\n`;
  } else if (file.includes('providers.tsx')) {
    content = `'use client';\n\nimport { ReactNode } from 'react';\n\nexport function Providers({ children }: { children: ReactNode }) {\n  return <>{children}</>;\n}\n`;
  } else if (ext === '.ts' || ext === '.tsx') {
    content = `// TODO: Implement ${basename}\nexport {};\n`;
  }

  if (content) {
    fs.writeFileSync(fullPath, content);
    console.log("Filled " + file);
  }
});
